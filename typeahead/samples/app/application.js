(function(){
  angular.module('sample', ['radical.typeahead'])
    .controller('sampleController', ['$scope', '$timeout', '$log', function($scope, $timeout, $log){

      var people = [{
        firstName: 'Mauro',
        lastName: 'Servienti'
      },{
        firstName: 'Andrea',
        lastName: 'Balducci'
      },{
        firstName: 'Alessandro',
        lastName: 'Giorgetti'
      },{
        firstName: 'Gian Maria',
        lastName: 'Ricci'
      }];

      $scope.searchTerm = '';
      $scope.searchResults = [];
      $scope.selected = null;

      $scope.search = function (term) {
        if (term && term !== '') {
          //simulate a long http call to the backend
          return $timeout( function(){
            var lcTerm = term.toLowerCase();
                  
            var results = _.filter(people, function(person) {
              return person.firstName.toLowerCase().indexOf(lcTerm) !== -1
                      || person.lastName.toLowerCase().indexOf(lcTerm) !== -1;
            });
            
            return results;
                  
          }, 500).then(function(results){
            $log.debug('results:', results);
            $scope.searchResults = results;
          });
                    
        } else {
          return $timeout(function () {
            $log.debug('tentative to execute a search without any term, skipping.');
          }, 10);
        }
      };

      $scope.select = function (t) {
        $log.debug('select invoked on: ', t);
        $scope.selected = t;
        $scope.searchTerm = '';
      };


























      var taxonomies = [
        {id:0, name:'FooBar'}, 
        {id:1, name:'Software'}, 
        {id:2, name:'AngularJS'}, 
        {id:3, name:'AngularJS Day'}, 
        {id:4, name:'Single Page Application'}, 
        {id:5, name:'Managed Designs'}, 
        {id:6, name:'Mauro Servienti'}
      ];
      
      $scope.taxonomiesSearchTerm = '';
      $scope.taxonomiesSelection = [];
      $scope.taxonomiesSearchResults = [];

      $scope.selectTaxonomy = function (t) {
            $log.debug('select invoked on: ', t);

            if (t != null) {
              var dup = _.findWhere($scope.taxonomiesSelection, {
                id: t.id
              });

              $log.debug('dup item: ', dup);

              if (dup == undefined) {
                $scope.taxonomiesSelection.push(t);
                $log.debug('item added:', t);
              }else{
                $log.debug('already present, skipping');
              }
              
              $scope.taxonomiesSearchTerm = '';
            }
      };

      $scope.searchTaxonomies = function (term) {
        if (term && term !== '') {
          //simulate a long http call to the backend
          return $timeout( function(){
            var lcTerm = term.toLowerCase();
                  
            var results = _.filter(taxonomies, function(tag) {
              var lcTag = tag.name.toLowerCase();
              return lcTag.indexOf(lcTerm) !== -1;
            });
            
            return results;
                  
          }, 500).then(function(results){
            $log.debug('results:', results);
            $scope.taxonomiesSearchResults = results;
          });
                    
        } else {
          return $timeout(function () {
            $log.debug('tentative to execute a search without any term, skipping.');
          }, 10);
        }
      };
      
    }]);
})()