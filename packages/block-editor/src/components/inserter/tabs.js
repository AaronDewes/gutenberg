/**
 * WordPress dependencies
 */
import { useMemo } from '@aarondewes/wp-element';
import { TabPanel } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

const blocksTab = {
	name: 'blocks',
	/* translators: Blocks tab title in the block inserter. */
	title: __( 'Blocks' ),
};
const patternsTab = {
	name: 'patterns',
	/* translators: Patterns tab title in the block inserter. */
	title: __( 'Patterns' ),
};
const reusableBlocksTab = {
	name: 'reusable',
	/* translators: Reusable blocks tab title in the block inserter. */
	title: __( 'Reusable' ),
};

function InserterTabs( {
	children,
	showPatterns = false,
	showReusableBlocks = false,
	onSelect,
} ) {
	const tabs = useMemo( () => {
		const tempTabs = [ blocksTab ];

		if ( showPatterns ) {
			tempTabs.push( patternsTab );
		}

		if ( showReusableBlocks ) {
			tempTabs.push( reusableBlocksTab );
		}

		return tempTabs;
	}, [
		blocksTab,
		showPatterns,
		patternsTab,
		showReusableBlocks,
		reusableBlocksTab,
	] );

	return (
		<TabPanel
			className="block-editor-inserter__tabs"
			tabs={ tabs }
			onSelect={ onSelect }
		>
			{ children }
		</TabPanel>
	);
}

export default InserterTabs;
