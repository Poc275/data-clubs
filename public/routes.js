angular.module('DataClubsModule').config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/');
    
        $stateProvider.state('root', {
            url: '/',
            templateUrl: '/home/index.html',
            controller: 'rootCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/home/login.html',
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
            controller: 'profileCtrl',
            // added state params to parent state so that they 
            // don't get reset when transitioning between child states
            params: { clubId: null, orgId: null, orgLogoUrl: null, club: null, forum: null }
        })
        .state('profile.clubs', {
            url: '/clubs',
            templateUrl: '/clubs/clubs.html',
            controller: 'profileCtrl'
        })
        .state('profile.viewClubAdmin', {
            url: '/club/:name/admin',
            templateUrl: '/clubs/view-club-admin.html',
            controller: 'clubAdminCtrl'
        })
        .state('profile.viewClub', {
            url: '/club/:name',
            templateUrl: '/clubs/view-club.html',
            controller: 'clubCtrl'
        })
        .state('profile.viewOrganisation', {
            url: '/organisation/:org',
            templateUrl: '/organisations/view-organisation-admin.html',
            controller: 'organisationCtrl'
        })
        .state('profile.viewClub.data', {
            url: '/data',
            templateUrl: '/data/data.html',
            controller: 'dataCtrl'
        })
        .state('profile.viewClub.apps', {
            url: '/apps',
            templateUrl: '/apps/apps.html',
            controller: 'profileCtrl'
        })
        .state('profile.viewClub.viewLineChart', {
            url: '/apps/plot',
            templateUrl: '/apps/line-chart-example.html',
            controller: 'lineChartCtrl'
        })
        .state('profile.viewClub.discuss', {
            url: '/discuss',
            templateUrl: '/discuss/discuss.html',
            controller: 'discussCtrl'
        })
        .state('profile.viewClub.forum', {
            url: '/discuss/forum',
            templateUrl: '/discuss/forum.html',
            controller: 'discussCtrl'
        });
    });