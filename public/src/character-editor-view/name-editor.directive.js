(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('nameEditor', nameEditor);

    var template = `
        <label>Character Name:</label>
        <input type="text" ng-model="nameEditor.character.name">
    `;

    /* @ngInject */
    function nameEditor() {
        var directive = {
            bindToController: true,
            controller: NameEditorController,
            controllerAs: 'nameEditor',
            restrict: 'E',
            scope: {
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function NameEditorController(characterModel) {
        const vm = this;

        vm.character = characterModel.character;
    }
})();