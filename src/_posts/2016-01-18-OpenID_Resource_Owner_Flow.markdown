---
layout: post
title:  OpenID Connect & Resource Owner Flow
subtitle: OpenID Connect is built on OAuth 2.0. Here's an example of using the Resource Owner flow for when you need a 2-legged authentication process.
date:   2016-01-18 18:00:00
categories: OpenID OAuth2.0 Authentication Identity
---
The [OpenID Core Spec](http://openid.net/specs/openid-connect-core-1_0.html) details how to use process an OpenID Connect request using either of these two OAuth 2.0 flows:

- [The Authorization Code Flow](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)
- [The Implicit Flow](http://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth)

Here's a quick recap on these two flows:

The "Authorization Code Flow" is probably the flow you're most used to seeing. This is where an application (the relying party or _rp_) produces an authentication challenge that requires you to enter your credentials with a different domain. This is ideal for scenarios where you can't trust the relying party to handle your username and password (or whatever credentials you require) - e.g. you (rightly) wouldn't want to give your Google account details to _honest-johns-calendar-app.com_.

The "Implicit Flow" is an abbreviated version of the "Authorization Code Flow" designed for clients running within a browser scripting environment[1](#footnotes-1), so JavaScript.. You still enter your credentials at the authorization server but you are redirected with the access token as a URI fragment (https://www.openheartnerdery.co.uk/page#access_token=...). Typically you redirect to a page whose sole responsibility is to extract the token and then get it back to the application somehow, perhaps writing to an [HTTP-only Cookie](https://www.owasp.org/index.php/HttpOnly), therefore including it on future HTTPS requests.

#### "I don't want to redirect my user"

It's feasible that at times you may want to configure a client who, for whatever reason, cannot be redirected to a different domain to authenticate. Usually it's a story of consistency but it might be one of restrictive security at your customer's end or even the pursuit of simplicity.

There's typically three reasons you have an OAuth solution:

1. External clients build their own applications and use their data and their identity that they have accumulated with your service(s).
2. You have shared identities across a suite of services and you provide a single sign-on service for all of them.
3. You have a dedicated team that handles identity, authentication and authorisation concerns across your all of your products.

If you are the owner of the authentication service then, in regards to trust, there's little to gain as a user entering their credentials on a separate service. It's still your organisation that the user is trusting.

[1] = [https://tools.ietf.org/html/rfc6749#section-1.3.2](https://tools.ietf.org/html/rfc6749#section-1.3.2)
