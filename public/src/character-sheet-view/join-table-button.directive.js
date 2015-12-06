(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('joinTableButton', joinTableButton);

    var template = `
        <button ng-click="joinTableButton.joinTable()">
            Join Table
        </button>
    `;

    /* @ngInject */
    function joinTableButton() {
        var directive = {
            bindToController: true,
            controller: JoinTableButtonController,
            controllerAs: 'joinTableButton',
            restrict: 'E',
            scope: {
                characterData: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function JoinTableButtonController($log, socket) {
        const vm = this;

        vm.joinTable = () => {
            $log.info('adding character to table');
            socket.emit('addCharacter', vm.characterData);
        };
    }
})();