(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('rollDisplay', rollDisplay);

    var template = `
        <character-name>{{rollDisplay.data.characterName}}</character-name>
        <rolled-amount>Rolled: {{rollDisplay.data.rollValue}}</rolled-amount>
        <ability-mod>Ability Mod: + {{rollDisplay.data.abilityMod}}</ability-mod>
        <proficiency-bonus ng-if="rollDisplay.data.isProficient">
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