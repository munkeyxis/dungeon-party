(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('tableTop', tableTop);

    var template = `
        <character-card 
            ng-repeat="character in tableTop.partyCharacters"
            character-data="character"></character-card>
        <roll-display></roll-display>
    `;

    /* @ngInject */
    function tableTop() {
        var directive = {
            bindToController: true,
            controller: TableTopController,
            controllerAs: 'tableTop',
            restrict: 'E',
            scope: {
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function TableTopController($log, socket) {
        const vm = this;

        vm.partyCharacters = [{name:'Player 1', race: 'poop', class: 'peepee', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}, {name:'Player 2', race: 'poop', class: 'peepee', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}, {name:'Player 3', race: 'poop', class: 'peepee', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}, {name:'Player 4', race: 'poop', class: 'peepee', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}];

        socket.on('addCharacter', data => {
            $log.info('adding character to table', data.name);
            vm.partyCharacters.push(data);
        });
    }
})();