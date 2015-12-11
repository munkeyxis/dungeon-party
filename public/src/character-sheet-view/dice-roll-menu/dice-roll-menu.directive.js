(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('diceRollMenu', diceRollMenu);

    const template = `
        <label>
            Number of Dice
            <input
                type="number"
                ng-model="diceRollMenu.rollOptions.quantity">
        </label>

        <dice-type-selection
            roll-options="diceRollMenu.rollOptions">
        </dice-type-selection>

        <modifier-selection
            roll-options="diceRollMenu.rollOptions">
        </modifier-selection>

        <label>
            Add Proficiency
            <input
                type="checkbox"
                ng-model="diceRollMenu.rollOptions.addProficiency">
        </label>

        <label>
            Total of any other modifiers
            <input
                type="number"
                ng-model="diceRollMenu.rollOptions.otherModValue">
        </label>

        <button
            ng-click="diceRollMenu.submitRoll()">
            Roll
        </button>
    `;

    /* @ngInject */
    function diceRollMenu() {
        const directive = {
            bindToController: true,
            controller: DiceRollMenuController,
            controllerAs: 'diceRollMenu',
            restrict: 'E',
            scope: {},
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function DiceRollMenuController(webServices) {
        const vm = this;

        vm.rollOptions = {
            quantity: 0,
            addProficiency: false,
            otherModValue: 0
        };

        vm.submitRoll = submitRoll;

        function submitRoll() {
            webServices.submitRoll(vm.rollOptions);
        }

    }

})();
