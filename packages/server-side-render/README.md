# ServerSideRender

ServerSideRender is a component used for server-side rendering a preview of dynamic blocks to display in the editor. Server-side rendering in a block's `edit` function should be limited to blocks that are heavily dependent on existing PHP rendering logic that is heavily intertwined with data, particularly when there are no endpoints available.

ServerSideRender may also be used when a legacy block is provided as a backward compatibility measure, rather than needing to re-write the deprecated code that the block may depend on.

ServerSideRender should be regarded as a fallback or legacy mechanism, it is not appropriate for developing new features against.

New blocks should be built in conjunction with any necessary REST API endpoints, so that JavaScript can be used for rendering client-side in the `edit` function. This gives the best user experience, instead of relying on using the PHP `render_callback`. The logic necessary for rendering should be included in the endpoint, so that both the client-side JavaScript and server-side PHP logic should require a minimal amount of differences.

> This package is meant to be used only with WordPress core. Feel free to use it in your own project but please keep in mind that it might never get fully documented.

## Installation

Install the module

```bash
npm install @aarondewes/wp-server-side-render --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you're using an environment that has limited or no support for ES2015+ such as IE browsers then using [core-js](https://github.com/zloirock/core-js) will add polyfills for these methods._

## Usage

The props accepted by the component are described below.

## Props

### attributes

An object containing the attributes of the block to be server-side rendered.
E.g: `{ displayAsDropdown: true }`, `{ showHierarchy: true }`, etc...

-   Type: `Object`
-   Required: No

### block

The identifier of the block to be server-side rendered.
Examples: "core/archives", "core/latest-comments", "core/rss", etc...

-   Type: `String`
-   Required: Yes

### className

A class added to the DOM element that wraps the server side rendered block.
Examples: "my-custom-server-side-rendered".

-   Type: `String`
-   Required: No

### httpMethod

The HTTP request method to use, either 'GET' or 'POST'. It's 'GET' by default. The 'POST' value will cause an error on WP earlier than 5.5, unless 'rest_endpoints' is filtered in PHP to allow this. If 'POST', this sends the attributes in the request body, not in the URL. This can allow a bigger attributes object.

-   Type: `String`
-   Required: No

### urlQueryArgs

Query arguments to apply to the request URL.
E.g: `{ post_id: 12 }`.

-   Type: `Object`
-   Required: No

### EmptyResponsePlaceholder

This is a [render prop](https://reactjs.org/docs/render-props.html). When the api response is empty, the value of this prop is rendered. The render prop will receive the value of the api response as well as all props passed into `ServerSideRenderer`.

-   Type: `WPElement`
-   Required: No

### ErrorResponsePlaceholder

This is a [render prop](https://reactjs.org/docs/render-props.html). When the api response is an error, the value of this prop is rendered. The render prop will receive the value of the api response as well as all props passed into `ServerSideRenderer`.

-   Type: `WPElement`
-   Required: No

### LoadingResponsePlaceholder

This is a [render prop](https://reactjs.org/docs/render-props.html). While the request is being processed (loading state), the value of this prop is rendered. The render prop will receive the value of the api response as well as all props passed into `ServerSideRenderer`.

-   Type: `WPElement`
-   Required: No

## Usage

Render core/archives preview.

```jsx
import ServerSideRender from '@aarondewes/wp-server-side-render';

const MyServerSideRender = () => (
	<ServerSideRender
		block="core/archives"
		attributes={ {
			showPostCounts: true,
			displayAsDropdown: false,
		} }
	/>
);
```

If imported from the `wp` global, an alias is required to work in JSX.

```jsx
const { serverSideRender: ServerSideRender } = wp;

const MyServerSideRender = () => (
	<ServerSideRender
		block="core/archives"
		attributes={ {
			showPostCounts: true,
			displayAsDropdown: false,
		} }
	/>
);
```

## Output

Output uses the block's `render_callback` function, set when defining the block.

## API Endpoint

The API endpoint for getting the output for ServerSideRender is `/wp/v2/block-renderer/:block`. It will use the block's `render_callback` method.

If you pass `attributes` to `ServerSideRender`, the block must also be registered and have its attributes defined in PHP.

```php
register_block_type(
	'core/archives',
	array(
		'api_version' => 2,
		'attributes'      => array(
			'showPostCounts'    => array(
				'type'      => 'boolean',
				'default'   => false,
			),
			'displayAsDropdown' => array(
				'type'      => 'boolean',
				'default'   => false,
			),
		),
		'render_callback' => 'render_block_core_archives',
	)
);
```
