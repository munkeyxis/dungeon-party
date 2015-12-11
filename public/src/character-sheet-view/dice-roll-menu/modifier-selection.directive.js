(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('modifierSelection', modifierSelection);

    const template = `
        <button
            ng-repeat="type in modifierSelection.rollOptions.statTypes"
            ng-click="type.isSelected = !type.isSelected"
            ng-class="{active: type.isSelected}">
            {{type.name}}
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
                name: 'Str',
                isSelected: false
            },{
                name: 'Dex',
                isSelected: false
            },{
                name: 'Con',
                isSelected: false
            },{
                name: 'Int',
                isSelected: false
            },{
                name: 'Wis',
                isSelected: false
            },{
                name: 'Cha',
                isSelected: false
            }
        ];
    }

})();
