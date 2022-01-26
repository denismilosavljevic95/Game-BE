// src/services/user.service.ts

import { Battle } from '../models/battle';
import { Army } from '../models/army';
import { Log } from '../models/log';
import sequelize, { Op } from 'sequelize';

export class BattleService {
    // Strategy options
    private readonly _STRATEGY_RANDOM = 1;
    private readonly _STRATEGY_WEAKEST = 2;
    private readonly _STRATEGY_STRONGEST = 3;
    // Battle statuses
    private readonly _STATUS_READY = 1;
    private readonly _STATUS_IN_PROGRESS = 2;
    private readonly _STATUS_FINISHED = 3;

    getBattles() {
        return Battle.findAll({include: [{
            model: Army,
         required: false
           }]}).then(battles => battles);
    }

    createBattle(data: {}) {
        return Battle.create(data).then(battle => battle);
    }

    createArmy(data: {}) {
        return Army.create(data).then(army => army);
    }

    getLog(id: number) {
        return Log.findAll({where: {battleID: id}, include: [{model: Army, as: 'Attack'}, {model: Army, as: 'Defense'}]}).then(logs => logs);
    }

    async resetBattle(id: number) {
        await Log.destroy({where: {battleID: id}})
        await Battle.update({ statusID: this._STATUS_READY }, { where: {id: id} })
        const armies = await Army.findAll({where: {battleID: id}});
        armies.forEach(async (item: any) => await Army.update({battleUnits: item.units}, {where: {id: item.id}}))
    }

    async startBattle(id: number) {
        let battle: any = await Battle.findByPk(id);
        let armies: any;
        let armiesCount = 0;
        const armyResult = await Army.findAndCountAll({distinct: true, where: {battleID: id, battleUnits: {[Op.gt]: 0}}})
        armies = armyResult.rows;
        armiesCount = armyResult.count; 
        if ((battle.statusID == this._STATUS_READY && armiesCount >= 3) || battle.statusID == this._STATUS_IN_PROGRESS) {
            if (armiesCount > 1) {
                armies.forEach(async (element: any, index: any) => {
                    let armiesCopy = [...armies];
                    armiesCopy = armiesCopy.filter(item => item !== index && item.battleUnits > 0)

                    const army: any = await Army.findOne({where: {id: element.id}});
                    const target: any = this.targetPick(army.strategyID, armiesCopy);
                    const potentialAttact = this.potentialAttact(element);
                    let damage = this.potentialDamage(army);
                    if (potentialAttact) {
                        const health = target.battleUnits - damage;
                        if (health <= 0) {
                            target.battleUnits = 0;
                        } else {
                            target.battleUnits = health;
                        }
                        await Army.update({ battleUnits: target.battleUnits }, { where: {id: target.id} })
                    } else {
                        damage = 0;
                    }
                    await Log.create({
                        damage,
                        battleID: id,
                        attactID: army.id,
                        defenseID: target.id
                    })
                });
                await Battle.update({ statusID: this._STATUS_IN_PROGRESS }, { where: {id: id} })
            }

            if (armiesCount == 1) {
                await Battle.update({ statusID: this._STATUS_FINISHED }, { where: {id: id} })
            }

            return 'Round finished';
        } else {
            if (battle.statusID == this._STATUS_FINISHED) {
                return 'Game Finished';
            }
            return 'Create more army';
        }
    }

    battleInfo(id: number) {
        return Battle.findOne({where: {id}, include: [{model: Army, required: false}]}).then(battle => battle);
    }

    // utils
    targetPick(strategy: number, armies: Array<{}>) {
        switch (strategy) {
            case this._STRATEGY_RANDOM:
              return this.pickRandom(armies);
            case this._STRATEGY_STRONGEST:
                return this.pickStrongest(armies);
            case this._STRATEGY_WEAKEST:
                return this.pickWeakest(armies);
          }
    }

    pickRandom(armies: Array<{}>) {
        return armies[Math.floor(Math.random() * armies.length)]
    }

    pickWeakest(armies: Array<{}>) {
        let weakest: any = armies[0];
        armies.forEach((item: any) => {
            if (item.battleUnits < weakest.battleUnits) {
                weakest = item;
            }
        })
        return weakest;
    }

    pickStrongest(armies: Array<{}>) {
        let weakest: any = armies[0];
        armies.forEach((item: any) => {
            if (item.battleUnits > weakest.battleUnits) {
                weakest = item;
            }
        })
        return weakest;
    }

    potentialAttact(army: any) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        let percent = army.battleUnits;
        if (percent < 10) {
            percent = 10;
        }
        return percent > randomNumber ? true : false; 
    }

    potentialDamage(army: any) {
        if (army.battleUnits > 1) {
            return Math.floor(0.5 * army.battleUnits);
        } else {
            return 1;
        }
    }
}