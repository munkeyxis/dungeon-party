(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('tableTop', tableTop);

    var template = `
    	<div ng-repeat="character in tableTop.partyCharacters">
    		{{character.name}}
    	</div>
    	<roll-display></roll-display>
    `;

    /* @ngInject */
    function tableTop() {
        var directive = {
            bindToController: true,
            controller: TableTopController,
            controllerAs: 'tableTop',
            restrict: 'E',
            scope: {
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function TableTopController($log, socket) {
    	const vm = this;

    	vm.partyCharacters = [];

    	socket.on('addCharacter', data => {
    		$log.info('adding character to table', data.name);
    		vm.partyCharacters.push(data);
    	});
    }
})();