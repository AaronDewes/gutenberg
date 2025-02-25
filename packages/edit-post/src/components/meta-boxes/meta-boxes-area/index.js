/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@aarondewes/wp-element';
import { Spinner } from '@aarondewes/wp-components';
import { withSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

class MetaBoxesArea extends Component {
	/**
	 * @inheritdoc
	 */
	constructor() {
		super( ...arguments );
		this.bindContainerNode = this.bindContainerNode.bind( this );
	}

	/**
	 * @inheritdoc
	 */
	componentDidMount() {
		this.form = document.querySelector(
			'.metabox-location-' + this.props.location
		);
		if ( this.form ) {
			this.container.appendChild( this.form );
		}
	}

	/**
	 * Get the meta box location form from the original location.
	 */
	componentWillUnmount() {
		if ( this.form ) {
			document.querySelector( '#metaboxes' ).appendChild( this.form );
		}
	}

	/**
	 * Binds the metabox area container node.
	 *
	 * @param {Element} node DOM Node.
	 */
	bindContainerNode( node ) {
		this.container = node;
	}

	/**
	 * @inheritdoc
	 */
	render() {
		const { location, isSaving } = this.props;

		const classes = classnames(
			'edit-post-meta-boxes-area',
			`is-${ location }`,
			{
				'is-loading': isSaving,
			}
		);

		return (
			<div className={ classes }>
				{ isSaving && <Spinner /> }
				<div
					className="edit-post-meta-boxes-area__container"
					ref={ this.bindContainerNode }
				/>
				<div className="edit-post-meta-boxes-area__clear" />
			</div>
		);
	}
}

export default withSelect( ( select ) => {
	return {
		isSaving: select( editPostStore ).isSavingMetaBoxes(),
	};
} )( MetaBoxesArea );
