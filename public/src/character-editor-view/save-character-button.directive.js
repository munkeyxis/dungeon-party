(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('saveCharacterButton', saveCharacterButton);

    var template = `
    	<button ng-click="saveCharacterButton.save()">Save</button>
    `;

    /* @ngInject */
    function saveCharacterButton(webServices) {
        var directive = {
            bindToController: true,
            controller: SaveCharacterButtonController,
            controllerAs: 'saveCharacterButton',
            restrict: 'E',
            scope: {
                characterModel: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function SaveCharacterButtonController(webServices) {
    	const vm = this;

    	vm.save = () => {
    		webServices.saveCharacter(vm.characterModel);
    	};
    }
})();