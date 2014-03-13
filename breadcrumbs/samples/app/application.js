(function(){
  var app = angular.module('sample', ['ui.router','radical.breadcrumbs']);
  
  app.controller('homeController', [function(){
  }])
  .controller('productsController', [function(){
  }])
  .controller('productController', ['$scope', function($scope){
  	
  }])
  .controller('aboutController', [function(){
  }]);
  
  app.config(['$locationProvider','$stateProvider', 'breadcrumbsConfigProvider', function($locationProvider, $stateProvider, breadcrumbsConfig){
    
    $locationProvider.html5Mode(false).hashPrefix('!');
    
    $stateProvider.state('home', {
                url: '/home',
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
    		.state('_home', {
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
    		.state('__home', {
                url: '',
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

  app.run(['$log','$rootScope', function($log, $rootScope){
    $rootScope.customResolver = function(defaultResolver, state, stateParams, isCurrent){

    	//$log.debug('customResolver', stateParams, state);

			if(state.name==='home.products.productById'){
				return state.data.settings.displayName + ' ' + stateParams.id;
			}

			return defaultResolver(state, stateParams, isCurrent);
		};
	}]);
})()