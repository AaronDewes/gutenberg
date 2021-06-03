/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { __experimentalLibrary as Library } from '@aarondewes/wp-block-editor';
import { Button } from '@aarondewes/wp-components';
import { useInstanceId } from '@aarondewes/wp-compose';
import { closeSmall } from '@aarondewes/wp-icons';

function Inserter( { setIsOpened } ) {
	const inserterTitleId = useInstanceId(
		Inserter,
		'customize-widget-layout__inserter-panel-title'
	);

	return (
		<div
			className="customize-widgets-layout__inserter-panel"
			aria-labelledby={ inserterTitleId }
		>
			<div className="customize-widgets-layout__inserter-panel-header">
				<h2
					id={ inserterTitleId }
					className="customize-widgets-layout__inserter-panel-header-title"
				>
					{ __( 'Add a block' ) }
				</h2>
				<Button
					className="customize-widgets-layout__inserter-panel-header-close-button"
					icon={ closeSmall }
					onClick={ () => setIsOpened( false ) }
					aria-label={ __( 'Close inserter' ) }
				/>
			</div>
			<div className="customize-widgets-layout__inserter-panel-content">
				<Library
					showInserterHelpPanel
					onSelect={ () => setIsOpened( false ) }
				/>
			</div>
		</div>
	);
}

export default Inserter;
