# MainDashboardButton

This slot allows replacing the default main dashboard button in the post editor and site editor.
It's used for returning back to main wp-admin dashboard when editor is in fullscreen mode.

## Examples

### Post editor example

This will override the W icon button in the header.

```js
import { registerPlugin } from '@aarondewes/wp-plugins';
import { __experimentalMainDashboardButton as MainDashboardButton } from '@aarondewes/wp-edit-post';

const MainDashboardButtonTest = () => (
	<MainDashboardButton>
		Custom main dashboard button content
	</MainDashboardButton>
);

registerPlugin( 'main-dashboard-button-test', {
	render: MainDashboardButtonTest,
} );
```

If your goal is just to replace the icon of the existing button in
the post editor, that can be achieved in the following way:

```js
import { registerPlugin } from '@aarondewes/wp-plugins';
import {
	__experimentalFullscreenModeClose as FullscreenModeClose,
	__experimentalMainDashboardButton as MainDashboardButton,
} from '@aarondewes/wp-edit-post';
import { close } from '@aarondewes/wp-icons';

const MainDashboardButtonIconTest = () => (
	<MainDashboardButton>
		<FullscreenModeClose icon={ close } href="http://wordpress.org" />
	</MainDashboardButton>
);

registerPlugin( 'main-dashboard-button-icon-test', {
	render: MainDashboardButtonIconTest,
} );
```

### Site editor example

In the site editor this slot refers to the "back to dashboard" button in the navigation sidebar.

```js
import { registerPlugin } from '@aarondewes/wp-plugins';
import { __experimentalMainDashboardButton as MainDashboardButton } from '@aarondewes/wp-edit-site';
import { __experimentalNavigationBackButton as NavigationBackButton } from '@aarondewes/wp-components';

const MainDashboardButtonIconTest = () => (
	<MainDashboardButton>
		<NavigationBackButton
			backButtonLabel={ __( 'Back to dashboard' ) }
			className="edit-site-navigation-panel__back-to-dashboard"
			href="index.php"
		/>
	</MainDashboardButton>
);

registerPlugin( 'main-dashboard-button-icon-test', {
	render: MainDashboardButtonIconTest,
} );
```
