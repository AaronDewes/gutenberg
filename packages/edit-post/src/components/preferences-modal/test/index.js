/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { useViewportMatch } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import PreferencesModal from '../';

// This allows us to tweak the returned value on each test
jest.mock( '@aarondewes/wp-data/src/components/use-select', () => jest.fn() );
jest.mock( '@aarondewes/wp-compose/src/hooks/use-viewport-match', () => jest.fn() );

describe( 'PreferencesModal', () => {
	describe( 'should match snapshot when the modal is active', () => {
		it( 'large viewports', () => {
			useSelect.mockImplementation( () => ( { isModalActive: true } ) );
			useViewportMatch.mockImplementation( () => true );
			const wrapper = shallow( <PreferencesModal /> );
			expect( wrapper ).toMatchSnapshot();
		} );
		it( 'small viewports', () => {
			useSelect.mockImplementation( () => ( { isModalActive: true } ) );
			useViewportMatch.mockImplementation( () => false );
			const wrapper = shallow( <PreferencesModal /> );
			expect( wrapper ).toMatchSnapshot();
		} );
	} );

	it( 'should not render when the modal is not active', () => {
		useSelect.mockImplementation( () => ( { isModalActive: false } ) );
		const wrapper = shallow( <PreferencesModal /> );
		expect( wrapper.isEmptyRender() ).toBe( true );
	} );
} );
