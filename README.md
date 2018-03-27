# ahoy_matey

⚓️ Visit and event tracking for JavaScript ⛵️

- Easily track unique visitors
- Track events across page navigation

Use it with any backend. For Rails, check out the [Ahoy gem](https://github.com/ankane/ahoy).

[![Build Status](https://travis-ci.org/ankane/ahoy.js.svg?branch=master)](https://travis-ci.org/warmlyyours/ahoy_matey)

#### Why was this forked from [Ahoy.js](https://github.com/ankane/ahoy.js)?
`Ahoy.js` makes poor use of its build tooling. The original author was unwilling to accept changes, so this version trims the fat. (Plus it's  more lightweight & compatible with downstream build tools)

## Installation

Download [ahoy_matey](https://unpkg.com/ahoy_matey) and include it on your page.

```html
<script src="ahoy.min.js"></script>
```

Or use Yarn/npm:

```sh
yarn add ahoy_matey
```

-and import it with:

```es6
import ahoy from 'ahoy_matey';
```

## How It Works

When someone lands on your website, they are assigned a visit token and a visitor token.

The visit token expires after 4 hours, in which a new visit is created.  Visits are useful for tracking metrics like monthly active users.  The visitor token expires after 2 years.  A `POST` request is sent to `/ahoy/visits` with:

- visit_token
- visitor_token
- referrer
- landing_page

The server can capture:

- ip
- user_agent
- user - from app authentication

And calculate things like:

- referring_domain and search_keyword from referrer
- utm_source, utm_medium, utm_term, utm_content, and utm_campaign from landing_page
- city, region, and country from ip
- browser, os, and device_type from user_agent

## Events

Track events with:

```javascript
ahoy.track(name, properties);
```

A `POST` request is sent to `/ahoy/events` with:

- name
- properties
- time

The server can capture:

- visit_token - from cookies
- user - from app authentication

As a precaution, the server should reject times that do not match:

```
1 minute ago < time <= now
```

### All Events

Track all views and clicks with:

```javascript
ahoy.trackAll();
```

Set the page with:

```javascript
ahoy.configure({page: "Landing page"});
```

And sections with:

```html
<div data-section="Header">
  <a href="/home">Home</a>
</div>
```

These are included in event properties if set.

### Views

```javascript
ahoy.trackView();
```

Name - `$view`

Properties

- url - `https://www.streamflip.com`
- title - `Streamflip`

### Clicks

```javascript
ahoy.trackClicks();
````

Name - `$click`

Properties

- tag - `a`
- id - `account-link`
- class - `btn btn-primary`
- text - `View Account`
- href - `/account`

### Submits

```javascript
ahoy.trackSubmits();
````

Name - `$submit`

### Changes

```javascript
ahoy.trackChanges();
````

Name - `$change`

## Development

Ahoy is built with developers in mind.  You can run the following code in your browser’s console.

Force a new visit

```javascript
ahoy.reset(); // then reload the page
```

Log messages

```javascript
ahoy.debug();
```

Turn off logging

```javascript
ahoy.debug(false);
```

## Configuration

Here’s the default configuration:

```javascript
ahoy.configure({
  urlPrefix: "",
  visitsUrl: "/ahoy/visits",
  eventsUrl: "/ahoy/events",
  cookieDomain: null,
  page: null,
  platform: "Web",
  useBeacon: false,
  startOnReady: true
});
```

## Subdomains

To track visits across multiple subdomains, use:

```javascript
ahoy.configure({cookieDomain: "yourdomain.com"});
```

## Dev Setup

```sh
git clone https://github.com/warmlyyours/ahoy_matey.git
cd ahoy_matey
yarn install
yarn build
yarn test:local
```

And visit `http://localhost:8080/__zuul` in your browser.

## TODO

- Send events in batches
- Add page and section for automatic events
- Add `trackContent` method

## History

View the [changelog](https://github.com/warmlyyours/ahoy_matey/blob/master/CHANGELOG.md)

## Contributing

Everyone is encouraged to help improve this project. Here are a few ways you can help:

- [Report bugs](https://github.com/warmlyyours/ahoy_matey/issues)
- Fix bugs and [submit pull requests](https://github.com/warmlyyours/ahoy_matey/pulls)
- Write, clarify, or fix documentation
- Suggest or add new features
