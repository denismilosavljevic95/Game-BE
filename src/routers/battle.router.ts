// src/routers/battle.router.ts

import { Router, Request, Response } from 'express';
import { BattleService } from '../services/battle.service';

const battleRouter = Router();
const battleService = new BattleService();

battleRouter.get('/battles', (req: Request, res: Response) => {
    return res.json(battleService.getBattles());
});

battleRouter.post('battle', (req: Request, res: Response) => {
    return res.json(battleService.createBattle(req));
})

battleRouter.post('battle/army', (req: Request, res: Response) => {
    return res.json(battleService.createArmy(req));
})

battleRouter.get('battle/log', (req: Request, res: Response) => {
    return res.json(battleService.getLog(req));
})

battleRouter.patch('battle/reset', (req: Request, res: Response) => {
    return res.json(battleService.resetBattle(req));
})

battleRouter.post('battle/start', (req: Request, res: Response) => {
    return res.json(battleService.startBattle(req));
})

export default battleRouter;