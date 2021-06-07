/**
 * External dependencies
 */
import browserslist from 'browserslist';

/**
 * Internal dependencies
 */
import config from '../';

it( 'should export an array', () => {
	expect( Array.isArray( config ) ).toBe( true );
} );

it( 'should not contain invalid queries', () => {
	const result = browserslist( [ 'extends @aarondewes/browserslist-config-wp' ] );

	expect( result ).toBeTruthy();
} );
