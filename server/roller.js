exports.performRoll = function(rollOptions, character) {
    var roll = {
        rollOptions: rollOptions,
        total: 0
    };

    roll.total = rollDiceIfNessisary(rollOptions)
    roll.total += addStatModsIfNessisary(rollOptions.statTypes, character.stats);
    roll.total += addProficiencyIfNessisary(rollOptions.addProficiency, character.proficiencyBonus);
    roll.total += addOtherModIfNessisary(rollOptions.otherModValue);

    return roll;
};

function addOtherModIfNessisary(otherMod) {
    if(otherMod === 0) { return otherMod; }

    console.log('adding other modifiers', otherMod);

    return otherMod;
}

function addProficiencyIfNessisary(addProficiency, profBonus) {
    if (!addProficiency) { return 0; }

    console.log('adding proficiency bonus', profBonus);

    return profBonus;
}

function addStatModsIfNessisary(statOptions, characterStats) {
    var total = 0;

    statOptions.forEach(function(stat) {
        if(stat.isSelected) {
            total += characterStats[stat.name].modifier;
        }
    });

    console.log('total added from stats', total);

    return total;
}

function rollDiceIfNessisary(rollOptions) {
    var total = 0;

    rollOptions.diceTypes.forEach(function(die) {
        if(die.isSelected) {
            total += rollAllDice(die, rollOptions.quantity);
        }
    });

    return total;
}

function rollAllDice(dice, quantity) {
    var total = 0;
    dice.rollResults = [];

    for(var i = 0; i < quantity; i++) {
        var rollResult = rollDie(dice.value);
        dice.rollResults.push(rollResult);
        total += rollResult;
    }
    console.log('total of ' + quantity + ' D' + dice.value + ' rolls', total);

    return total;
}

function rollDie(dieValue) {
    var min = 1;
    var max = dieValue;

    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('die roll result', result);

    return result;
}
