# Anish Sujanani - 100 Days of Info-Sec

*All directories will contain notes as per the overview in this file*

## Topics:
/AppSec - Application Security  
/Identity - Authentication and Authorization
 
## Each directory will contain .md files for each day that I explore a topic within that domain. Files include notes, references, PoCs.

------------
## Tracking
### Day 1 - `notes written`
**Identity:**
  - Identity Solution Architectures
  - Good authenticaion practices + Server Statelessness / Client Statelessness
  - Building custom permission matrices 
  - NodeJS libraries for ABAC/RBAC
  - Centralised solutions to be explored in days to come
------------
### Day 2 - `notes written`
**Identity:**
  - Building RBAC with NodeJS-Express from scratch + PoC
  - Custom RBAC becomes an issue as resources/roles/actions grow - need to centralise
  - Centralised solutions speak over the network either through SAML or OAuth2.0, looking at common solutions
------------
### Day 3 - `notes written`
**Identity:**
  - Read the OAuth2.0 Specification - [RFC-6749](https://tools.ietf.org/html/rfc6749)
  - Started implementation on a from-scratch OAuth2.0 Authorization Server - trying to implement above RFC
  - Looked into OAuth Flows - resources linked in notes
  - Came across Web Authn - a new standard for bringing MFA/biometrics to browsers & PKI for web-app authentication
  - Might branch out and explore Web-Authn too?
------------
### Day 4 - `notes written`
**Identity:**
  - Implemented OAuth2.0 Authorization Code Flow from scratch by following the RFC - using NodeJS 
  - Servers were hosted on AWS, so the IP addresses in the code are no longer the same 
  - Got started writing blog post about this 
------------
### Day 5 - `notes written`
**App-Sec:**
  - Looked into NodeJS Security implementations
  - NPM Library Auditing
------------
### Day 6 - `notes written`
**App-Sec:**
  - iFrame embedding and the PostMessage API for sandboxing JS
  - [Box-JS](https://www.npmjs.com/package/box-js) for offline analysis of JS files
  - ELF Format - Section-Segment mapping during linking/process loading + Padding Injection
  - [OWASP CheatSheet Project](https://www.sans.org/reading-room/)
  - [SANS Reading Room](https://www.sans.org/reading-room/)

**Identity**
  - Blog Post - in progress on OAuth2.0 from scratch
------------
### Day 7 - `notes written`
**App-Sec:**
  - Javascript Internals - Butterfly objects, boxing
  - WebKit security Issues 

**Identity:**
  - Read about integrating AWS Cognito with API Gateway 
------------
### Day 8 - `notes written`
**App-Sec:**
  - CSRF Defence Patterns - Synchonizer Token vs. Double Submit Cookies
  - State of NodeJS Security
  - SnykIO and avoid common Node Security Issues
  - NodeJs Security Practices - Helmet for Express
------------
### Day 9
**App-Sec:**
  - Read up on a few NPM lib and PIP lib disclosures on Snyk
  - [Memory leak errors with NodeJS](https://www.youtube.com/watch?v=hliOMEQRqf8)
------------
### Day 10
**App-Sec:**
  - CodeQL for discovering bad code / semantic patterns in codebases
  - Security Guidelines in Open-Source Ecosystems - [Open Source Security Foundation](https://openssf.org/)

**Identity:**
- Better IAM policy development for AWS S3
------------
### Day 11
**App-Sec:**
  - [CodeQL - looking for the RSysLog strcpy vulnerability](https://www.youtube.com/watch?v=AMzGorD28Ks)
  - [CodeQL - Looking for the Apache Struts Insecure XML Deserialization](https://www.youtube.com/watch?v=nvCd0Ee4FgE)
  - Started playing around with CodeQL on my older repos
------------
### Day 12
**App-Sec:**
  - Studied more CodeQL queries
  - Started studying C Programming POSIX system calls & threading / sync security issues
  - The plan is to build up CodeQL to look for these patters, eg. open() after access() without checking for whether the directory was modified or symbolic link checks
------------
### Day 13
**Identity:**
  - Wrote a blog post on custom OAuth with NodeJS
**App-Sec:**
  - Learnt about Linux system call race conditions and TOCTOU vulns
 
