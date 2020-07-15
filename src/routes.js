import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CustomerController from './app/controllers/CustomerController';
import ProductController from './app/controllers/ProductController';
import CallController from './app/controllers/CallController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/products', ProductController.index);

routes.get('/customers', CustomerController.index);
routes.post('/customers', CustomerController.store);

routes.post('/calls', CallController.store);

export default routes;
