(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterSheet', characterSheet);

    var template = `
        <character-select 
            ng-if="!characterSheet.character"
            character-list="characterSheet.characterList"
            selected-character="characterSheet.character"></character-select>
    	
        <character-name>
            {{characterSheet.character.name}}
        </character-name>

        <proficiency-bonus>
            Proficiency Bonus: {{characterSheet.character.proficiencyBonus}}
    	</proficiency-bonus>

        <stat-row ng-repeat="stat in characterSheet.character.stats">
        
            <primary-stat 
                stat-obj="stat"></primary-stat>

            <ability-check-roll
                ability-mod="stat.modifier"
                proficiency-bonus="characterSheet.character.proficiencyBonus"></ability-check-roll>

        </stat-row>

        <skill-row ng-repeat="skill in characterSheet.character.skills">

            <character-skill 
                skill-data="skill"></character-skill>

            <ability-check-roll
                ability-mod="characterSheet.character.stats[skill.stat].modifier"
                proficiency-bonus="characterSheet.character.proficiencyBonus"
                is-proficient="skill.proficient"></ability-check-roll>

        </skill-row>

        <join-table-button 
            character-data="characterSheet.character"></join-table-button>
    `;

    /* @ngInject */
    function characterSheet() {
        var directive = {
            bindToController: true,
            controller: CharacterSheetController,
            controllerAs: 'characterSheet',
            restrict: 'E',
            scope: {
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function CharacterSheetController(webServices) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        	webServices.getCharacters().then((result) => {
        		vm.characterList = result;
        	});
        }
    }
})();