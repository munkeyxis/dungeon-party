(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('rollDisplay', rollDisplay);

    var template = `
        <character-name>
            {{tableTop.partyCharacters[rollDisplay.data.rollOptions.characterGuid].name}}
        </character-name>
        <roll-type>Rolled: 
            <die-type 
                ng-repeat="die in rollDisplay.data.rollOptions.diceTypes"
                ng-if="die.isSelected">
                {{rollDisplay.data.rollOptions.quantity}}D{{die.value}} 
                (<roll-result ng-repeat="result in die.rollResults track by $index">{{result}}, </roll-result>), 
            </die-type>
        </roll-type>
        <rolled-amount
            ng-class="{crit: rollDisplay.data.rollValue === 20, 'crit-miss': rollDisplay.data.rollValue === 1}">
            Rolled: {{rollDisplay.data.rollValue}}
            <span ng-if="rollDisplay.data.rollValue === 20">
                CRITICAL!
            </span>
            <span ng-if="rollDisplay.data.rollValue === 1">
                CRITICAL MISS!
            </span>
        </rolled-amount>
        <ability-mod>Ability Mod: + {{rollDisplay.data.abilityMod}}</ability-mod>
        <proficiency-bonus ng-if="rollDisplay.data.isProficient || rollDisplay.data.saveProficient">
            Proficiency Bonus: + {{rollDisplay.data.proficiencyBonus}}
        </proficiency-bonus>
        <not-proficient ng-if="!rollDisplay.data.isProficient">
            Not Proficient
        </not-proficient>
        <roll-total>
            <h3>Total</h3>
            <h1>{{rollDisplay.data.total}}</h1>
        </roll-total>
    `;

    /* @ngInject */
    function rollDisplay() {
        var directive = {
            bindToController: true,
            controller: RollDisplayController,
            controllerAs: 'rollDisplay',
            restrict: 'E',
            scope: false,
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function RollDisplayController($log, socket) {
        const vm = this;

        socket.on('rollResult', data => {
            $log.info('rollResult received', data);
            vm.data = data;
        });
    }
})();
