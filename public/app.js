var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http, $window) {
   
  $scope.testDone = true;
  var reat = function(){
    $window.location.reload();
  };
  $http({
    method: 'GET',
    url: '/danhsach'
  }).then(function successCallback(response) {
    $scope.danhSachUser = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
  
  $scope.addUser = function(){
    data = $scope.user;
    console.log(data);
    if($scope.user !== undefined){
     if($scope.user.username !== '' && $scope.user.password !== ''){
      $http.post('/themuser', data).then(function (response) {
        // This function handles success
        reat();    
        // console.log(response);
        }, function (response) {
        // this function handles error
        });
     }
    } 
  };//End function add User


  $scope.deleteUser = function(id){
    console.log(id);
    $http.post('/xoauser/' + id).then(function(res){
        
        console.log('Hello AE');
    }, function(err){ 
        console.log(err);
    });
    reat();
  }; //End Function Delete

  $scope.editUser = function(id){
    $scope.testAdd = 'all';
    $scope.testDone = false;
    $scope.testDone2 = 'a';
      console.log(id);
      $http.get('/suauser/' + id).then(function(res){
          $scope.user = res.data;
      });
  };
  $scope.submitUser = function(id){
    $scope.testDone = false;
    $scope.testAdd = 'all';
      console.log(id);
      const data = $scope.user;
      $http.post('/suauser/' + id, data).then(function(res){
          console.log('Haha');
      })
      // console.log(data);
      reat();
  };
});