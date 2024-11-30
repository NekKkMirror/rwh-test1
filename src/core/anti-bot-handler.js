import { ChallengeService } from "../service/challenge.service.js";
import { setRunStatus } from "../util/status.util.js";
import { handleException } from "../handler/exception.handler.js";
import { CandidateService } from "../service/candidate.service.js";
import { UnifiedResponseHandler } from "../handler/unified-response.handler.js";

export class AntiBotHandler {
	constructor() {
		this.token = null;
		this.isMobileMode = false;
		this.candidateData = {};
	}
	
	async execute() {
		let incidentValue;
		
		try {
			this.setupEnvironment();
			
			const challengeValue = document.getElementById('challenge')?.value;
			incidentValue = document.getElementById('incident')?.value;
			
			const result = await ChallengeService.initializeChallenge();
			setRunStatus("✔");
			
			this.token = result.token;
			this.candidateData = {...result, error: ""};
			
			await this.sendCandidateData(challengeValue, incidentValue);
		} catch (error) {
			this.handleError(error, incidentValue);
		}
	}
	
	setupEnvironment() {
		ChallengeService.postMessageWithContentHeight();
		ChallengeService.delayShowChallengeData();
		setRunStatus("⧗");
		const queryParams = new URLSearchParams(document.location.search);
		this.isMobileMode = queryParams.get('mode') === 'MOBILE';
	}
	
	async sendCandidateData(challengeValue) {
		this.candidateData.token = challengeValue;
		
		const response = await CandidateService.sendCandidate(this.candidateData);
		UnifiedResponseHandler.processResponse(response, this.isMobileMode, this.token);
	}
	
	handleError(error, incidentValue) {
		console.error(error);
		setRunStatus("✖");
		this.candidateData.error = handleException(error, incidentValue);
		console.error(this.candidateData.error);
	}
}