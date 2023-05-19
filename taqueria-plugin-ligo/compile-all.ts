import { sendErr, sendJsonRes } from '@taqueria/node-sdk';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { CompileAllOpts as Opts, CompileOpts, getInputFilenameAbsPath } from './common';
import { compileContractWithStorageAndParameter, TableRow } from './compile';

const isMainContract = async (parsedArgs: Opts, contractFilename: string): Promise<boolean> => {
	if (/storageList\.\w{0,2}ligo$/.test(contractFilename)) return false;
	const fileContent = await readFile(getInputFilenameAbsPath(parsedArgs, contractFilename), 'utf8');
	const entryOrMainFunctionRegex = /@entry|((const|let|function)\s+main)/g;
	return entryOrMainFunctionRegex.test(fileContent);
};

// Helper function to parse includes from a LIGO file
const parseIncludes = async (parsedArgs: Opts, contractFilename: string): Promise<string[]> => {
	const fileContent = await readFile(getInputFilenameAbsPath(parsedArgs, contractFilename), 'utf8');
	const includeRegex = /#include\s+"([^"]+\.m?ligo)"/g;
	let match;
	const includes: string[] = [];

	while ((match = includeRegex.exec(fileContent)) !== null) {
		includes.push(match[1]);
	}

	return includes;
};

// Helper function to build the dependency graph
const buildDependencyGraph = async (
	parsedArgs: Opts,
	contractFilenames: string[],
): Promise<Map<string, Set<string>>> => {
	const graph = new Map<string, Set<string>>();

	for (const filename of contractFilenames) {
		const includes = await parseIncludes(parsedArgs, filename);
		graph.set(filename, new Set(includes));
	}

	return graph;
};

const visit = (
	node: string,
	graph: Map<string, Set<string>>,
	visited: Set<string>,
	stack: Set<string>,
): [boolean, Set<string>] => {
	if (stack.has(node)) return [true, visited]; // Circular dependency detected

	if (!visited.has(node)) {
		const newVisited = new Set(visited).add(node);
		const newStack = new Set(stack).add(node);

		const [circular, updatedVisited] = Array.from(graph.get(node) || []).reduce<[boolean, Set<string>]>(
			([circularFound, vSet], dependency) => {
				const [result, v] = visit(dependency, graph, vSet, newStack);
				return [circularFound || result, v];
			},
			[false, newVisited],
		);

		if (!circular) return [false, updatedVisited];
	}

	return [false, visited];
};

const detectCircularDependencies = (
	graph: Map<string, Set<string>>,
): { safeFiles: string[]; circularFiles: string[] } => {
	const { safeFiles, circularFiles, visited } = Array.from(graph.keys()).reduce<{
		safeFiles: string[];
		circularFiles: string[];
		visited: Set<string>;
	}>(
		(acc, filename) => {
			const [isCircular, updatedVisited] = visit(
				filename,
				graph,
				acc.visited,
				new Set<string>(),
			);
			if (isCircular) {
				acc.circularFiles.push(filename);
			} else {
				acc.safeFiles.push(filename);
			}
			acc.visited = updatedVisited;
			return acc;
		},
		{ safeFiles: [], circularFiles: [], visited: new Set<string>() },
	);

	return { safeFiles, circularFiles };
};

const compileAll = async (parsedArgs: Opts): Promise<void> => {
	let p: Promise<TableRow[]>[] = [];

	const contractFilenames = await glob(
		['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
		{
			cwd: join(parsedArgs.config.projectDir, parsedArgs.config.contractsDir ?? 'contracts'),
			absolute: false,
		},
	);

	const dependencyGraph = await buildDependencyGraph(parsedArgs, contractFilenames);
	const { safeFiles, circularFiles } = detectCircularDependencies(dependencyGraph);

	for (const filename of safeFiles) {
		if (await isMainContract(parsedArgs, filename)) {
			p.push(compileContractWithStorageAndParameter(parsedArgs as CompileOpts, filename));
		}
	}

	return Promise.all(p)
		.then(tables => tables.flat())
		.then(table => {
			if (circularFiles.length > 0) {
				console.warn(
					'Warning: Circular dependencies detected in the following files. They have been skipped:',
				);
				console.warn(circularFiles.join(', '));
			}
			return table;
		})
		.then(sendJsonRes)
		.catch(err => sendErr(err, false));
};

export default compileAll;
