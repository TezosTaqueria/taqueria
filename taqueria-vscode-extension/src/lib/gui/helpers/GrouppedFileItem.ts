import path from 'path';
import * as vscode from 'vscode';

export class GrouppedFileItem {
	readonly relativePath: string;
	readonly isChild: boolean;
	readonly expectedParentName: string | undefined;

	constructor(public readonly uri: vscode.Uri, folder: string, patterns: RegExp[]) {
		this.relativePath = path.relative(folder, uri.path);
		const result = GrouppedFileItem.getFirstMatch(this.relativePath, patterns);
		if (result) {
			this.expectedParentName = `${result.groups?.name}${result.groups?.ext}`;
			this.isChild = true;
		} else {
			this.isChild = false;
			this.expectedParentName = undefined;
		}
	}

	children: GrouppedFileItem[] = [];

	toString() {
		return this.uri.toString();
	}

	private static contractChildrenSpecifiers = [/(?<name>.+)\.(?:parameter|storage)List(?<ext>\.(?:m|re|js)?ligo)/];
	private static artifactChildrenSpecifiers = [
		/(?<name>.+)\.default_storage(?<ext>\.tz)/,
		/(?<name>.+)\.(?:storage|parameter|expression)\..*(?<ext>\.tz)/,
	];

	static groupAndSortFiles = (
		folder: string,
		files: vscode.Uri[],
		fileType: 'artifact' | 'contract',
	): GrouppedFileItem[] => {
		const patterns = fileType === 'artifact'
			? GrouppedFileItem.artifactChildrenSpecifiers
			: GrouppedFileItem.contractChildrenSpecifiers;
		const filesAndPatterns = files.map(f => new GrouppedFileItem(f, folder, patterns));
		const rootFiles = filesAndPatterns.filter(f => !f.isChild);
		const children = filesAndPatterns.filter(f => f.isChild);
		children.forEach(child => {
			const rootFile = rootFiles.find(root => root.relativePath === child.expectedParentName);
			if (rootFile) {
				rootFile.children.push(child);
			} else {
				rootFiles.push(child);
			}
		});
		rootFiles.sort();
		rootFiles.forEach(f => f.children.sort());
		return rootFiles;
	};

	private static getFirstMatch(fileName: string, patterns: RegExp[]): RegExpExecArray | undefined {
		for (const pattern of patterns) {
			const result = pattern.exec(fileName);
			if (result) {
				return result;
			}
		}
		return undefined;
	}
}
