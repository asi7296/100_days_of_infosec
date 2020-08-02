const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const request = require('request');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Client Registration Details - has to be set-up with the authorization server prior 
const auth_server_authorize_endpoint = 'http://15.207.117.122:9000/auth';
const auth_server_token_endpoint = 'http://15.207.117.122:9000/token';
const client_id = 'client_1';
const redirect_uri = 'http://15.207.117.122:8443/oauth_callback';
// keep this a secret, should be stored securely rather than in source
const client_secret = 'this_is_client_1_secret';

// used later to comply with spec - RFC-6749 - maintaining a state param to avoid CSRF and time flows
var state_cache = [];

var app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
        res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post('/authme', (req, res) => {
        var state = crypto.randomBytes(10).toString('hex');
        params = `?response_type=code&client_id=${client_id}&scope=${req.body.selected_scope}&state=${state}&redirect_uri=${redirect_uri}`;
        state_cache.push(state);
        res.redirect( auth_server_authorize_endpoint + params  );
});

// this endpoint recieves a code and a state
// checks if state matches the state_cache ie. has a request gone out and is a code awaited?
// if so, get the code from the query_string, exchange that once again with the auth server for an actual token
// why is this done? - Code for Token exchange is done on a secure back-channel
app.get('/oauth_callback', (req, res) => {
        // make sure that a request has gone out, and that we are actually awaiting a code
        // and unsolicited responses are not being serviced
        if (!state_cache.includes(req.query.state)) {
                res.send('State has changed, either the flow took too long or CSRF');
        }
        else {
                // send a POST request to the authorization server over a secure channel
                // to the endpoint that takes codes and gives back access tokens
                token_request_form = {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        redirect_uri: redirect_uri,
                        client_id: client_id,
                        client_secret: client_secret
                }

                // send the request, if successful, we take the access token out of the body
                // and remove the state from the cache, ie. the flow is complete
                // this token can then be used to access the resources it was scoped to that the client consented to
                request.post({url: auth_server_token_endpoint, form: token_request_form}, (err, httpResponse, httprespbody) => {
                        var auth_server_pub_key = fs.readFileSync('auth_server_pub.pem');
                        var decoded_token = jwt.verify(httprespbody, auth_server_pub_key, (err, decoded) => {
                                if (err) {
                                        res.send(err);
                                }
                                else {
                                        res.send(decoded);
                                        state_cache = state_cache.filter(item => item !== req.body.code)
                                }
                        });
                });
        }
});

app.listen(8443, () => {
        console.log('client listening on 8443. You as a resource owner visit this');
});
