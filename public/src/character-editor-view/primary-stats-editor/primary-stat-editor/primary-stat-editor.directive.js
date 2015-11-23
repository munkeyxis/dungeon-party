(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('primaryStatEditor', primaryStatEditor);

    var template = `
		<label>{{primaryStatEditor.stat.name}}:</label>

		<input type="number" min="8"
			ng-change="primaryStatEditor.calculateModifier()" 
			ng-model="primaryStatEditor.stat.value">

		<span class="modifier">
			{{primaryStatEditor.stat.modifier}}
		</span>
    `;

    /* @ngInject */
    function primaryStatEditor() {
        var directive = {
            bindToController: true,
            controller: PrimaryStatEditorController,
            controllerAs: 'primaryStatEditor',
            restrict: 'E',
            scope: {
                stat: '=statObj'
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function PrimaryStatEditorController(modifierCalculator) {
    	var vm = this;

    	vm.calculateModifier = () => { assignModifier(); };

    	activate();

    	function activate() {
    		assignModifier();
    	}

    	function assignModifier() {
    		vm.stat.modifier = modifierCalculator.calculateModifier(vm.stat.value);
    	}
    }
})();