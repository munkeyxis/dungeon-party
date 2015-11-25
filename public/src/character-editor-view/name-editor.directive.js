(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('nameEditor', nameEditor);

    var template = `
        <label>Character Name:</label>
        <input type="text" ng-model="characterEditor.character.name">
    `;

    /* @ngInject */
    function nameEditor() {
        var directive = {
            restrict: 'E',
            template: template
        };
        return directive;
    }
})();