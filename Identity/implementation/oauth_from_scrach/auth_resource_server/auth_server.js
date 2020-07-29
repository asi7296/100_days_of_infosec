const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

// for each client, we need to store the origin, client_id, client_secret, client_type
const registered_clients = {
        client_1 : {
                referer: 'http://13.233.98.85:8443/',
                client_type: 'confidential',
                client_secret: 'this_is_client_1_secret',
                redirect_uri: 'http://13.233.98.85:8443/oauth_callback'
        }
}

const code_token_cache = {};


var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const validate_client = (client_details) => {
        // check if the client exists
        var known_client = registered_clients[client_details.client_id];

        if(known_client == null)
                return false;

        // check if client is sending correct secret
        if(client_details.client_secret == known_client.client_secret) {
                // check if origin is correct
                if (client_details.referer == known_client.referer) {
                        // check if redirect_uri matches
                        if (client_details.redirect_uri == known_client.redirect_uri) {
                                //check for authorization code flow and scope and state presence
                                // scope is optional as per RFC, this implementation requires it
                                if (client_details.state && client_details.response_type == 'code') {
                                        return true;
                                }
                        }
                }
        }
};

app.get('/auth',  (req, res) => {
        var client_details = req.query;
        client_details.referer = req.headers.referer;

        // if this returns true, proceed to authenticate user - sending uesrname/password form
        // also let the user consent to the scope that is being requested
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
        // generate JWT here for the current user based on user ID in session
        // also generate a code and map it to that JWT for a limited time
        // send this code back to the client redirect URI
        // for now let's say the JWT is {'authorized': true}
        var token = {authorized: true};
        var code = crypto.randomBytes(5).toString('hex');
        code_token_cache[code] = token;
        res.redirect(req.body.redirect_uri + `?state=${req.body.state}&code=${code}`);
});

app.post('/token', (req, res) => {
        if (code_token_cache[req.body.code]) {
                console.log('sending back token for code', code_token_cache[req.body.code]);
                res.send(code_token_cache[req.body.code]);
                delete code_token_cache[req.body.code];
        }
});

app.listen(9000, () => {
        console.log('auth server listening on 9000');
});
