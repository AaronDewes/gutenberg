/**
 * WordPress dependencies
 */
import { SVG, Path } from '@aarondewes/wp-primitives';

/**
 * @typedef Props
 * @property {import('react').ReactNode} children Children to render in the tip.
 */

/**
 * @param {Props} props
 * @return {JSX.Element} Element
 */
function Tip( props ) {
	return (
		<div className="components-tip">
			<SVG width="24" height="24" viewBox="0 0 24 24">
				<Path d="M12 15.8c-3.7 0-6.8-3-6.8-6.8s3-6.8 6.8-6.8c3.7 0 6.8 3 6.8 6.8s-3.1 6.8-6.8 6.8zm0-12C9.1 3.8 6.8 6.1 6.8 9s2.4 5.2 5.2 5.2c2.9 0 5.2-2.4 5.2-5.2S14.9 3.8 12 3.8zM8 17.5h8V19H8zM10 20.5h4V22h-4z" />
			</SVG>
			<p>{ props.children }</p>
		</div>
	);
}

export default Tip;
