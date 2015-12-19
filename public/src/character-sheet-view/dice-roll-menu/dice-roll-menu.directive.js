(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('diceRollMenu', diceRollMenu);

    const template = `
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
            scope: {
                characterGuid: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function DiceRollMenuController($log, webServices) {
        const vm = this;

        vm.rollOptions = {
            addProficiency: false,
            otherModValue: 0
        };

        vm.submitRoll = submitRoll;

        function submitRoll() {
            vm.rollOptions.characterGuid = vm.characterGuid;

            webServices.submitRoll(vm.rollOptions);
        }

    }

})();
