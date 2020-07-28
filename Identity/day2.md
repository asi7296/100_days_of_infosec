## Implementing RBAC from scratch

*Once again, writing your own system from scratch is not recommended, do not re-invent the wheel, use libraries for a small scale one-time implementation or centralize your identity operations*
*Writing my own here just to get a baseline of the effort to build from scratch*

Authentication is simulated and a session cookie is set mapping to the username on the server-side  
For this PoC, an in-code JSON is used, typically a DB would be used  

A user JSON contains usernames and their roles  
A role_permission matrix JSON contains the roles as keys, resources as sub-keys and booleans as values  
Similar to the table seen in [day1.md](https://github.com/asi7296/100_days_of_infosec/blob/master/Identity/day1.md)

For each request, we check that the session has a username set and that the user has a role that has a True for the resource-action pair  

[Full PoC Code Here](https://github.com/asi7296/100_days_of_infosec/blob/master/Identity/custom_rbac_server.js), sections explained below


## User Store & Role-Resource-Permission Matrix
```javascript
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

```

## Example of a route (/resource1) being protected
Check if the user corresponding to the session has 'write' (post) permissions to the resource (route /resource1) 
```javascript
app.post('/resource1', (req, res) => {
        if ( perm_check(req.session.username, 'resource1', 'write') ) {
                res.send(req.session.username + ' - write - resource 1 - ALLOWED');
        }
        else {
                res.send(req.session.username + ' - write - resource 1 - DISALLOWED');
        }
});
```

## Actually evaluating policies - the perm_check() function
```javascript
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
```

If a user is assigned multiple roles, you would take a union of the resource-permission pairs for those roles and evaluate if any of them evaluate to True  
  
  
For simple stand-alone implementations that have few resources, few roles and few operations, you could get away with simple systems like these. However, as resources, roles, permissions and users grow and become more granukar

However, when we talk about larger organizations with multiple development teams developing separate applications, having a centralised solution allows:
- Single source of truth - single user store and permission matrices per app/role
- Single Sign On 
- Cross-Application permission checks 
- Easier Log Management and Accounting
- Reduced risk due to lesser moving parts 
- Standardizing identity operations across applications and development team through a common API/SDK.


## Centralized Identity Providers
Commonly used libraries/solutions that I have come across:
- Keycloak
- AWS Cognito
- Casbin
- Auth0  

These are centralized solutions - so how do we transmit info over a network?  
Enter: SAML and OAuth2.0  

Will pick up OAuth2.0 tomorrow and dive deep into its different flows and when to implement each - leading up to NodeJS and KeyCloak.
