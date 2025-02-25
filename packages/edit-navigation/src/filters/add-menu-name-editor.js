/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
import { addFilter } from '@aarondewes/wp-hooks';
import { createHigherOrderComponent } from '@aarondewes/wp-compose';
import NameDisplay from '../components/name-display';

const addMenuNameEditor = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		if ( props.name !== 'core/navigation' ) {
			return <BlockEdit { ...props } />;
		}
		return (
			<>
				<NameDisplay />
				<BlockEdit { ...props } />
			</>
		);
	},
	'withMenuName'
);

export default () =>
	addFilter(
		'editor.BlockEdit',
		'core/edit-navigation/with-menu-name',
		addMenuNameEditor
	);
