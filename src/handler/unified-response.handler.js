import { handleMobile } from "./mobile.handler.js";
import { handleWeb } from "./web.handler.js";

export class UnifiedResponseHandler {
	static processResponse(response, isMobileMode, token) {
		if (isMobileMode) {
			handleMobile(response);
		} else {
			handleWeb(response, token);
		}
	}
}