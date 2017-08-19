angular.module('DataClubsModule').controller('discussCtrl', function($scope, $stateParams) {
    $scope.forumTopic = $stateParams.forum;
    
    $scope.forums = [{
        topic: 'Welcome',
        category: 'Discuss',
        creator: 'peter@dataclubs.com',
        replies: 3
    }, {
        topic: 'Need more flight delay data',
        category: 'Question',
        creator: 'jane@dataclubs.com',
        replies: 1
    }, {
        topic: 'How to plot using pyplot',
        category: 'Tips',
        creator: 'peter@dataclubs.com',
        replies: 0
    }, {
        topic: 'How do I see delays by airport breakdown',
        category: 'Help',
        creator: 'faizan@dataclubs.com',
        replies: 1
    }, {
        topic: 'How can we turn this into a service?',
        category: 'Discuss',
        creator: 'andrea@customer.com',
        replies: 1
    }];

    $scope.posts = [{
        username: 'peter@dataclubs.com',
        avatar: 'images/icons/avatar-1.svg',
        message: 'Welcome to the club! This is just a welcome forum to introduce yourself to other club members.',
        timestamp: '19th Aug 2017'
    }, {
        username: 'jane@dataclubs.com',
        avatar: 'images/icons/avatar-2.svg',
        message: 'Hi! I\'m looking forward to joining the club and working on some data problems!',
        timestamp: '20th Aug 2017'
    }, {
        username: 'peter@dataclubs.com',
        avatar: 'images/icons/avatar-1.svg',
        message: 'Welcome! Glad to have you on board',
        timestamp: '21st Aug 2017'
    }];


});