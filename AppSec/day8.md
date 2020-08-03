# CSRF Protection
## Primarily 2 patterns used, both patterns have slight implementation variants:
- ### Synchronizer Token Pattern
    - Implemented when server-side sessions are used
    - Server maintains a CSRF token within each user's session
    - Does this token change on every request? Or every sensitive request? Or is is the same for the entire session for that user? - up to the developer. Changing tokens for each and every request affects usability, no backward navigation through app. 
    - A client browser will send the CSRF token in its request. This browser-sent token will be compared to the token stored in the session. If they match, server knows that the client did in fact, send this request voluntarily. 
    - This is because another origin (page/domain) cannot read or change the DOM of the app server due to Same Origin Policy
    - **Variant 1:** Token is sent from the server embedded as hidden field in a form that will be POSTed. However, this works only for forms. Custom AJAX requests will have to manually embed this. This is more suited for traditional embedded forms.
    - **Variant 2:** Custom headers - this has 2 sub-variants. After log in, server may set the CSRF token corresponding to session as a header eg. X-CSRF-TOKEN header - which will be sent back by client browser. This works because Same Origin Policy prevents diff. origin from accessing headers. The client browser might also make an AJAX request to retrieve the current CSRF value and append a header on its own. The difference here is basically who initiates the CSRF token transfer. This is more suited for AJAX requests.
    - **Variant 3:** The server already knows the CSRF token for the current user's session, but also sends token down as a cookie. The client side can now either embed this cookie value in the form or can read it while sending an AJAX request. This is a versatile option as **variant 1** requires changes to static HTML on all required pages of the app. **Variant 2** requires AJAX requests to be sent to get the token. However, the disadvantage is that the cookie will get submitted for all requests even if the body does not read and embed it, eg. even for images and other resources that do not reqiure CSRF, therefore increasing the request size. Also, this cookie cannot be HTTP-only as it has to be read by JS and injected dynamically for forms and by AJAX requests.  

- ### Double Submit Cookie Pattern
    - Implemented when server-side sessions are not used, eg. to save on performance OR stateless server implementations / API server implementation
    - In reponse to a client request, the server will generate a random token and serve as a cookie
    - On subsequent requests that need to be protected, the client is expected to read this cookie and append it to its body - can be either a query string param or a hidden field in form and send back
    - this way, the server will get back a cookie and the body/query string containing the value of the cookie
    - server checks if those 2 values match. If yes, good to go 
    - We need both because: **If only cookie and no embedding:** this defeats CSRF protection. The cookie would be sent on every request and would be the basis for a CSRF attack. **If only embedding and no cookie:**  an attacker can inject any value during CSRF and it would go through. 
    - We need both as Same Origin Policy prevents diff domain from reading cookies AND the server can verify that its cookie was read an embedded by the client in the request body - therefore removing the need for maintaining its own sessions.


# NodeJS - Package Security
- [Understanding and Avoiding Commong NodeJS Security Mistakes](https://www.youtube.com/watch?v=QSMbk2nLTBk)
- [Bypassing Anti-CSRF Double Submit Cookie Patterns with Sub-Domain Takeover](https://www.youtube.com/watch?v=2uvrGQEy8i4&t=1s)
- [The State of NodeJS Security](https://www.youtube.com/watch?v=14IJEjTcG9g)

# NodeJS - Helmet for Express
Just found this, look further into this tomorrow.