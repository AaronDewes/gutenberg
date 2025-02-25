# Filter Reference

[Hooks](https://developer.wordpress.org/plugins/hooks/) are a way for one piece of code to interact/modify another piece of code. They provide one way for plugins and themes to interact with the editor, but they’re also used extensively by WordPress Core itself.

There are two types of hooks: [Actions](https://developer.wordpress.org/plugins/hooks/actions/) and [Filters](https://developer.wordpress.org/plugins/hooks/filters/). In addition to PHP actions and filters, WordPress also provides a mechanism for registering and executing hooks in JavaScript. This functionality is also available on npm as the [@aarondewes/wp-hooks](https://www.npmjs.com/package/@aarondewes/wp-hooks) package, for general purpose use.

You can also learn more about both APIs: [PHP](https://codex.wordpress.org/Plugin_API/) and [JavaScript](/packages/hooks/README.md).
