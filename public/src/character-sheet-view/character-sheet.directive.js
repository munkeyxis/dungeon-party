(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('characterSheet', characterSheet);

    var template = `
    	{{characterSheet.character.name}}
    	<primary-stats 
    		character-stats="characterSheet.character.stats">
    	</primary-stats>
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
    function CharacterSheetController(webServices) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        	webServices.getCharacter().then((character) => {
        		vm.character = character;
        	});
        }
    }
})();