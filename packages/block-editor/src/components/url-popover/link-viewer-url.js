/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { ExternalLink } from '@aarondewes/wp-components';
import { safeDecodeURI, filterURLForDisplay } from '@aarondewes/wp-url';

export default function LinkViewerURL( { url, urlLabel, className } ) {
	const linkClassName = classnames(
		className,
		'block-editor-url-popover__link-viewer-url'
	);

	if ( ! url ) {
		return <span className={ linkClassName }></span>;
	}

	return (
		<ExternalLink className={ linkClassName } href={ url }>
			{ urlLabel || filterURLForDisplay( safeDecodeURI( url ) ) }
		</ExternalLink>
	);
}
