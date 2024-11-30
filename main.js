function main() {
  return _main.apply(this, arguments);
}

function _main() {
  return (_main = _asyncToGenerator(_regeneratorRuntime().mark(function callFunctionA() {
    var token, error, challengeValue, incidentValue, result, candidateData, stack, queryParams, isMobileMode, response;
    
    return _regeneratorRuntime().wrap(function wrapFunctionA(context) {
      for (;;) {
        switch (context.prev = context.next) {
          case 0:
            postMessageWithContentHeight();
            delayShowChallengeData();
            
            context.prev = 2;
            challengeValue = document.getElementById('challenge')?.value;
            incidentValue = document.getElementById('incident')?.value;
            setRunStatus("⧗");
            context.next = 8;
            return runChallenge();
          
          case 8:
            result = context.sent;
            setRunStatus("✔");
            token = result.token;
            candidateData = { ...result, error: "" };
            context.next = 21;
            break;
          
          case 14:
            context.prev = 14;
            context.t0 = context.catch(2);
            console.error(context.t0);
            setRunStatus("✖");
            
            error = {
              level: 'critical',
              build_ts: '2024-10-15T09:22:43.174Z',
              lib_version: '0.3.2',
              challenge_id: asString(incidentValue, 128),
              user_agent: asString(window.navigator.userAgent, 384),
              url: asString(window.location.href, 512),
              client_ts: new Date().toISOString()
            };
            
            if (context.t0 instanceof Error) {
              error.message = asString(context.t0.message, 256);
              stack = context.t0.stack;
              error.stack_trace = asString(
                typeof stack === 'string' ? stack.split(window.location.href).join('') : stack,
                1024
              );
            } else {
              error.message = asString(context.t0, 1024);
            }
            
            candidateData = {
              token: challengeValue,
              fp: "",
              error: JSON.stringify(error)
            };
          
          case 21:
            queryParams = new URLSearchParams(document.location.search);
            isMobileMode = queryParams.get(MODE_PARAM) === MOBILE_MODE;
            
            context.next = 25;
            return sendCandidate(candidateData);
          
          case 25:
            response = context.sent;
            isMobileMode ? handleMobile(response) : handleWeb(response, token);
          
          case 27:
          case 'end':
            return context.stop();
        }
      }
    }, callFunctionA, null, [[2, 14]]);
  }))).apply(this, arguments);
}

window.addEventListener('load', main);