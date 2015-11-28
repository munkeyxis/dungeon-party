(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('maxHitPointsEditor', maxHitPointsEditor);

    var template = `
        <label>
            Max Hit Points:
            <input 
                type="number"
                ng-model="maxHitPointsEditor.maxHitPoints"></input>
        </label>
    `;

    /* @ngInject */
    function maxHitPointsEditor() {
        var directive = {
            bindToController: true,
            controller: MaxHitPointsEditorController,
            controllerAs: 'maxHitPointsEditor',
            restrict: 'E',
            scope: {
                maxHitPoints: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function MaxHitPointsEditorController() {
        const vm = this;
        
    }
})();