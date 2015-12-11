(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('diceTypeSelection', diceTypeSelection);

    const template = `
        <button
            ng-repeat="type in diceTypeSelection.rollOptions.diceTypes"
            ng-click="type.isSelected = !type.isSelected"
            ng-class="{active: type.isSelected}">
            D{{type.value}}
        </button>
    `;

    /* @ngInject */
    function diceTypeSelection() {
        const directive = {
            bindToController: true,
            controller: DiceTypeSelectionController,
            controllerAs: 'diceTypeSelection',
            restrict: 'E',
            scope: {
                rollOptions: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function DiceTypeSelectionController() {
        const vm = this;
        vm.rollOptions.diceTypes = [
            {
                value: 4,
                isSelected: false
            },{
                value: 6,
                isSelected: false
            },{
                value: 8,
                isSelected: false
            },{
                value: 10,
                isSelected: false
            },{
                value: 12,
                isSelected: false
            },{
                value: 20,
                isSelected: false
            }
        ];
    }

})();
