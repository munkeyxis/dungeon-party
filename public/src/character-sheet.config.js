angular.module('characterSheet')
.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/character-sheet');

	$stateProvider
		.state('characterSheet', {
			url: '/character-sheet',
			template: '{{characterSheet.name}}<primary-stats></primary-stats>',
			controller: 'CharacterSheetController',
			controllerAs: 'characterSheet',
			resolve: {
				characterData: ($http, $log) => {
					return $http({
						method: 'GET',
						url: 'http://localhost:3000/character-data'
					}).then(data => {
						$log.info('got', data);
						return data;
					});
				}
			}
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