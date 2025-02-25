/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import Paragraph from '../edit';

/**
 * WordPress dependencies
 */
jest.mock( '@aarondewes/wp-blocks' );
jest.mock( '../../../../data/src/components/use-select', () => () => ( {
	attributes: () => {},
	settingsColors: [],
} ) );

const getTestComponentWithContent = ( content ) => {
	return shallow(
		<Paragraph
			attributes={ { content } }
			setAttributes={ jest.fn() }
			onReplace={ jest.fn() }
			insertBlocksAfter={ jest.fn() }
		/>
	);
};

describe( 'Paragraph block', () => {
	it( 'renders without crashing', () => {
		const component = getTestComponentWithContent( '' );
		expect( component.exists() ).toBe( true );
	} );
} );
