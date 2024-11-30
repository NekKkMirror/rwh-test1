const fs = require('node:fs');
const path = require('node:path');

class FileManager {
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
	
	writeReport(report, filename = 'report.json') {
		const reportPath = path.join(this.outputDir, filename);
		try {
			fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
			console.log(`Report generated at: ${reportPath}`);
		} catch (err) {
			console.error(`Failed to write report to ${reportPath}:`, err);
		}
	}
}

module.exports = FileManager;