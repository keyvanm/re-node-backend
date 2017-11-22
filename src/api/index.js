import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import { sendQueryToApiAi } from './apiai_routes';
import { createSession } from './session_routes';
import { redirectByContext } from './redirect_routes';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/sessions/:sessionId/query', sendQueryToApiAi);
	api.post('/sessions/create', createSession);
	api.post('/redirectByContext', redirectByContext);

	return api;
}
