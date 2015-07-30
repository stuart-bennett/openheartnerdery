---
layout: post
title:  Web Components
subtitle: Structure comes to widget development on the web.
date:   2014-04-27 20:11:00
categories: web components polymer
---

When it comes to making resuable, interactive elements in HTML, we've had quite the evolution - from pinching scripts from [DHTML Goodies](http://www.dhtmlgoodies.com/) through to jQuery plugins and jQuery UI. Whilst these approaches and always provided the goods, if you've been bitten by the semantic bug, you've probably felt something was missing.

#### What once was... jQuery UI

jQuery UI is awesome and no doubt is responsible for improving the productivity of developers worldwide, but if you've been digging around in it's source code you'll know that it's no fun trying to follow all that DOM manipulation, _appending_ this, _prepending_ that, it soon becomes unmanageable.

#### Towards the future
[Web Components](http://www.w3.org/TR/components-intro/) provide an all-encompassing, structured approach to building custom elements, or _widgets_ if you prefer.

Web Components bring harmony to widget development by unifying a series of areas of development that have largely been developing and progressing in isolation. If you've been developing your own interactive UI components you definitely have come across at least two (if not all) of the high level facets of web components:

- Templates - Think [mustache](http://mustache.github.io). The browser understands what you are defining is dormant HTML that is waiting to be hydrated.

- Custom Elements - Define your own tags with their own HTML representation (via templating) and API (via JavaScript)

- Shadow DOM - At last, encapsulation of DOM. Stop worrying about not using ID - each web component is self-contained.

- Imports - Finally a concerted effort to define a common approach on how to bundle all the above into a single package.

#### Bridging the gap

Unfortunately the magnitude of change caused by Web Components means leaning on a ton of new, native browser features. Like all progressive web development, we can't reliably have our code work correctly across browsers.

#### More reading

[Keep on eye on progress](http://jonrimmer.github.io/are-we-componentized-yet/).
