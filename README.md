# Anish Sujanani - 100 Days of Learning

*All directories will contain notes as per the overview in this file*

## Topics:
/AppSec - Application Security  
/Identity - Authentication and Authorization  
/CloudInfra - AWS, Operating Systems

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
  - [CodeQL - looking for the RSysLog strcpy issues](https://www.youtube.com/watch?v=AMzGorD28Ks)
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
  - [Wrote a blog post on custom OAuth with NodeJS](https://medium.com/bugbountywriteup/oauth2-0-from-scratch-auth-code-flows-and-rbac-with-nodejs-dda9b51a4c36)  

**App-Sec:**
  - Learnt about Linux system call race conditions and TOCTOU vulns
  - learnt about prototype pollution in JS objects
------------  
### Day 14 `notes written` 
**App-Sec:**
  - Deep dive into Memcached security - debug interface, API, LRU cache crawling, authentication with SASL
  - Deep dive into AWS Elasticache security and best practices
  - Active Directory Internals and Security Measures
------------  
### Day 15 `notes written` 
**App-Sec:**
  - Active Directory Security - LDAP, SPN Scans, Transitive-trusts and Recon
  - Active Directory Security - AS_REQ for TGT, Kerberos Pre-Auth 
  - Active Directory Security - AS-REP Roast, Kerberoast, Silver Ticket, Golden Ticket, Sekeleton Keys
------------  
### Day 16  
**App-Sec:**
  - Got started writing my own BurpSuite plugins  


**Cloud-Infra:**
  - Read up on AWS S3 for the SAA
  - Started learning about Windows Servers 
------------  
### Day 17  
**App-Sec:**
  - Continued writing custom plugins  
  - More PortSwigger Web Academy excercises
------------  
### Day 18  
**App-Sec:**
  - Did more PortSwigger Web Academy Challenges
  - Read about web cache best practices 
  - Callbacks, Promises and async/await with NodeJS
------------  
### Day 19
**App-Sec:**
  - Learnt more about SSL accelerators/terminating proxies
  - Continued working on the custom BurpSuite plugin 
  - Watched an [excellent video on API endpoint discovery and enumeration](https://www.youtube.com/watch?v=fvcKwUS4PTE)
------------  
### Day 20
**App-Sec:**
  - [Serverless Application Security - Lambdas and GraphQL](https://www.youtube.com/watch?v=wCRkmeLYhYQ&t=527s)

**Cloud-Infra:**
  - Learnt about AWS Serverless applications - Lambdas - Functions as a Service
  - Learnt about connecting Lambda backends with API Gateway
------------  
### Day 21
**App-Sec:**
- [Microsoft - Guidance on responding to Security Incidents](https://docs.microsoft.com/en-us/previous-versions/tn-archive/cc700825(v=technet.10)?redirectedfrom=MSDN)
- [SANS Paper on Mobile AV](https://www.sans.org/reading-room/whitepapers/mobile/paper/38990)
- Continued course on IR
------------  
### Day 22
**App-Sec:**
- Continued course on IR 
- Continued Web Lab Excercises   
**Practiced LeetCode problems - 1431, 1470 1480**

------------  
### Day 23
**App-Sec:**
- Continued course on IR  
- Learnt about NodeJS Dependency audit as part of the build chain  
- Started building the backend API for the HTTP Analysis plugin  
**Practiced LeetCode problems - 520, 705, 125**

------------  
### Day 24
**Practiced LeetCode problems - 1534, 1290, 1464**

------------  
### Day 25
**Practiced LeetCode problems - 905, 1450**  

**CloudInfra** 
- Learnt about custom headers and Bearer/token auth for nodejs backend services 
  
**AppSec**
- Continued course on IR procedures and baselining IT assets
- Learnt about Layer 2 Network Unicast ARP implementation

------------  
### Day 26
**Practiced LeetCode problems - 804, 1351**  

**CloudInfra** 
- Learnt about setting up Windows Servers - AD/DHCP/DNS and Backups   

------------  
### Day 27
**Practiced LeetCode problems - 728, 1299, 1475**  

**CloudInfra** 
- Learnt about routing protocols for better Quality of Service per application