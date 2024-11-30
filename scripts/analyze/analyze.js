const prompt = require('prompt-sync')();

const { analyzeMainFile } = require("./analyzer");

const generateGraph = prompt('Нужно ли генерировать граф? (y/n): ') === 'y';
const generateAST = prompt('Нужно ли генерировать AST отчет? (y/n): ') === 'y';

analyzeMainFile(generateGraph, generateAST);