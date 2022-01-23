// src/services/user.service.ts

import { Battle } from '../models/battle';
import { Army } from '../models/army';
import { Log } from '../models/log';
import { Statuses } from '../models/statuses';

export class BattleService {

    getBattles() {
        return Battle.findAll().then(battles => battles);
    }

    createBattle(data: {}) {
        return Battle.create(data).then(battle => battle);
    }

    createArmy(data: {}) {
        return Army.create(data).then(army => army);
    }

    getLog(id: number) {
        return Log.findAll({where: {battleID: id}}).then(logs => logs);
    }

    resetBattle(id: number) {
        return Log.destroy({where: {battleID: id}})
            .then(result => Battle.update({ statusID: 1 }, { where: {id: id} }).then(update => update))
            .catch(error => error)

    }

    startBattle({}) {
        return 1;
    }
}