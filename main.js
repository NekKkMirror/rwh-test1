import { AntiBotHandler } from "./src/core/anti-bot-handler.js";

function main() {
	const antiBotHandler = new AntiBotHandler();
	
	antiBotHandler
		.execute()
		.catch(error => console.error('Error executing AntiBotHandler:', error));
}

window.addEventListener('load', main);