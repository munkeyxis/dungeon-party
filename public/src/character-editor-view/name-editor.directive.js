(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('nameEditor', nameEditor);

    var template = `
        <input type="text" ng-model="nameEditor.name">
        <button ng-click="nameEditor.save()">Save</button>
    `;

    /* @ngInject */
    function nameEditor() {
        var directive = {
            bindToController: true,
            controller: NameEditorController,
            controllerAs: 'nameEditor',
            restrict: 'E',
            scope: {
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function NameEditorController($http, $log) {
        const vm = this;

        this.name = "Enter Name";
        this.save = () => {
            $http({
            url: 'http://localhost:3000/save-character',
            method: 'POST',
            dataType: 'json',
            data: {name: vm.name},
            headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    $log.info('save response', response);
                });
        };
    }
})();