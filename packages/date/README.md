# Date

Date module for WordPress.

## Installation

Install the module

```bash
npm install @aarondewes/wp-date --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you're using an environment that has limited or no support for ES2015+ such as IE browsers then using [core-js](https://github.com/zloirock/core-js) will add polyfills for these methods._

## API

<!-- START TOKEN(Autogenerated API docs) -->

<a name="date" href="#date">#</a> **date**

Formats a date (like `date()` in PHP).

_Related_

-   <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
-   <https://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC>

_Parameters_

-   _dateFormat_ `string`: PHP-style formatting string. See php.net/date.
-   _dateValue_ `Moment | Date | string | undefined`: Date object or string, parsable by moment.js.
-   _timezone_ `string | undefined`: Timezone to output result in or a UTC offset. Defaults to timezone from site.

_Returns_

-   `string`: Formatted date in English.

<a name="dateI18n" href="#dateI18n">#</a> **dateI18n**

Formats a date (like `wp_date()` in PHP), translating it into site's locale.

Backward Compatibility Notice: if `timezone` is set to `true`, the function
behaves like `gmdateI18n`.

_Related_

-   <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
-   <https://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC>

_Parameters_

-   _dateFormat_ `string`: PHP-style formatting string. See php.net/date.
-   _dateValue_ `Moment | Date | string | undefined`: Date object or string, parsable by moment.js.
-   _timezone_ `string | boolean | undefined`: Timezone to output result in or a UTC offset. Defaults to timezone from site. Notice: `boolean` is effectively deprecated, but still supported for backward compatibility reasons.

_Returns_

-   `string`: Formatted date.

<a name="format" href="#format">#</a> **format**

Formats a date. Does not alter the date's timezone.

_Parameters_

-   _dateFormat_ `string`: PHP-style formatting string. See php.net/date.
-   _dateValue_ `Moment | Date | string | undefined`: Date object or string, parsable by moment.js.

_Returns_

-   `string`: Formatted date.

<a name="getDate" href="#getDate">#</a> **getDate**

Create and return a JavaScript Date Object from a date string in the WP timezone.

_Parameters_

-   _dateString_ `string?`: Date formatted in the WP timezone.

_Returns_

-   `Date`: Date

<a name="gmdate" href="#gmdate">#</a> **gmdate**

Formats a date (like `date()` in PHP), in the UTC timezone.

_Parameters_

-   _dateFormat_ `string`: PHP-style formatting string. See php.net/date.
-   _dateValue_ `Moment | Date | string | undefined`: Date object or string, parsable by moment.js.

_Returns_

-   `string`: Formatted date in English.

<a name="gmdateI18n" href="#gmdateI18n">#</a> **gmdateI18n**

Formats a date (like `wp_date()` in PHP), translating it into site's locale
and using the UTC timezone.

_Parameters_

-   _dateFormat_ `string`: PHP-style formatting string. See php.net/date.
-   _dateValue_ `Moment | Date | string | undefined`: Date object or string, parsable by moment.js.

_Returns_

-   `string`: Formatted date.

<a name="isInTheFuture" href="#isInTheFuture">#</a> **isInTheFuture**

Check whether a date is considered in the future according to the WordPress settings.

_Parameters_

-   _dateValue_ `string`: Date String or Date object in the Defined WP Timezone.

_Returns_

-   `boolean`: Is in the future.

<a name="setSettings" href="#setSettings">#</a> **setSettings**

Adds a locale to moment, using the format supplied by `wp_localize_script()`.

_Parameters_

-   _dateSettings_ `DateSettings`: Settings, including locale data.


<!-- END TOKEN(Autogenerated API docs) -->

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
