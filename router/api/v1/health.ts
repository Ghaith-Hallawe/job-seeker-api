import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router(); 


router.get('/', (req: Request, res: Response)=> res.status(200).json({}));

export default router;
