(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterCard', characterCard);

    var template = `
        <character-summary>
            <character-name>{{characterCard.characterData.name}}</character-name>
            <race-class>{{characterCard.characterData.race}} {{characterCard.characterData.class}}</character-race>
        </character-summary>

        <survivability-stats>
            <hit-points>
                <value>
                    {{characterCard.characterData.currentHitPoints}}/{{characterCard.characterData.maxHitPoints}}
                </value>
                <label>HP</label>
            </hit-points>

            <armor-class>
                <value>{{characterCard.characterData.armorClass}}</value>
                <label>AC</label>
            </armor-class>
        </survivability-stats>
    `;

    /* @ngInject */
    function characterCard() {
        var directive = {
            bindToController: true,
            controller: CharacterCardController,
            controllerAs: 'characterCard',
            restrict: 'E',
            scope: {
                characterData: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function CharacterCardController($log, socket) {
        const vm = this;

        $log.info('characterData', vm.characterData);

        socket.on('characterHealthUpdated', data => {
            if(vm.characterData.guid === data.guid) {
                $log.info('updating character HP');
                vm.characterData.currentHitPoints = data.hitPoints;
            } 
        });
        
    }
})();