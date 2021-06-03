/**
 * WordPress dependencies
 */
import { useKeyboardShortcut } from '@aarondewes/wp-compose';
import { rawShortcut } from '@aarondewes/wp-keycodes';

export function RichTextShortcut( { character, type, onUse } ) {
	const callback = () => {
		onUse();
		return false;
	};
	useKeyboardShortcut( rawShortcut[ type ]( character ), callback, {
		bindGlobal: true,
	} );

	return null;
}
