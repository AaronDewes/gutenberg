/**
 * WordPress dependencies
 */
import { useState } from '@aarondewes/wp-element';
import { ToolbarButton, Modal } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { listView } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import BlockNavigationList from './block-navigation-list';

export default function useBlockNavigator( clientId, __experimentalFeatures ) {
	const [ isNavigationListOpen, setIsNavigationListOpen ] = useState( false );

	const navigatorToolbarButton = (
		<ToolbarButton
			className="components-toolbar__control"
			label={ __( 'Open block navigation' ) }
			onClick={ () => setIsNavigationListOpen( true ) }
			icon={ listView }
		/>
	);

	const navigatorModal = isNavigationListOpen && (
		<Modal
			title={ __( 'Navigation' ) }
			closeLabel={ __( 'Close' ) }
			onRequestClose={ () => {
				setIsNavigationListOpen( false );
			} }
		>
			<BlockNavigationList
				clientId={ clientId }
				__experimentalFeatures={ __experimentalFeatures }
			/>
		</Modal>
	);

	return {
		navigatorToolbarButton,
		navigatorModal,
	};
}
