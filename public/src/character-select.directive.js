(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterSelect', characterSelect);

    var template = `
    	<button 
    		ng-repeat="character in characterSelect.characterList"
    		ng-click="characterSelect.selectedCharacter = character">
    		{{character.name}}
    	</button>
    `;

    /* @ngInject */
    function characterSelect() {
        var directive = {
            bindToController: true,
            controller: CharacterSelectController,
            controllerAs: 'characterSelect',
            restrict: 'E',
            scope: {
            	characterList: '=',
            	selectedCharacter: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function CharacterSelectController() {

    }
})();