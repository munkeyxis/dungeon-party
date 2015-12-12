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

        <dice-roll-menu
            character-guid="characterSheet.character.guid">
        </dice-roll-menu>

        <primary-stats>
            <stat-box-container ng-repeat="(key, value) in characterSheet.character.stats">
                <stat-box>
                    <primary-stat
                        stat-obj="value"></primary-stat>

                    <button
                        class="display-spell-casting-modifier"
                        ng-click="characterSheet.displayCastingMod(value)"
                        ng-class="{active: value.castingModDisplayed}">
                        Display as Spell Casting Mod
                    </button>

                    <button
                        class="proficient-toggle"
                        ng-init="value.isProficient = false"
                        ng-click="value.isProficient = !value.isProficient"
                        ng-class="{active: value.isProficient}">
                        Proficient: {{value.isProficient}}
                    </button>

                    <ability-check-roll
                        character-guid="characterSheet.character.guid"
                        button-text="value.name"
                        stat-name="key"
                        is-proficient="value.isProficient"></ability-check-roll>

                    <ability-check-roll
                        character-guid="characterSheet.character.guid"
                        button-text="value.name + ' Saving Throw'"
                        stat-name="key"
                        is-proficient="value.saveProficient"></ability-check-roll>
                </stat-box>
            </stat-box-container>
        </primary-stats>

        <skill-rows>

            <skill-row
                ng-repeat="skill in characterSheet.character.skills"
                ng-class="{active: skill.proficient}">
                <ability-check-roll
                    character-guid="characterSheet.character.guid"
                    button-text="skill.name"
                    stat-name="skill.stat"
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
