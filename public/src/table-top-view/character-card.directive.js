(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterCard', characterCard);

    var template = `
        <character-summary>
            <character-name>{{characterCard.characterData.name}},</character-name>
            <character-race>{{characterCard.characterData.race}}</character-race>
            <character-class>{{characterCard.characterData.class}}</character-class>
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
    function CharacterCardController() {
        const vm = this;
        
    }
})();