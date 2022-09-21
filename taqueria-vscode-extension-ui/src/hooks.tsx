import { useLayoutEffect } from 'react';

/** A simplistic way to add raw css style to the document.
 *
 * Warning: Does not handle conflicts and the order of css will affect things if there are conflicting names.
 */
export const useCss = (css: string) => {
	useLayoutEffect(() => {
		const styleNode = document.createElement('style');
		styleNode.appendChild(document.createTextNode(css));
		document.head.appendChild(styleNode);
		return () => {
			document.head.removeChild(styleNode);
		};
	}, []);
};
