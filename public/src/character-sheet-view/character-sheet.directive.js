(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterSheet', characterSheet);

    var template = `

        <character-select
            ng-if="!characterSheet.character"
            character-list="characterSheet.characterList"
            selected-character="characterSheet.character"></character-select>

        <character-summary>
            <character-name>{{characterSheet.character.name}},</character-name>
            <character-race>{{characterSheet.character.race}}</character-race>
            <character-class>{{characterSheet.character.class}}</character-class>
        </character-summary>

        <survivability-stats>
            <hit-points>
                <value>
                    <input type="number"
                        ng-change="characterSheet.changeHealth()"
                        ng-model="characterSheet.character.currentHitPoints">
                    /{{characterSheet.character.maxHitPoints}}
                </value>
                <label>HP</label>
            </hit-points>

            <armor-class>
                <value>{{characterSheet.character.armorClass}}</value>
                <label>AC</label>
            </armor-class>
            <proficiency-bonus>
                <value>{{characterSheet.character.proficiencyBonus}}</value>
                <label>Proficiency Bonus</label>
            </proficiency-bonus>
        </survivability-stats>

        <primary-stats>
            <stat-box-container ng-repeat="stat in characterSheet.character.stats">
                <stat-box>
                    <primary-stat
                        stat-obj="stat"></primary-stat>

                    <button
                        class="display-spell-casting-modifier"
                        ng-click="characterSheet.displayCastingMod(stat)"
                        ng-class="{active: stat.castingModDisplayed}">
                        Display as Spell Casting Mod
                    </button>

                    <button
                        class="proficient-toggle"
                        ng-init="stat.isProficient = false"
                        ng-click="stat.isProficient = !stat.isProficient"
                        ng-class="{active: stat.isProficient}">
                        Proficient: {{stat.isProficient}}
                    </button>

                    <ability-check-roll
                        character-data="characterSheet.character"
                        button-text="stat.name"
                        ability-mod="stat.modifier"
                        proficiency-bonus="characterSheet.character.proficiencyBonus"
                        is-proficient="stat.isProficient"></ability-check-roll>

                    <ability-check-roll
                        character-data="characterSheet.character"
                        button-text="stat.name + ' Saving Throw'"
                        ability-mod="stat.modifier"
                        proficiency-bonus="characterSheet.character.proficiencyBonus"
                        is-proficient="stat.saveProficient"></ability-check-roll>
                </stat-box>
            </stat-box-container>
        </primary-stats>

        <skill-rows>

            <skill-row
                ng-repeat="skill in characterSheet.character.skills"
                ng-class="{active: skill.proficient}">
                <ability-check-roll
                    character-data="characterSheet.character"
                    button-text="skill.name"
                    ability-mod="characterSheet.character.stats[skill.stat].modifier"
                    proficiency-bonus="characterSheet.character.proficiencyBonus"
                    is-proficient="skill.proficient"></ability-check-roll>
            </skill-row>

        </skill-rows>

        <join-table-button
            character-data="characterSheet.character"></join-table-button>
    `;

    /* @ngInject */
    function characterSheet() {
        var directive = {
            bindToController: true,
            controller: CharacterSheetController,
            controllerAs: 'characterSheet',
            restrict: 'E',
            scope: {
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function CharacterSheetController($log, webServices, socket) {
        var vm = this;

        vm.changeHealth = () => {
            socket.emit('healthChange', {
                guid: vm.character.guid,
                hitPoints: vm.character.currentHitPoints
            });
        };

        vm.displayCastingMod = (stat) => {
            stat.castingModDisplayed = !stat.castingModDisplayed;
            $log.info('emitting displayCastingMod');
            socket.emit('displayCastingMod', vm.character);
        };

        activate();

        ////////////////

        function activate() {
            webServices.getCharacters().then((result) => {
                vm.characterList = result;
            });
        }
    }
})();
