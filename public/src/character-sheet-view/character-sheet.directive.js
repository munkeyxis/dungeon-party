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
    	
        {{characterSheet.character.name}}

        Proficiency Bonus: {{characterSheet.character.proficiencyBonus}}
    	
        <primary-stat 
            stat-obj="stat" 
            ng-repeat-start="stat in characterSheet.character.stats">
        </primary-stat>

        <ability-check-roll
            ability-mod="stat.modifier"
            proficiency-bonus="characterSheet.character.proficiencyBonus"
            ng-repeat-end></ability-check-roll>
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