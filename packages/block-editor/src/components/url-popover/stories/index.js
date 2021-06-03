/**
 * WordPress dependencies
 */
import { Button, ToggleControl } from '@aarondewes/wp-components';
import { useState } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { keyboardReturn } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import URLPopover from '../';

export default { title: 'BlockEditor/URLPopover' };

const TestURLPopover = () => {
	const [ isVisible, setVisiblility ] = useState( false );
	const [ url, setUrl ] = useState( '' );

	const close = () => setVisiblility( false );
	const setTarget = () => {};

	return (
		<>
			<Button onClick={ () => setVisiblility( true ) }>Edit URL</Button>
			{ isVisible && (
				<URLPopover
					onClose={ close }
					renderSettings={ () => (
						<ToggleControl
							label={ __( 'Open in new tab' ) }
							onChange={ setTarget }
						/>
					) }
				>
					<form onSubmit={ close }>
						<input type="url" value={ url } onChange={ setUrl } />
						<Button
							icon={ keyboardReturn }
							label={ __( 'Apply' ) }
							type="submit"
						/>
					</form>
				</URLPopover>
			) }
		</>
	);
};

export const _default = () => {
	return <TestURLPopover />;
};
