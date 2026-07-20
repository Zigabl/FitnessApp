const userCharacters = require("../models/userCharacter");

function applyStrengthBuff(durationHours, characterStrength) {

    if (durationHours < 0.5) {
        return characterStrength + 1;
    }
    else if (durationHours >= 0.5 && durationHours < 1) {
        return characterStrength + 2;
    }
    else if (durationHours >= 1 && durationHours < 2) {
        return characterStrength + 3;
    }

    return characterStrength + 5;

}

async function buffCharacterStrength(userId, durationHours) {

    const character = await userCharacters.findOne({ userId });

    if (!character) {
        throw new Error("Character not found to buff strength");
    }

    character.strength = await applyStrengthBuff(durationHours, character.strength);

    console.log(`Buffed character strength for user ${userId}. New strength: ${character.strength}`);

    await character.save();
 
}


module.exports = {
  buffCharacterStrength
};