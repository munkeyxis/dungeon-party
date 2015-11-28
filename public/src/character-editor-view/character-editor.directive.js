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

        <race-editor
            character-race="characterEditor.character.race"></race-editor>

        <class-editor
            character-class="characterEditor.character.class"></class-editor>

        <armor-class-editor
            armor-class="characterEditor.character.armorClass"></armor-class-editor>

        <max-hit-points-editor
            max-hit-points="characterEditor.character.maxHitPoints"></max-hit-points-editor>

        <primary-stat-editor
            stat-obj="stat"
            ng-repeat="stat in characterEditor.character.stats"></primary-stat-editor>

        <skill-row-editor
            ng-repeat="skill in characterEditor.character.skills"
            skill-data="skill"></skill-row-editor>

        <save-character-button
            character-model="characterEditor.character"></save-character-button>
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
