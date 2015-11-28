(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('armorClassEditor', armorClassEditor);

    var template = `
    	<label>
    		Armor Class:
    		<input type="number" ng-model="armorClassEditor.armorClass">
		</label>
    `;

    /* @ngInject */
    function armorClassEditor() {
        var directive = {
            bindToController: true,
            controller: ArmorClassEditorController,
            controllerAs: 'armorClassEditor',
            restrict: 'E',
            scope: {
            	armorClass: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function ArmorClassEditorController() {

    }
})();