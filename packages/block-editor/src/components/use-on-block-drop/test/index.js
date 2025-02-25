/**
 * Internal dependencies
 */
import { parseDropEvent, onFilesDrop, onHTMLDrop, onBlockDrop } from '..';
/**
 * WordPress dependencies
 */
import { findTransform, pasteHandler } from '@aarondewes/wp-blocks';

const noop = () => {};

jest.mock( '@aarondewes/wp-blocks/src/api/factory', () => ( {
	findTransform: jest.fn(),
	getBlockTransforms: jest.fn(),
} ) );

jest.mock( '@aarondewes/wp-blocks/src/api/raw-handling', () => ( {
	pasteHandler: jest.fn(),
} ) );

describe( 'parseDropEvent', () => {
	it( 'converts an event dataTransfer property from JSON to an object', () => {
		const rawDataTransfer = {
			blocks: null,
			srcRootClientId: '123',
			srcClientIds: [ 'abc' ],
			srcIndex: 1,
			type: 'block',
		};
		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( rawDataTransfer );
				},
			},
		};

		expect( parseDropEvent( event ) ).toEqual( rawDataTransfer );
	} );

	it( 'defaults any missing values to null', () => {
		const rawDataTransfer = {
			srcClientIds: [ 'abc' ],
			type: 'block',
		};
		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( rawDataTransfer );
				},
			},
		};

		expect( parseDropEvent( event ) ).toEqual( {
			srcRootClientId: null,
			srcIndex: null,
			blocks: null,
			...rawDataTransfer,
		} );
	} );

	it( 'returns an object with null values if the event dataTransfer can not be parsed', () => {
		const expected = {
			blocks: null,
			srcRootClientId: null,
			srcClientIds: null,
			srcIndex: null,
			type: null,
		};
		const event = {
			dataTransfer: {
				getData() {
					return '{ something_that_cannot_be_parsed_as_json }';
				},
			},
		};

		expect( parseDropEvent( event ) ).toEqual( expected );
	} );

	it( 'returns an object with null values if the event has no dataTransfer property', () => {
		const expected = {
			blocks: null,
			srcRootClientId: null,
			srcClientIds: null,
			srcIndex: null,
			type: null,
		};
		const event = {};

		expect( parseDropEvent( event ) ).toEqual( expected );
	} );
} );

describe( 'onBlockDrop', () => {
	it( 'does nothing if the event is not a block type drop', () => {
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const getBlockIndex = noop;
		const getClientIdsOfDescendants = noop;
		const moveBlocksToPosition = jest.fn();

		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( {
						type: 'not-a-block-type-drop',
					} );
				},
			},
		};

		const eventHandler = onBlockDrop(
			targetRootClientId,
			targetBlockIndex,
			getBlockIndex,
			getClientIdsOfDescendants,
			moveBlocksToPosition
		);
		eventHandler( event );

		expect( moveBlocksToPosition ).not.toHaveBeenCalled();
	} );

	it( 'does nothing if the block is dropped to the same place it was dragged from', () => {
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		// Target and source block index is the same.
		const getBlockIndex = jest.fn( () => targetBlockIndex );
		const getClientIdsOfDescendants = noop;
		const moveBlocksToPosition = jest.fn();

		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( {
						type: 'block',
						// Target and source root client id is the same.
						srcRootClientId: targetRootClientId,
						srcClientIds: [ '2' ],
					} );
				},
			},
		};

		const eventHandler = onBlockDrop(
			targetRootClientId,
			targetBlockIndex,
			getBlockIndex,
			getClientIdsOfDescendants,
			moveBlocksToPosition
		);
		eventHandler( event );

		expect( moveBlocksToPosition ).not.toHaveBeenCalled();
	} );

	it( 'does nothing if the block is dropped as a child of itself', () => {
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const getBlockIndex = jest.fn( () => 6 );
		const getClientIdsOfDescendants = noop;
		const moveBlocksToPosition = jest.fn();

		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( {
						type: 'block',
						srcRootClientId: '0',
						// The dragged block is being dropped as a child of itself.
						srcClientIds: [ targetRootClientId ],
					} );
				},
			},
		};

		const eventHandler = onBlockDrop(
			targetRootClientId,
			targetBlockIndex,
			getBlockIndex,
			getClientIdsOfDescendants,
			moveBlocksToPosition
		);
		eventHandler( event );

		expect( moveBlocksToPosition ).not.toHaveBeenCalled();
	} );

	it( 'does nothing if the block is dropped as a descendant of itself', () => {
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const getBlockIndex = jest.fn( () => 1 );
		// Dragged block is being dropped as a descendant of itself.
		const getClientIdsOfDescendants = jest.fn( () => [
			targetRootClientId,
		] );
		const moveBlocksToPosition = jest.fn();

		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( {
						type: 'block',
						srcRootClientId: '0',
						srcClientIds: [ '5' ],
					} );
				},
			},
		};

		const eventHandler = onBlockDrop(
			targetRootClientId,
			targetBlockIndex,
			getBlockIndex,
			getClientIdsOfDescendants,
			moveBlocksToPosition
		);
		eventHandler( event );

		expect( moveBlocksToPosition ).not.toHaveBeenCalled();
	} );

	it( 'inserts blocks if the drop is valid', () => {
		const sourceClientIds = [ '5' ];
		const sourceRootClientId = '0';
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const getBlockIndex = jest.fn( () => 1 );
		const getClientIdsOfDescendants = () => [];
		const moveBlocksToPosition = jest.fn();

		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( {
						type: 'block',
						srcRootClientId: sourceRootClientId,
						srcClientIds: sourceClientIds,
					} );
				},
			},
		};

		const eventHandler = onBlockDrop(
			targetRootClientId,
			targetBlockIndex,
			getBlockIndex,
			getClientIdsOfDescendants,
			moveBlocksToPosition
		);
		eventHandler( event );

		expect( moveBlocksToPosition ).toHaveBeenCalledWith(
			sourceClientIds,
			sourceRootClientId,
			targetRootClientId,
			targetBlockIndex
		);
	} );

	it( 'adjusts the index blocks are dropped at when moved down under the same root block', () => {
		const sourceClientIds = [ '5', '6', '7' ];
		const sourceRootClientId = '0';
		const targetRootClientId = sourceRootClientId;
		const targetBlockIndex = 5;
		const getBlockIndex = jest.fn( () => 1 );
		// Dragged block is being dropped as a descendant of itself.
		const getClientIdsOfDescendants = () => [];
		const moveBlocksToPosition = jest.fn();

		const event = {
			dataTransfer: {
				getData() {
					return JSON.stringify( {
						type: 'block',
						srcRootClientId: sourceRootClientId,
						// The dragged block is being dropped as a child of itself.
						srcClientIds: sourceClientIds,
					} );
				},
			},
		};

		const insertIndex = targetBlockIndex - sourceClientIds.length;

		const eventHandler = onBlockDrop(
			targetRootClientId,
			targetBlockIndex,
			getBlockIndex,
			getClientIdsOfDescendants,
			moveBlocksToPosition
		);
		eventHandler( event );

		expect( moveBlocksToPosition ).toHaveBeenCalledWith(
			sourceClientIds,
			sourceRootClientId,
			targetRootClientId,
			insertIndex
		);
	} );
} );

