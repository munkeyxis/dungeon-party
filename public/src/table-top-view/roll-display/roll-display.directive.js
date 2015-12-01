(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('rollDisplay', rollDisplay);

    var template = `
    	<roll-total>
    		Total Rolled {{rollDisplay.total}}
    	</roll-total>
    `;

    /* @ngInject */
    function rollDisplay() {
        var directive = {
            bindToController: true,
            controller: RollDisplayController,
            controllerAs: 'rollDisplay',
            restrict: 'E',
            scope: false,
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function RollDisplayController($log, socket) {
    	const vm = this;

    	socket.on('rollResult', data => {
    		$log.info('rollResult received');
    		vm.total = data;
    	});
    }
})();