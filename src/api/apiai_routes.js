const API_AI = require('apiai');
const { API_AI_KEY } = process.env;
const apiai_client = API_AI(API_AI_KEY);

const randomize = (arr) => arr[Math.floor(Math.random() * arr.length)];

const sendResponse = (response, message) => {
	response.json(message);
}

const createTextMsg = (text) =>  ({ messages: [{ text }] });


const sendQueryToApiAi = (req, res) => {
  apiai_client.textRequest(req.body.queryString, {
		sessionId: req.params.sessionId,
		contexts: [{
			name: req.body.context || 'DEFAULT',
			parameters: req.body,
		}]
	}).on('response', ({ result }) => {
		let message;
    if (result.source === 'agent') {
        let randomMsg = randomize(result.fulfillment.messages);
        message = randomMsg.payload ? randomMsg.payload : createTextMsg(randomMsg.speech);
    } else if (result.source === 'domains') {
        message = createTextMsg(result.fulfillment.speech);
    }
		sendResponse(res, message);
	}).on('error', (error) => {
		console.log("handleError");
    console.error(error);
		sendResponse(res, error.message);
	}).end();
}

export { sendQueryToApiAi };
