angular.module('characterSheet')
.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/character-sheet');

	$stateProvider
		.state('characterSheet', {
			url: '/character-sheet',
			template: '<character-sheet></character-sheet>'
		})
		.state('characterEditor', {
			url: '/character-editor',
			template: '<character-editor></character-editor>'
		})
		.state('tableTop', {
			url: '/table-top',
			template: '<roll-display></roll-display>'
		});
});	