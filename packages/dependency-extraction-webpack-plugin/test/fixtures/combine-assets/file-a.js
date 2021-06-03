/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@aarondewes/wp-blob';

isEmpty( isBlobURL( '' ) );
