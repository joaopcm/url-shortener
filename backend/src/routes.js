import { Router } from 'express';

import UrlController from './controllers/UrlController';

const routes = new Router();

routes.get('/:short', UrlController.show);
routes.post('/', UrlController.store);

export default routes;
