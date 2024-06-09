/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  request,
} from 'express';
import cors from 'cors';
// import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import NotFound from './app/middlewares/notFound';
import { StudentRoutes } from './app/modules/students/student.route';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application Route
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

// Not found
app.use(NotFound);

export default app;
