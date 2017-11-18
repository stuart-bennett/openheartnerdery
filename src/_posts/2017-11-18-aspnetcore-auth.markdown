---
layout: post
title:  "Authentication & Authorization in ASP.NET Core"
subtitle: "An indepth look at the structure & implementation"
date:   2017-11-18 15:14
categories: Authentication Authorization ".NET Core"
---

Let's begin by defining to two, often conflated, terms that serve as the core topic of this post:

  - Authentication
    - The establishment of an identity. Fundamentally it relies on the user providing something that we, as the accepting party, can be reasonably certain is only known to them. Traditionally this is done via a username & password, now it's becoming more common to see the presence of a bearer token as such proof. 

  - Authorization
    - With an identity established, we should have some knowledge about it. For example, assuming it's human identity - their name, their age, their length of employment. *Authorization* is when we decide whether these attributes of the identity are considered appropriate to view the resource we are trying to protect. Consider a company intranet site that has a benefits page where employees can enable/disable benefits that the company offer. Consider again that it is company policy that only employees with more than 1 years service can enrol in these benefits. We can assert that the identity's length of service is greater than a year and grant authorize, otherwise refuse them access.

### Recap - History of protecting your resources
You may recall from earlier versions of MVC that you would protect your controllers and actions using the `[Authorize]` attribute. You may also recall that, rather than requiring only that the identity has been authenticated, you could write something like

`[Authorize(Roles="CanAccessBenefits", Users="Peter, Samir, Michael"]`

to identity specific users and/or roles to which that identity must be associated. Roles were typically better than users because user permissions change more frequently than roles which means adding/removing users all the time means re-building and re-deploying your MVC app everytime. All in all then, nothing hugely different from what we had seen previously in Microsoft Web Frameworks.

Whilst this was going on, there might have been a point that you became aware of (Claims-based Authorization)[https://docs.microsoft.com/en-us/aspnet/core/security/authorization/claims] and (Windows Identity Foundation)[https://msdn.microsoft.com/en-gb/library/ee748475.aspx]. This may also have lead you to discover the work being done by (ThinkTecture)[https://www.thinktecture.com/] by way of their (IdentityModel)[https://github.com/IdentityModel/Thinktecture.IdentityModel] project which served to augment more than just the claims-based authorization experience of programming with .NET, but in relation to our discussion, provided some attributes like `ClaimsAuthorize` which effectively wrapped the WIF claims code and gave developers a means to integrate claims-based authorization into their MVC / WebAPI without writing their own authorization infrastructure code.

Fast-forward now to ASP.NET Core MVC, protection of your routes is still controlled by the `[Authorize]` attribute. It can do all the stuff it did before but this time it comes with a greater degree of flexibility by way of the new "Policy" based authorization system. A policy is simply one or more requirements associated with an authentication scheme. A requirement would be your demands of the identity such as, their "Years Served" property must be greater than 1 year. An authentication scheme is simply the mode of authentication to which these set of requirements belong, for example, the mode of authentication may have been token-based in that it used the possessions of a bearer token to prove to us they are who they claim to be. If you're more familiar with username/password authentication, then instead of token, the the presence of an authentication token (and some checks we would do on the contents of that cookie to verify that the cookie was issued by our server and not just fabricated by the user).

These concepts should become clearer as you see their use in the code itself. Speaking of which, let's start looking at the implementation.

### The Implementation

** Bit about  the repositories to be looking at here? **
** Bit about the "Thing / ThingProvider" pattern here **

### Policies

The heart of a Policy is captured in the `AuthorizationPolicy` class in `Microsoft.AspNetCore.Authorization`. It exposes two properties:

    `public IReadOnlyList<IAuthorizationRequirement> Requirements { get; }`
    `public IReadOnlyList<string> AuthenticationSchemes { get; }`
