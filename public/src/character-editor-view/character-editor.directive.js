(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterEditor', characterEditor);

    var template = `
    	<name-editor></name-editor>
    	<primary-stats-editor></primary-stats-editor>
    	<save-character-button></save-character-button>
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
    function CharacterEditorController() {

    }
})();