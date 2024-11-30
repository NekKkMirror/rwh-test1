const fs = require('node:fs');
const path = require('node:path');

module.exports.FileManager = class FileManager {
	constructor(outputDir = '.') {
		this.outputDir = outputDir;
		this.ensureDirectoryExists(this.outputDir);
	}
	
	readFileSync(filePath) {
		try {
			return fs.readFileSync(filePath, 'utf8');
		} catch (error) {
			console.error(`Error reading file at ${filePath}:`, error);
			throw error;
		}
	}
	
	ensureDirectoryExists(dir) {
		try {
			fs.mkdirSync(dir, { recursive: true });
		} catch (err) {
			console.error(`Failed to create directory ${dir}:`, err);
			throw err;
		}
	}

	writeToFile(content, filename) {
		const filePath = path.join(this.outputDir, filename);
		
		try {
			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`File written at: ${filePath}`);
		} catch (err) {
			console.error(`Failed to write to file ${filePath}:`, err);
		}
	}
}