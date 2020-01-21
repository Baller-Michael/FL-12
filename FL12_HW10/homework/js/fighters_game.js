class Fighter {
    constructor(name, damage, hp, strength, agility) {
        let fighterName = name;
        let fighterDamage = damage;
        let fighterHp = hp;
        let fighterStrength = strength;
        let fighterAgility = agility;
        let fighterWins = 0;
        let fighterLosses = 0;

        this.getName = () => fighterName;
        this.getDamage = () => fighterDamage;
        this.getStrength = () => fighterStrength;
        this.getAgility = () => fighterAgility;
        this.attack = (defender) => {
            const RANDOM = 101;
            let propability = fighterStrength + fighterAgility;
            let random = Math.floor(Math.random() * RANDOM);
            random > propability ?
                (this.dealDamage(defender.getDamage()),
                    console.log(`${defender.getName()} makes ${defender.getDamage()} damage to ${this.getName()}`))
                : console.log(`${defender.getName()} attack missed`);
        };
        this.getHealth = () => hp;
        this.heal = (addhp) => {
            fighterHp + addhp > hp ? fighterHp = hp : hp += addhp
        };
        this.dealDamage = (subhp) => {
            fighterHp - subhp < 0 ? fighterHp = 0 : fighterHp -= subhp
        };
        this.logCombatHistory = () => console.log(`Name: ${fighterName}, Wins: ${fighterWins},
         Losses: ${fighterLosses}`);
        this.addWin = () => ++fighterWins;
        this.addLoss = () => ++fighterLosses;
    }
}

function battle(fighter, defender) {
    let defenderWin = true;
    if (fighter.getHealth() === 0) {
        console.log(`${fighter.getName()} is dead and can't fight`);
        return undefined;
    }
    if (defender.getHealth() === 0) {
        console.log(`${defender.getName()} is dead and can't fight`);
        return undefined;
    }
    while (fighter.getHealth() > 0) {
        fighter.attack(defender);
        if (defender.getHealth() === 0) {
            defenderWin = false;
            break;
        }
        defender.attack(fighter);
    }
    if (defenderWin) {
        defender.addWin();
        fighter.addLoss();
    } else {
        fighter.addWin();
        defender.addLoss();
    }
}