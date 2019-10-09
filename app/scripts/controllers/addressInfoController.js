angular.module('cetExplorer')
    .controller('addressInfoCtrl', function ($rootScope, $scope, $location, $routeParams, $q) {

      var web3 = $rootScope.web3;
	
      $scope.init=function(){

        $scope.addressId=$routeParams.addressId;

        if($scope.addressId!==undefined) {
          getAddressInfos().then(function(result){
            $scope.balance = result.balance;
            $scope.balanceInCeter = result.balanceInCeter;
          });
        }


        function getAddressInfos(){
          var deferred = $q.defer();

          web3.cet.getBalance($scope.addressId,function(error, result) {
            if(!error) {
                deferred.resolve({
                  balance: result,
                  balanceInCeter: web3.fromWei(result, 'ceter')
                });
            } else {
                deferred.reject(error);
            }
          });
          return deferred.promise;
        }


      };
      
      $scope.init();

    });
