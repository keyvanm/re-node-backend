let API_AI = require('apiai');
let { API_AI_KEY } = process.env;
let apiai_client = API_AI(API_AI_KEY);

let randomize = (arr) => arr[Math.floor(Math.random() * arr.length)];

let sendResponse = ({ response, message }) => {
    // console.log(message);
	response.json(message);
}

let createTextMsg = (text) => {
    return { messages: [{ text }] };
}

let handleResponse = (response) => ({ result }) => {
	let message;
    if (result.source === 'agent') {
        let randomMsg = randomize(result.fulfillment.messages);
        message = randomMsg.payload ? randomMsg.payload : createTextMsg(randomMsg.speech);
    } else if (result.source === 'domains') {
        message = createTextMsg(result.fulfillment.speech);
    }

    sendResponse({ response, message });
}

let handleError = (response) => (error) => {
    console.log("handleError");
    console.log(error);
	let message = { error };
	sendResponse({ response, message });
}


const sendQueryToApiAi = (req, res) => {
	console.log(req.body);
  let request = apiai_client.textRequest(req.body.queryString, {
		sessionId: req.params.sessionId,
		contexts: [{
			name: req.body.context || 'DEFAULT',
			parameters: req.body,
		}]
	});

	request.on('response', handleResponse(res));
	request.on('error', handleError(res));
	request.end();
}

export { sendQueryToApiAi };
