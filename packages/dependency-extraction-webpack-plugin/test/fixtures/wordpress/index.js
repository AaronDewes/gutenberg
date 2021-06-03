/**
 * WordPress dependencies
 */
import { isBlobURL } from '@aarondewes/wp-blob';

/**
 * External dependencies
 */
import _ from 'lodash';

_.isEmpty( isBlobURL( '' ) );
