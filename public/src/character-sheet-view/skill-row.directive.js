(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('skillRow', skillRow);

    var template = `
    	{{skillRow.skillData.name}}: {{skillRow.skillData.proficient}}
    `;

    /* @ngInject */
    function skillRow() {
        var directive = {
            bindToController: true,
            controller: angular.noop,
            controllerAs: 'skillRow',
            restrict: 'E',
            scope: {
            	skillData: '='
            },
            template: template
        };
        return directive;
    }
})();