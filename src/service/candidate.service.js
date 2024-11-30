export class CandidateService {
	static async sendCandidate(candidateData) {
		console.log("Sending candidate data", candidateData);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ success: true, message: 'Candidate data processed' });
			}, 1000);
		});
	}
}