/**
 * WordPress dependencies
 */
import {
	ComplementaryArea,
	ComplementaryAreaMoreMenuItem,
} from '@aarondewes/wp-interface';

export default function DefaultSidebar( {
	className,
	identifier,
	title,
	icon,
	children,
	closeLabel,
	header,
	headerClassName,
} ) {
	return (
		<>
			<ComplementaryArea
				className={ className }
				scope="core/edit-site"
				identifier={ identifier }
				title={ title }
				icon={ icon }
				closeLabel={ closeLabel }
				header={ header }
				headerClassName={ headerClassName }
			>
				{ children }
			</ComplementaryArea>
			<ComplementaryAreaMoreMenuItem
				scope="core/edit-site"
				identifier={ identifier }
				icon={ icon }
			>
				{ title }
			</ComplementaryAreaMoreMenuItem>
		</>
	);
}
