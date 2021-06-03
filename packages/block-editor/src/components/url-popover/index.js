/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { useState } from '@aarondewes/wp-element';
import { Button, Popover } from '@aarondewes/wp-components';
import { chevronDown } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import LinkViewer from './link-viewer';
import LinkEditor from './link-editor';

function URLPopover( {
	additionalControls,
	children,
	renderSettings,
	position = 'bottom center',
	focusOnMount = 'firstElement',
	...popoverProps
} ) {
	const [ isSettingsExpanded, setIsSettingsExpanded ] = useState( false );

	const showSettings = !! renderSettings && isSettingsExpanded;

	const toggleSettingsVisibility = () => {
		setIsSettingsExpanded( ! isSettingsExpanded );
	};

	return (
		<Popover
			className="block-editor-url-popover"
			focusOnMount={ focusOnMount }
			position={ position }
			{ ...popoverProps }
		>
			<div className="block-editor-url-popover__input-container">
				<div className="block-editor-url-popover__row">
					{ children }
					{ !! renderSettings && (
						<Button
							className="block-editor-url-popover__settings-toggle"
							icon={ chevronDown }
							label={ __( 'Link settings' ) }
							onClick={ toggleSettingsVisibility }
							aria-expanded={ isSettingsExpanded }
						/>
					) }
				</div>
				{ showSettings && (
					<div className="block-editor-url-popover__row block-editor-url-popover__settings">
						{ renderSettings() }
					</div>
				) }
			</div>
			{ additionalControls && ! showSettings && (
				<div className="block-editor-url-popover__additional-controls">
					{ additionalControls }
				</div>
			) }
		</Popover>
	);
}

URLPopover.LinkEditor = LinkEditor;

URLPopover.LinkViewer = LinkViewer;

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/url-popover/README.md
 */
export default URLPopover;
