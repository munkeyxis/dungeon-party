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

        <spell-casting
            ng-repeat="stat in characterCard.characterData.stats"
            ng-if="stat.castingModDisplayed">
            Spell Casting: {{stat.name}}: {{stat.spellCastingValue}}
        </spell-casting>
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

        calculateSpellCastingValue();
        $log.info('characterData', vm.characterData);

        socket.on('characterHealthUpdated', data => {
            if(vm.characterData.guid === data.guid) {
                $log.info('updating character HP');
                vm.characterData.currentHitPoints = data.hitPoints;
            }
        });

        socket.on('updateCharacterDisplay', data => {
            if(vm.characterData.guid === data.guid) {
                $log.info('updating character');
                vm.characterData = data;
                calculateSpellCastingValue();
            }
        });

        function calculateSpellCastingValue() {
            angular.forEach(vm.characterData.stats, (stat) => {
                stat.spellCastingValue = 8 + stat.modifier + vm.characterData.proficiencyBonus;
            });
        }

    }
})();
