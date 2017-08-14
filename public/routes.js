angular.module('DataClubsModule').config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/');
    
        $stateProvider.state('root', {
            url: '/',
            templateUrl: '/home/index.html',
            controller: 'rootCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/register/index.html',
            controller: 'registerCtrl'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '/profile/index.html',
            controller: 'profileCtrl'
        })
        .state('profile.clubs', {
            url: '/clubs',
            templateUrl: '/clubs/clubs.html',
            controller: 'profileCtrl'
        })
        .state('profile.data', {
            url: '/data',
            templateUrl: '/data/data.html',
            controller: 'profileCtrl'
        })
        .state('profile.apps', {
            url: '/apps',
            templateUrl: '/profile/apps.html',
            controller: 'profileCtrl'
        })
        .state('profile.help', {
            url: '/help',
            templateUrl: '/profile/help.html',
            controller: 'profileCtrl'
        })
        .state('profile.viewClub', {
            url: '/club/:name',
            templateUrl: '/clubs/view-club-admin.html',
            controller: 'clubCtrl',
            params: { clubId: null }    // pass club id in stateParams
        });
    });