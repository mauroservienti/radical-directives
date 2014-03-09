(function () {

	var module = angular.module('radical.breadcrumbs', ['ui.router']);

	module.factory('breadcrumbsConfig', [function(){ 
        return {
            templateUrl: '/radical/directives/breadcrumbs/template.html',
            defaultItemNameResolver: function(state) {
            	var displayName = state.data.settings.displayName || state.name;
                return displayName;
            }
        };
    }]);

	module.directive('breadcrumbs', ['$log', 'breadcrumbsConfig','$parse', function ($log, config, $parse) {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                displayNameResolver: '&'
            },
            templateUrl: '/radical/directives/breadcrumbs/template.html',
            controller: ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {

                var isCurrent = function(state){
                    return $state.$current.name === state.name;
                };

                var setNavigationState = function () {
                    $scope.$navigationState = {
                        currentState: $state.$current,
                        params: $stateParams,
                        getDisplayName: function (state) {

                            if ($scope.hasCustomResolver) {
                                return $scope.displayNameResolver({
                                    defaultResolver: config.defaultItemNameResolver,
                                    state: state,
                                    isCurrent: isCurrent(state)
                                });
                            }
                            else {
                                return config.defaultItemNameResolver(state);
                            }
                        },
                        isCurrent: function (state) {
                            return isCurrent(state);
                        }
                    }
                };

                $scope.$on('$stateChangeSuccess', function () {
                    setNavigationState();
                });

                setNavigationState();
            }],
            link: function (scope, element, attrs, controller) {
                scope.hasCustomResolver = angular.isDefined(attrs['displayNameResolver']);
            }
        };
    }]);

})();