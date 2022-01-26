// src/routers/battle.router.ts

import { Router, Request, Response } from 'express';
import { BattleService } from '../services/battle.service';

const battleRouter = Router();
const battleService = new BattleService();

battleRouter.get('/battles', (req: Request, res: Response) => {
    const battles = battleService.getBattles();
    return battles.then(b => res.json(b)).catch(error => {
        console.log('errrrrr: ' + error)
        return error;
    });
});

battleRouter.post('/battle', (req: Request, res: Response) => {
    const { name } = req.body;
    const battle = battleService.createBattle({name, statusID: 1});
    return battle.then(b => res.json(b));
})

battleRouter.post('/battle/army', (req: Request, res: Response) => {
    const army = battleService.createArmy({...req.body, battleUnits: req.body.units});
    return army.then(a => res.json(a)).catch(error => {
        console.log('errrrrr: ' + error)
        return error;
    });
})

battleRouter.get('/battle/log', (req: Request, res: Response) => {
    const id = +req.query.id;
    const logs = battleService.getLog(id);
    return logs.then(l => res.json(l)).catch(error => {
        console.log('errrrrr: ' + error)
        return error;
    });
})

battleRouter.patch('/battle/reset', (req: Request, res: Response) => {
    const id = +req.body.id;
    return res.json(battleService.resetBattle(id));
})

battleRouter.post('/battle/start', (req: Request, res: Response) => {
    const id = +req.body.id;
    return res.json(battleService.startBattle(id));
})

battleRouter.get('/battle/info', (req: Request, res: Response) => {
    const id = +req.query.id;
    const battleInfo = battleService.battleInfo(id);
    return battleInfo.then(info => res.json(info)).catch(error => {
        console.log('errrrrr: ' + error)
        return error;
    });
})

export default battleRouter;