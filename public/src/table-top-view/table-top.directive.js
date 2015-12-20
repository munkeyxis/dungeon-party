(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('tableTop', tableTop);

    var template = `
        <player-party>
            <character-card
                ng-repeat="character in tableTop.partyCharacters"
                class="{{character.class | lowercase}}"
                character-data="character"></character-card>
        </player-party>
        <roll-display
            party-characters="tableTop.partyCharacters">
        </roll-display>
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

        // vm.partyCharacters = [{name:'Player 1', race: 'poop', class: 'Fighter', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}, {name:'Player 2', race: 'poop', class: 'Ranger', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}, {name:'Player 3', race: 'poop', class: 'Paladin', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}, {name:'Player 4', race: 'poop', class: 'Warlock', currentHitPoints: 10, maxHitPoints: 10, armorClass: 10}];

        vm.partyCharacters = {};

        socket.on('addCharacter', data => {
            $log.info('adding character to table', data.name);
            vm.partyCharacters[data.guid] = data;
            $log.info('partyCharacters', vm.partyCharacters);
        });
    }
})();
