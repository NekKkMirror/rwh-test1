const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;

const path = require("node:path");

const { FileManager } = require("./file-manager");
const { generateControlFlowGraph } = require("./generate-control-flow-graph");
const { ROOT_DIR } = require("./constants");

class Analyzer {
	constructor(filePath, options = {}) {
		this.filePath = filePath;
		this.options = options;
		this.fileManager = new FileManager(this.options.outputDir);
		this.code = this.loadFile();
		this.ast = this.parseCode(this.code);
		this.report = null
	}
	
	loadFile() {
		try {
			return this.fileManager.readFileSync(this.filePath, 'utf8');
		} catch (error) {
			console.error(`Error reading file at ${this.filePath}:`, error);
			throw error;
		}
	}
	
	parseCode(code) {
		try {
			return babelParser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
		} catch (error) {
			console.error(`Error parsing code:`, error);
			throw error;
		}
	}
	
	analyze(isReportNeeded = true) {
		this.report = {
			imports: [],
			functions: [],
			calls: []
		};
		
		babelTraverse(this.ast, {
			ImportDeclaration: ({ node }) => {
				const source = node.source.value;
				console.log('Импорт:', source);
				this.report.imports.push(source);
			},
			CallExpression: ({ node }) => {
				if (node.callee.type === 'Identifier' && node.callee.name === 'main') {
					console.log('Call function main');
					this.report.calls.push('main');
				}
			},
			FunctionDeclaration: ({ node }) => {
				const functionName = node.id.name;
				console.log('Declared function:', functionName);
				this.report.functions.push(functionName);
			}
		});
		
		if (isReportNeeded) this.fileManager.writeToFile(JSON.stringify(this.report, null, 2), 'report.json');
	}
	
	printAST() {
		this.fileManager.writeToFile(JSON.stringify(this.ast, null, 2), 'ast.json');
	}
}

module.exports.analyzeMainFile = (generateGraph = false, generateAST = false) => {
	const mainFilePath = path.join(ROOT_DIR, 'main.js');
	const analyzer = new Analyzer(mainFilePath, { plugins: ['classProperties'], outputDir: './reports' });

	if (generateAST) {
		analyzer.analyze();
		analyzer.printAST();
	}
	
	if (generateGraph) {
		if (!analyzer.report) analyzer.analyze(false)
		generateControlFlowGraph(analyzer.report).catch(console.error);
	}
}