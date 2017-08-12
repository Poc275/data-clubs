angular.module('DataClubsModule', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ui.router'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                'default': '700'
            })
            .accentPalette('blue', {
                'default': '500'
            })
            .warnPalette('red');
});