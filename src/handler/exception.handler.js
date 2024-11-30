import { asString } from "../util/helpers.util.js";

export const handleException = (error, incidentValue) => {
	const errorReport = {
		level: 'critical',
		build_ts: '2024-10-15T09:22:43.174Z',
		lib_version: '0.3.2',
		challenge_id: asString(incidentValue, 128),
		user_agent: asString(window.navigator.userAgent, 384),
		url: asString(window.location.href, 512),
		client_ts: new Date().toISOString()
	};
	
	if (error instanceof Error) {
		errorReport.message = asString(error.message, 256);
		const stack = error.stack;
		errorReport.stack_trace = asString(typeof stack === 'string' ? stack.split(window.location.href).join('') : stack, 1024);
	} else {
		errorReport.message = asString(error, 1024);
	}
	
	return JSON.stringify(errorReport);
}