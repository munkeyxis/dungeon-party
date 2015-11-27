(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('skillRowEditor', skillRowEditor);

    var template = `
    	<label>{{skillRowEditor.skillData.name}}
    		<input type="checkbox" 
    			ng-model="skillRowEditor.skillData.proficient">
		</label>
    `;

    /* @ngInject */
    function skillRowEditor() {
        var directive = {
            bindToController: true,
            controller: angular.noop,
            controllerAs: 'skillRowEditor',
            restrict: 'E',
            scope: {
        		skillData: '='
            },
            template: template
        };
        return directive;
    }
})();