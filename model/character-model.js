var stats = {
    strength: 'strength',
    dexterity: 'dexterity',
    constitution: 'constitution',
    intelligence: 'intelligence',
    wisdom: 'wisdom',
    charisma: 'charisma'
};

exports.defaultCharacter = {
    name: 'Name Character',
    race: 'Human',
    class: 'Fighter',
    armorClass: 10,
    maxHitPoints: 10,
    currentHitPoints: 10,
    stats: {
        strength: { name: "Strength", value: 10, modifier: 0 },
        dexterity: { name: "Dexterity", value: 10, modifier: 0 },
        constitution: { name: "Constitution", value: 10, modifier: 0 },
        intelligence: { name: "Intelligence", value: 10, modifier: 0 },
        wisdom: { name: "Wisdom", value: 10, modifier: 0 },
        charisma: { name: "Charisma", value: 10, modifier: 0 }
    },
    proficiencyBonus: 2,
    skills: {
        acrobatics: {
            name: 'Acrobatics',
            stat: stats.dexterity,
            proficient: false
        },
        animalHandling: {
            name: 'Animal Handling',
            stat: stats.wisdom,
            proficient: false
        },
        arcana: {
            name: 'Arcana',
            stat: stats.intelligence,
            proficient: false
        },
        athletics: {
            name: 'Athletics',
            stat: stats.strength,
            proficient: false
        },
        deception: {
            name: 'Deception',
            stat: stats.charisma,
            proficient: false
        },
        history: {
            name: 'History',
            stat: stats.intelligence,
            proficient: false
        },
        insight: {
            name: 'Insight',
            stat: stats.wisdom,
            proficient: false
        },
        intimidation: {
            name: 'Intimidation',
            stat: stats.charisma,
            proficient: false
        },
        investigation: {
            name: 'Investigation',
            stat: stats.intelligence,
            proficient: false
        },
        medicine: {
            name: 'Medicine',
            stat: stats.wisdom,
            proficient: false
        },
        nature: {
            name: 'Nature',
            stat: stats.intelligence,
            proficient: false
        },
        perception: {
            name: 'Perception',
            stat: stats.wisdom,
            proficient: false
        },
        performance: {
            name: 'Performance',
            stat: stats.charisma,
            proficient: false
        },
        persuasion: {
            name: 'Persuasion',
            stat: stats.charisma,
            proficient: false
        },
        religion: {
            name: 'Religion',
            stat: stats.intelligence,
            proficient: false
        },
        sleightOfHand: {
            name: 'Sleight Of Hand',
            stat: stats.dexterity,
            proficient: false
        },
        stealth: {
            name: 'Stealth',
            stat: stats.dexterity,
            proficient: false
        },
        survival: {
            name: 'Survival',
            stat: stats.wisdom,
            proficient: false
        }
    }
};
