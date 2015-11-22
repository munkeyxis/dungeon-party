(function() {
    'use strict';

    angular
        .module('characterSheet')
        .controller('CharacterSheetController', CharacterSheetController);

    /* @ngInject */
    function CharacterSheetController(characterData) {
        var vm = this;
        vm.title = 'CharacterSheetController';

        activate();

        ////////////////

        function activate() {
        	vm.name = characterData.data.name;
        }
    }
})();