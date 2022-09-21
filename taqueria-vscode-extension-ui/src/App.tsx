import { MichelineEditor } from './data-editors/MichelineEditor';

export const App = () => {
	return <MichelineEditor jsonParameters={{ 'prim': 'pair', 'args': [{ 'string': 'hello' }, { 'int': '42' }] }} />;
};
