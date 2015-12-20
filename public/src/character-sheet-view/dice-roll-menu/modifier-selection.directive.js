(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('modifierSelection', modifierSelection);

    const template = `
        <button
            ng-repeat="stat in modifierSelection.rollOptions.statTypes"
            ng-click="stat.isSelected = !stat.isSelected"
            ng-class="{active: stat.isSelected}">
            <stat-name>{{stat.name | limitTo: 3}}</stat-name>
        </button>
    `;

    /* @ngInject */
    function modifierSelection() {
        const directive = {
            bindToController: true,
            controller: ModifierSelectionController,
            controllerAs: 'modifierSelection',
            restrict: 'E',
            scope: {
                rollOptions: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function ModifierSelectionController() {
        const vm = this;
        vm.rollOptions.statTypes = [
            {
                name: 'strength',
                isSelected: false
            },{
                name: 'dexterity',
                isSelected: false
            },{
                name: 'constitution',
                isSelected: false
            },{
                name: 'intelligence',
                isSelected: false
            },{
                name: 'wisdom',
                isSelected: false
            },{
                name: 'charisma',
                isSelected: false
            }
        ];
    }

})();
