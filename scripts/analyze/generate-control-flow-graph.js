const { renderGraphFromSource } = require('graphviz-cli');

const { FileManager } = require('./file-manager');

module.exports.generateControlFlowGraph = async (report, outputFilename = 'control-flow.svg') => {
	const graphDefinition = `
        digraph G {
            node [shape=box];

            "main.js";

            ${report.imports.map(imp => `"main.js" -> "${imp}" [label="imports"]`).join('\n')}
            ${report.functions.map(fn => `"main.js" -> "${fn}" [label="declares"]`).join('\n')}
        }
    `;
	
	try {
		const output = await renderGraphFromSource({ input: graphDefinition }, { format: 'svg' });
		
		const fileManager = new FileManager('./reports');
		fileManager.writeToFile(output, outputFilename);
		
		console.log(`Graph was generated as: ${outputFilename}`);
	} catch (error) {
		console.error("Can't generate graph:", error);
	}
}
