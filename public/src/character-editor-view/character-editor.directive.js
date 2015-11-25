(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterEditor', characterEditor);

    var template = `
        <character-select 
            ng-if="!characterEditor.character"
            character-list="characterEditor.characterList"
            selected-character="characterEditor.character"></character-select>
    	<name-editor></name-editor>
    	<primary-stat-editor 
            stat-obj="stat" 
            ng-repeat="stat in characterEditor.character.stats">
        </primary-stat-editor>
    	<save-character-button 
            character-model="characterEditor.character">
        </save-character-button>
    `;

    /* @ngInject */
    function characterEditor() {
        var directive = {
            bindToController: true,
            controller: CharacterEditorController,
            controllerAs: 'characterEditor',
            restrict: 'E',
            scope: {
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function CharacterEditorController(webServices) {
        const vm = this;

        activate();

        ////////////////

        function activate() {
            webServices.getCharacters().then((result) => {
                vm.characterList = result;
            });
        }
    }
})();