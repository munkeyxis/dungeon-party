(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('rollDisplay', rollDisplay);

    var template = `
        <character-name>
            {{rollDisplay.character.name}}
        </character-name>
        <roll-type>Rolled: 
            <die-type 
                ng-repeat="die in rollDisplay.rollOptions.diceTypes"
                ng-if="die.isSelected">
                {{rollDisplay.rollOptions.quantity}}D{{die.value}} 
                (<roll-result ng-repeat="result in die.rollResults track by $index">{{result}}, </roll-result>), 
            </die-type>
        </roll-type>
        <ability-mods>
            Ability Mod: + 
            <ability-mod
                ng-repeat="stat in rollDisplay.rollOptions.statTypes"
                ng-if="stat.isSelected">
                <stat-name>{{stat.name | limitTo: 3}}</stat-name>: {{rollDisplay.character.stats[stat.name].modifier}}
            </ability-mod>
        </ability-mods>
        <proficiency-bonus ng-if="rollDisplay.rollOptions.addProficiency || rollDisplay.saveProficient">
            Proficiency Bonus: + {{rollDisplay.character.proficiencyBonus}}
        </proficiency-bonus>
        <not-proficient ng-if="!rollDisplay.rollOptions.addProficiency">
            Not Proficient
        </not-proficient>
        <roll-total>
            <h3>Total</h3>
            <h1>{{rollDisplay.total}}</h1>
        </roll-total>
    `;

    /* @ngInject */
    function rollDisplay() {
        var directive = {
            bindToController: true,
            controller: RollDisplayController,
            controllerAs: 'rollDisplay',
            restrict: 'E',
            scope: {
                party: '=partyCharacters'
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function RollDisplayController($log, socket) {
        const vm = this;

        vm.character = {};

        socket.on('rollResult', data => {
            $log.info('rollResult received', data);
            vm.rollOptions = data.rollOptions;
            vm.character = vm.party[vm.rollOptions.characterGuid];
            vm.total = data.total;
        });
    }
})();
