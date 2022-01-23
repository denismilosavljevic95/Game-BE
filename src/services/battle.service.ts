// src/services/user.service.ts

import { Battle } from '../models/battle';
import { Army } from '../models/army';
import { Log } from '../models/log';
import { Statuses } from '../models/statuses';

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
            .then(result => {
                Battle.update({ statusID: this._STATUS_READY }, { where: {id: id} }).then(update => update)
                // reset army 
            })
            .catch(error => error)

    }

    startBattle(id: number) {
        let battle = Battle.findOne({where: {battleID: id}}).then(result => result);
        let armies: [];
        let armiesCount = 0;
        Army.findAndCountAll({where: {battleID: id, battleUnits: {gt: 0}}}).then(result => {
            armies.push(...result.rows);
            armiesCount = result.count;
        });

        if ((battle.statusID == this._STATUS_READY && armiesCount >= 3) || battle.statusID == this._STATUS_IN_PROGRESS) {
            if (armiesCount > 1) {
                armies.forEach((element, index) => {
                    let armiesCopy = [...armies];
                    armiesCopy = armiesCopy.filter(item => item !== index)

                    const army = Army.findOne({where: {id: element.id}}).then(result => result);
                    const target = this.targetPick(army.strategyID, armiesCopy);
                    const potentialAttact = this.potentialAttact(target);
                    let damage = this.potentialDamage(army);

                    if (potentialAttact) {
                        const health = target.battleUnits - damage;
                        if (health <= 0) {
                            target.battleUnits = 0;
                        } else {
                            target.battleUnits = health;
                        }
                    } else {
                        damage = 0;
                    }
                    Log.create({
                        damage,
                        battleID: id,
                        attactID: army.id,
                        defenseID: target.id
                    })
                });
                Battle.update({ statusID: this._STATUS_IN_PROGRESS }, { where: {id: id} })
            }

            if (armiesCount = 1) {
                Battle.update({ statusID: this._STATUS_FINISHED }, { where: {id: id} })
            }

            return 'Round finished';
        } else {
            if (battle.statusID == this._STATUS_FINISHED) {
                return 'Game Finished';
            }
            return 'Create more army';
        }
    }

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
        let weakest = armies[0];
        armies.forEach(item => {
            if (item.battleUnits < weakest.battleUnits) {
                weakest = item;
            }
        })
        return weakest;
    }

    pickStrongest(armies: Array<{}>) {
        let weakest = armies[0];
        armies.forEach(item => {
            if (item.battleUnits > weakest.battleUnits) {
                weakest = item;
            }
        })
        return weakest;
    }

    potentialAttact(army: {}) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        let percent = army.battleUnits;
        if (percent < 10) {
            percent = 10;
        }
        return randomNumber > percent ? true : false; 
    }

    potentialDamage(army: {}) {
        if (army.battleUnits > 1) {
            return Math.floor(0.5 * army.battleUnits);
        } else {
            return 1;
        }
    }
}