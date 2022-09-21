import { MichelineEditor } from './data-editors/MichelineEditor';

export const App = () => {
	return <MichelineEditor michelineJsonObj={{ 'prim': 'pair', 'args': [{ 'string': 'hello' }, { 'int': '42' }] }} />;
};
