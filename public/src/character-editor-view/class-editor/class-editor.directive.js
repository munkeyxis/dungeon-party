(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('classEditor', classEditor);

    const template = `
        <label>
            Class:
            <select
                ng-options="class for class in classEditor.classes"
                ng-model="classEditor.characterClass"></select>
        </label>
    `;

    /* @ngInject */
    function classEditor() {
        const directive = {
            bindToController: true,
            controller: ClassEditorController,
            controllerAs: 'classEditor',
            restrict: 'E',
            scope: {
                characterClass: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function ClassEditorController() {
        const vm = this;

        vm.classes = ['Fighter', 'Ranger', 'Paladin', 'Warlock'];
    }
})();