describe( 'onFilesDrop', () => {
	it( 'does nothing if hasUploadPermissions is false', () => {
		const updateBlockAttributes = jest.fn();
		const canInsertBlockType = noop;
		const insertBlocks = jest.fn();
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const uploadPermissions = false;

		const onFileDropHandler = onFilesDrop(
			targetRootClientId,
			targetBlockIndex,
			uploadPermissions,
			updateBlockAttributes,
			canInsertBlockType,
			insertBlocks
		);
		onFileDropHandler();

		expect( findTransform ).not.toHaveBeenCalled();
		expect( insertBlocks ).not.toHaveBeenCalled();
	} );

	it( 'does nothing if the block has no matching file transforms', () => {
		// Test the scenario of 'no transforms' by mocking findTransform
		// to have no return value.
		findTransform.mockImplementation( noop );
		const updateBlockAttributes = noop;
		const insertBlocks = jest.fn();
		const canInsertBlockType = noop;
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const uploadPermissions = true;

		const onFileDropHandler = onFilesDrop(
			targetRootClientId,
			targetBlockIndex,
			uploadPermissions,
			updateBlockAttributes,
			canInsertBlockType,
			insertBlocks
		);
		onFileDropHandler();

		expect( findTransform ).toHaveBeenCalled();
		expect( insertBlocks ).not.toHaveBeenCalled();
	} );

	it( 'inserts blocks if a valid transform can be found', () => {
		// Mock findTransform to return a valid transform. The implementation
		// of the transform isn't important just that there is a callable 'transform'
		// function that returns a value.
		const blocks = 'blocks';
		const transformation = { transform: jest.fn( () => blocks ) };
		findTransform.mockImplementation( () => transformation );
		const updateBlockAttributes = noop;
		const canInsertBlockType = noop;
		const insertBlocks = jest.fn();
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const uploadPermissions = true;

		const onFileDropHandler = onFilesDrop(
			targetRootClientId,
			targetBlockIndex,
			uploadPermissions,
			updateBlockAttributes,
			canInsertBlockType,
			insertBlocks
		);
		const files = 'test';
		onFileDropHandler( files );

		expect( findTransform ).toHaveBeenCalled();
		expect( transformation.transform ).toHaveBeenCalledWith(
			files,
			updateBlockAttributes
		);
		expect( insertBlocks ).toHaveBeenCalledWith(
			blocks,
			targetBlockIndex,
			targetRootClientId
		);
	} );
} );

describe( 'onHTMLDrop', () => {
	it( 'does nothing if the HTML cannot be converted into blocks', () => {
		pasteHandler.mockImplementation( () => [] );
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const insertBlocks = jest.fn();

		const eventHandler = onHTMLDrop(
			targetRootClientId,
			targetBlockIndex,
			insertBlocks
		);
		eventHandler();

		expect( insertBlocks ).not.toHaveBeenCalled();
	} );

	it( 'inserts blocks if the HTML can be converted into blocks', () => {
		const blocks = [ 'blocks' ];
		pasteHandler.mockImplementation( () => blocks );
		const targetRootClientId = '1';
		const targetBlockIndex = 0;
		const insertBlocks = jest.fn();

		const eventHandler = onHTMLDrop(
			targetRootClientId,
			targetBlockIndex,
			insertBlocks
		);
		eventHandler();

		expect( insertBlocks ).toHaveBeenCalledWith(
			blocks,
			targetBlockIndex,
			targetRootClientId
		);
	} );
} );
