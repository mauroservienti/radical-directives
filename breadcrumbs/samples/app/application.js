(function(){
  var app = angular.module('sample', ['ui.router','radical.breadcrumbs']);
  
  app.controller('homeController', [function(){
  }])
  .controller('productsController', [function(){
  }])
  .controller('productController', [function(){
  }])
  .controller('aboutController', [function(){
  }]);
  
  app.config(['$locationProvider','$stateProvider', function($locationProvider, $stateProvider){
    
    $locationProvider.html5Mode(false).hashPrefix('!');
    
    $stateProvider.state('home', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'homeView.html',
                        controller: 'homeController'
                    }
                },
                data: {
                    settings: {
                        displayName: 'Home'
                    }
                }
            })
            .state('home.products', {
                url: '/products',
                views: {
                    '': {
                        templateUrl: 'productsView.html',
                        controller: 'productsController'
                    }
                },
                data: {
                    settings: {
                        displayName: 'Products'
                    }
                }
            })
            .state('home.products.productById', {
                url: '/{id}',
                views: {
                    '': {
                        templateUrl: 'productView.html',
                        controller: 'productController'
                    }
                },
                data: {
                    settings: {
                        displayName: 'Product'
                    }
                }
            })
            .state('about', {
                url: '/about',
                views: {
                    '': {
                        templateUrl: 'aboutView.html',
                        controller: 'aboutController'
                    }
                },
                data: {
                    settings: {
                        displayName: 'About'
                    }
                }
            });
    
  }]);
})()