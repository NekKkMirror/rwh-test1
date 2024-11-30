const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;

const path = require("node:path");
const FileManager = require('./file-manager');

class Analyzer {
	constructor(filePath, options = {}) {
		this.filePath = filePath;
		this.options = options;
		this.fileManager = new FileManager(this.options.outputDir);
		this.code = this.loadFile();
		this.ast = this.parseCode(this.code);
		this.report = {
			imports: [],
			functions: [],
			calls: []
		};
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
	
	analyze() {
		babelTraverse(this.ast, {
			ImportDeclaration: ({ node }) => {
				const source = node.source.value;
				console.log('Импорт:', source);
				this.report.imports.push(source);
			},
			CallExpression: ({ node }) => {
				if (node.callee.type === 'Identifier' && node.callee.name === 'main') {
					console.log('Вызов функции main');
					this.report.calls.push('main');
				}
			},
			FunctionDeclaration: ({ node }) => {
				const functionName = node.id.name;
				console.log('Объявленная функция:', functionName);
				this.report.functions.push(functionName);
			}
		});
		
		this.fileManager.writeReport(this.report);
	}
	
	printAST() {
		this.fileManager.writeReport(this.ast, 'ast.json');
	}
}

function analyzeMainFile() {
	const ROOT_DIR = process.cwd();
	const mainFilePath = path.join(ROOT_DIR, 'main.js');
	const analyzer = new Analyzer(mainFilePath, { plugins: ['classProperties'], outputDir: './reports' });
	
	analyzer.analyze();
	analyzer.printAST()
}

module.exports = { analyzeMainFile };