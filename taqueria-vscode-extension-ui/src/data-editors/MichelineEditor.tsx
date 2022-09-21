import { useState } from 'react';
import { useCss } from '../hooks';

export const MichelineEditor = ({ jsonParameters }: { jsonParameters: unknown }) => {
	useCss(`
body.vscode-light {
    color: black;
}

body.vscode-dark {
    color: white;
}

body.vscode-high-contrast {
    color: red;
}

.editorDiv {
    border: 1px solid;
    border-color: var(--vscode-editorWidget-resizeBorder);
    margin: 5px;
    padding: 5px;
    display: table-cell;
    vertical-align: top;
}
.valueTitle {
    vertical-align: top;
}
    `);

	return (
		<div className='editorDiv'>
			<table>
				<tr>
					<td className='valueTitle'>
						Parameter:
					</td>
					<td>
						<MichelineEditorItemView dataType={jsonParameters} />
					</td>
				</tr>
			</table>
		</div>
	);
};

const MichelineEditorItemView = ({ dataType }: { dataType: unknown }) => {
	if (typeof dataType !== 'object') {
		return <input type='text' />;
	}
	return (
		<div className='editorDiv'>
			<table>
				{Object.entries(dataType as object).map(([key, value]) => (
					<tr key={key}>
						<td className='valueTitle'>
							{key.substring(0, key.indexOf(':'))}:
						</td>
						<td>
							<MichelineEditorItemView dataType={value} />
						</td>
					</tr>
				))}
			</table>
		</div>
	);
};

// import { keys, values } from 'rambda';

// export class MichelineEditor {
// 	static getEditorHtml(jsonParameters: any): string {
// 		return `<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <style>
//             body.vscode-light {
//                 color: black;
//               }

//               body.vscode-dark {
//                 color: white;
//               }

//               body.vscode-high-contrast {
//                 color: red;
//               }

//             .editorDiv {
//                 border: 1px solid;
//                 border-color: var(--vscode-editorWidget-resizeBorder);
//                 margin: 5px;
//                 padding: 5px;
//                 display: table-cell;
//                 vertical-align: top;
//             }
//             .valueTitle {
//                 vertical-align: top;
//             }
//             </style>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Cat Coding</title>
//         </head>

//         <body>
//             <div class="editorDiv">
//                 <table>
//                     <tr>
//                         <td class="valueTitle">
//                             Parameter:
//                         </td>
//                         <td>
//                             ${MichelineEditor.getEditor(jsonParameters)}
//                         </td>
//                     </tr>
//                 </table>
//             </div>
//         </body>
//         </html>`;
// 	}

// 	private static getEditor(dataType: unknown): string {
// 		if (typeof dataType === 'object') {
// 			const editors = `<div class="editorDiv">
//                 <table>
//                     <tr>
//                         ${
// 				Object.entries(dataType as object).map(([key, value]) => `
//                             <td class="valueTitle">
//                                 ${key.substring(0, key.indexOf(':'))}:
//                             </td>
//                             <td>
//                                 ${MichelineEditor.getEditor(value)}`).join(`
//                     </tr>
//                     <tr>`)
// 			}
//                     </tr>
//                 </table>
//             </div>
//             `;
// 			return editors;
// 		} else {
// 			return `<input type=text>`;
// 		}
// 	}
// }
