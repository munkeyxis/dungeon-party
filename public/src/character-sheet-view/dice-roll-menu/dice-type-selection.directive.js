(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('diceTypeSelection', diceTypeSelection);

    const template = `
        <die-option 
            ng-repeat="type in diceTypeSelection.rollOptions.diceTypes">
            <button
                ng-click="type.isSelected = !type.isSelected"
                ng-class="{active: type.isSelected}">
                D{{type.value}}
            </button>
            <input type="number"
                ng-model="type.quantity">
        </die-option>
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
                quantity: 0,
                isSelected: false
            },{
                value: 6,
                quantity: 0,
                isSelected: false
            },{
                value: 8,
                quantity: 0,
                isSelected: false
            },{
                value: 10,
                quantity: 0,
                isSelected: false
            },{
                value: 12,
                quantity: 0,
                isSelected: false
            },{
                value: 20,
                quantity: 0,
                isSelected: false
            }
        ];
    }

})();
