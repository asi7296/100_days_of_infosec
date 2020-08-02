const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// for each client, we need to store the origin, client_id, client_secret, client_type
const registered_clients = {
        client_1 : {
                referer: 'http://15.207.117.122:8443/',
                client_type: 'confidential',
                client_secret: 'this_is_client_1_secret',
                redirect_uri: 'http://15.207.117.122:8443/oauth_callback'
        }
}

const code_token_cache = {};


var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// given a set of client details that have hit the /auth endpoint,
// check if they are valid and if a code should be issued
// this implementation checks for existance of client_id, referer, redirect_uri, 
// requires response_type == 'code', requries state parameter
const validate_client = (client_details) => {
        var known_client = registered_clients[client_details.client_id];

        if(known_client == null)
                return false;

        
        if (client_details.referer == known_client.referer) {
                if (client_details.redirect_uri == known_client.redirect_uri) {
                        if (client_details.state && client_details.response_type == 'code') {
                                return true;
                        }
                }
        }
        
};

// endpoint that the client will redirect the resource owner to 
// when the resource owner picks a scope and hits 'Authenticate Me' from the client page
app.get('/auth',  (req, res) => {
        // put all request details into one structure
        var client_details = req.query;
        client_details.referer = req.headers.referer;

        // validate the structure - if the client requesting for auth is integrated with this auth server
        // if allowed, perform the actual authentication with the resource-owner based on said client
        if(validate_client(client_details)) {
                res.render('authpage', {
                                client_uri: client_details.referer,
                                selected_scope: client_details.scope,
                                client_redirect_uri: client_details.redirect_uri,
                                state: client_details.state
                        });
                }

        else {
                res.send('WRONG CLIENT');
        }

});

app.post('/consent', (req, res) => {
        // implement a new scope here
        // that when requested, sends back all details about the user
        // eg. the roles that the user has across applications and any custom attributes
        // this may be used across internal applications and services and even for SSO
        // this token below later is treated as the payload of a JWT
        var token = null;
        if (req.body.selected_scope == 'getallrolesandperms') {
                token = {
                        username: 'username_from_auth_server_session', // req.session.username
                        roles: {
                                app1: 'admin',
                                app2: 'admin user',
                                app3: 'user'
                        },
                        special_attributes: {
                                dog_person: true,
                                cat_person: false
                        }
                }
        }
        else {
                token = {authorized: true, username: 'username_here_from_auth_server_session', scope: req.body.selected_scope};
        }
        var code = crypto.randomBytes(5).toString('hex');
        
        // typically, also add functionality to time the validity of this token
        // code-token mapping is implemented to prevent CSRF as well as time-out auth flows if they take too long
        // to prevent vectors such as replay attacks
        code_token_cache[code] = token;
        // redirect back to the client's registered redirect_uri with the state that they sent over 
        // and with the auth code that they will come back with to exchange for the actual token later
        res.redirect(req.body.redirect_uri + `?state=${req.body.state}&code=${code}`);
});

// client applications would POST here
// with a code that this server sent out earlier after resource-owner authentication
app.post('/token', (req, res) => {
        // make sure that the code is still alive and can be exchanged
        if (code_token_cache[req.body.code]) {
                console.log('sending back token for code', code_token_cache[req.body.code]);
                
                // perform client app authentication here, they need to send over the 'client_secret'
                if (registered_clients[req.body.client_id].client_secret != req.body.client_secret) {
                        res.send('Client failed authentication');
                }

                // once client has been authenticated, sign a JWT containing the access token
                // with auth_server's private key. the public key is held by the client and can be used
                // to check integrity
                // also remove this code from auth_server cache so that replay attacks are not prevented
                // ie. one code can be exchanged for one token per resource-owner authentication
                else {
                        var priv_key = fs.readFileSync('auth_server_priv.pem');
                        var signed_token = jwt.sign(code_token_cache[req.body.code], priv_key, { algorithm: 'RS256'});
                        console.log(signed_token);
                        res.send(signed_token);
                        delete code_token_cache[req.body.code];
                }
        }
});

app.listen(9000, () => {
        console.log('auth server listening on 9000');
});