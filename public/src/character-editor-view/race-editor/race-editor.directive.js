(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('raceEditor', raceEditor);

    const template = `
        <label>
            Race:
            <select
                ng-options="race for race in raceEditor.races"
                ng-model="raceEditor.characterRace"></select>
        </label>
    `;

    /* @ngInject */
    function raceEditor() {
        const directive = {
            bindToController: true,
            controller: RaceEditorController,
            controllerAs: 'raceEditor',
            restrict: 'E',
            scope: {
                characterRace: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function RaceEditorController() {
        const vm = this;

        vm.races = ['Dragonborn', 'Dwarf','Half-Elf', 'Human'];
    }
})();
