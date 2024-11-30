export class ChallengeService {
	static postMessageWithContentHeight() {
		console.log("Posting message with content height");
	}
	
	static delayShowChallengeData() {
		console.log("Delaying show of challenge data");
	}
	
	static async initializeChallenge() {
		console.log("Initializing challenge");
		return {
			token: "dummy-token"
		};
	}
}