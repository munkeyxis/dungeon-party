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
            {{type.displayName}}
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
                displayName: 'Str',
                name: 'strength',
                isSelected: false
            },{
                displayName: 'Dex',
                name: 'dexterity',
                isSelected: false
            },{
                displayName: 'Con',
                name: 'constitution',
                isSelected: false
            },{
                displayName: 'Int',
                name: 'intelligence',
                isSelected: false
            },{
                displayName: 'Wis',
                name: 'wisdom',
                isSelected: false
            },{
                displayName: 'Cha',
                name: 'charisma',
                isSelected: false
            }
        ];
    }

})();
