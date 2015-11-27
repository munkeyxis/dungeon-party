(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterSkill', characterSkill);

    var template = `
    	{{characterSkill.skillData.name}}: {{characterSkill.skillData.proficient}}
    `;

    /* @ngInject */
    function characterSkill() {
        var directive = {
            bindToController: true,
            controller: angular.noop,
            controllerAs: 'characterSkill',
            restrict: 'E',
            scope: {
            	skillData: '='
            },
            template: template
        };
        return directive;
    }
})();