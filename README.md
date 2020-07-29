# Anish Sujanani - 100 Days of Info-Sec

*All directories will contain notes as per the overview in this file*

## Topics:
/Identity - Authentication and Authorization 


## Tracking
### Day 1
**Identity:**
  - Identity Solution Architectures
  - Good authenticaion practices + Server Statelessness / Client Statelessness
  - Building custom permission matrices 
  - NodeJS libraries for ABAC/RBAC
  - Centralised solutions to be explored in days to come

### Day 2
**Identity:**
  - Building RBAC with NodeJS-Express from scratch + PoC
  - Custom RBAC becomes an issue as resources/roles/actions grow - need to centralise
  - Centralised solutions speak over the network either through SAML or OAuth2.0, looking at common solutions

### Day 3
**Identity:**
  - Read the OAuth2.0 Specification - [RFC-6749](https://tools.ietf.org/html/rfc6749)
  - Started implementation on a from-scratch OAuth2.0 Authorization Server - trying to implement above RFC
  - Looked into OAuth Flows - resources linked in notes
  - Came across Web Authn - a new standard for bringing MFA/biometrics to browsers & PKI for web-app authentication
  - Might branch out and explore Web-Authn too?

### Day 4
**Identity:**
  - Implemented OAuth2.0 Authorization Code Flow from scratch by following the RFC - using NodeJS 
  - Servers were hosted on AWS, so the IP addresses in the code are no longer the same 
  - Got started writing blog post about this 