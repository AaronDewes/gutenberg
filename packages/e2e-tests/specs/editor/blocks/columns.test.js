/**
 * WordPress dependencies
 */
import {
	createNewPost,
	getAllBlockInserterItemTitles,
	insertBlock,
	openGlobalBlockInserter,
	closeGlobalBlockInserter,
} from '@aarondewes/wp-e2e-test-utils';

describe( 'Columns', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'restricts all blocks inside the columns block', async () => {
		await insertBlock( 'Columns' );
		await closeGlobalBlockInserter();
		await page.click( '[aria-label="Two columns; equal split"]' );
		await page.click( '.edit-post-header-toolbar__list-view-toggle' );
		const columnBlockMenuItem = (
			await page.$x(
				'//button[contains(concat(" ", @class, " "), " block-editor-block-navigation-block-select-button ")][text()="Column"]'
			)
		 )[ 0 ];
		await columnBlockMenuItem.click();
		await openGlobalBlockInserter();
		expect( await getAllBlockInserterItemTitles() ).toHaveLength( 1 );
	} );
} );
