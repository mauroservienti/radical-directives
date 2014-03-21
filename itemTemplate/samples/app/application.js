(function(){
  angular.module('sample', ['radical.itemTemplate'])
    .controller('sampleController', ['$scope','$log', function($scope, $log){
    
      $scope.selection = null;
    
      $scope.models = [{
        dataType: 'companies',
        companyName: 'Managed Designs S.r.l.'
      },{
        dataType: 'people',
        firstName: 'Mauro',
        lastName: 'Servienti'
      },];
      
      $scope.select = function(model){
        $log.debug('select:', model);
        $scope.selection = model;
      };

      $scope.otherModels = [{
        dataType: 'companies',
        companyName: 'Mastreeno, Ltd.'
      },{
        dataType: 'people',
        firstName: 'Lucia',
        lastName: 'Bossi'
      },];
    }]);
})()