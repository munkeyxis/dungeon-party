(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('primaryStatsEditor', primaryStatsEditor);

    var template = `
        <primary-stat-editor 
            stat-obj="stat" 
            ng-repeat="stat in primaryStatsEditor.stats">
        </primary-stat-editor>
    `;

    /* @ngInject */
    function primaryStatsEditor() {
        var directive = {
            bindToController: true,
            controller: PrimaryStatsEditorController,
            controllerAs: 'primaryStatsEditor',
            restrict: 'E',
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function PrimaryStatsEditorController(characterModel) {
    	const vm = this;

        vm.stats = characterModel.getStats();
    }
})();