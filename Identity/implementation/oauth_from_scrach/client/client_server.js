const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const request = require('request');

const auth_server_authorize_endpoint = 'http://13.233.98.85:9000/auth';
const auth_server_token_endpoint = 'http://13.233.98.85:9000/token';
const client_id = 'client_1';
const client_secret = 'this_is_client_1_secret';
const redirect_uri = 'http://13.233.98.85:8443/oauth_callback';

var state_cache = [];

var app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
        res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post('/authme', (req, res) => {
        var state = crypto.randomBytes(10).toString('hex');
        params = `?response_type=code&client_id=${client_id}&client_secret=${client_secret}&scope=${req.body.selected_scope}&state=${state}&redirect_uri=${redirect_uri}`;
        state_cache.push(state);
        res.redirect( auth_server_authorize_endpoint + params  );
        // res.send('Sending request to ' + auth_server_authorize_endpoint + params + '\nState cache contains: '  +state_cache);
});

app.get('/oauth_callback', (req, res) => {
        if (!state_cache.includes(req.query.state)) {
                res.send('State has changed, either the flow took too long or CSRF');
        }
        else {
                // now exchange this code for a token with the token endpoint
                token_request_form = {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        redirect_uri: redirect_uri,
                        client_id: client_id
                }
                console.log('sending ' , token_request_form, auth_server_token_endpoint);
                request.post({url: auth_server_token_endpoint, form: token_request_form}, (err,httpResponse,body) => {
                        // at this point we have the JWT, we can now use this with a session/header to access
                        // resources from the authorisation server based on the permissions contained in this JWT
                        // for how those permissions might be implemented on the server? check custom RBAC 
                        res.send(body);
                });
        }
});

app.listen(8443, () => {
        console.log('client listening on 8443. You as a resource owner visit this');
});
