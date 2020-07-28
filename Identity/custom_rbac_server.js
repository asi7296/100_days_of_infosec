const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');

const user_store = {
        bob: {role: 'user'},
        alice: {role: 'admin'}
};

const role_perm_matrix = {
        user: {
                resource1: {
                        read: true, write: false
                },
                resource2: {
                        read: false, write: true
                }
        },

        admin: {
                resource1: {
                        read: true, write: true
                },
                resource2: {
                        read: true, write: true
                }
        }
};


function perm_check(username, resource, action) {
        if (user_store[username]) {
                role = user_store[username].role;
                if (role_perm_matrix[role][resource]) {
                        console.log(username, resource, action, ' evaluated to: ', role_perm_matrix[role][resource][action]);
                        return role_perm_matrix[role][resource][action];
                }
        }
        return false;
}


var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(session({
        secret: 'MySecretKey#1324',
        saveUninitialized: false,
        key: 'nodesesscookie',
        resave: false,
        secure: false,
        cookie: { expires: 60000, sameSite: 'Lax' }
}));



app.get('/', (req, res) => {
        if (req.session.username) {
                res.redirect('/getsessioninfo');
        }
        else {
                res.sendFile(path.join(__dirname, 'static', 'index.html'));
        }
});

app.post('/setsession', (req, res) => {
        if (req.session.username) {
                res.redirect('/getsessioninfo');
        }
        else if (req.body.username) {
                if (user_store[req.body.username]) {
                        req.session.username = req.body.username;
                }
                res.redirect('/getsessioninfo');
        }
        else {
                res.redirect('/');
        }
});

app.get('/getsessioninfo', (req, res) => {
        if (req.session) {
                res.send('Your Session is already set to username: ' + req.session.username + '\nVisit /resource1 or /resource2');
        }
        else {
                res.redirect('/');
        }
});

app.get('/resource1', (req, res) => {
        if ( perm_check(req.session.username, 'resource1', 'read') ) {
                res.send(req.session.username + ' - read - resource 1 - ALLOWED');
        }
        else {
                res.send(req.session.username + ' - read - resource 1 - DISALLOWED');
        }
});

app.post('/resource1', (req, res) => {
        if ( perm_check(req.session.username, 'resource1', 'write') ) {
                res.send(req.session.username + ' - write - resource 1 - ALLOWED');
        }
        else {
                res.send(req.session.username + ' - write - resource 1 - DISALLOWED');
        }
});


app.get('/resource2', (req, res) => {
        if ( perm_check(req.session.username, 'resource2', 'read', ) ) {
                res.send(req.session.username + ' - read - resource 2 - ALLOWED');
        }
        else {
                res.send(req.session.username + ' - read - resource 2 - DISALLOWED');
        }
});

app.post('/resource2', (req, res) => {
        if ( perm_check(req.session.username, 'resource2', 'write') ) {
                res.send(req.session.username + ' - write - resource 2 - ALLOWED');
        }
        else {
                res.send(req.session.username + ' - write - resource 2 - DISALLOWED');
        }
});



app.listen(8443, () => {
        console.log('listening on 8443');
});
