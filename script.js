angular.module('myApp', [])
  .controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get('MOCK_DATA.json')
      .then(function(response) {

        $scope.peopleList = response.data;

        $scope.pages();
        $scope.peopleGenders();
        $scope.peopleCompanies();
        $scope.peopleJobs();
      });
    $scope.peoplePerPage = 10;
    $scope.pageNumbersLimit = 10;

    $scope.currentPage = 0;
    $scope.perPageFirst = 10;
    $scope.perPageSecond = 20;
    $scope.perPageThird = 30;

    $scope.console = function() {
      console.log($scope.result);
    };

    $scope.openPerson = function(object) {
      $scope.selectedPerson = object.person;

      $scope.selectedAvatar = ($scope.selectedPerson.avatar).replace("50x50", "100x100");

      angular.element(document.querySelector("#selected")).css("visibility", "visible");
    };

    $scope.closeSelectedPerson = function() {
      angular.element(document.querySelector("#selected")).css("visibility", "hidden");
    };

    $scope.pages = function() {
      $scope.pagesCounter = [];
      var k = 0;

      for (var i = 0; i < $scope.peopleList.length; i += $scope.peoplePerPage) {
        k += 1;
        $scope.pagesCounter.push(k);
      }

      if ($scope.currentPage + 1 > $scope.pagesCounter.length) {
        $scope.currentPage = 0;
        $scope.pageNumbersLimit = 10;
      }
    };

    $scope.selectPage = function(object) {
      $scope.currentPage = object.pageNumber - 1;

      if (object.pageNumber > 9) {
        $scope.pageNumbersLimit = 11;
      } else {
        $scope.pageNumbersLimit = 10;
      }
    };

    $scope.drawBorder = function(object) {
      var myBorder = (object.pageNumber - 1 == $scope.currentPage) ? 'selectedCell' : '';
      return myBorder;
    };
    
        $scope.drawBorderPerPage = function(object) {
      var myBorder = (object == $scope.peoplePerPage) ? 'selectedCell' : '';
      return myBorder;
    };

    $scope.peoplePerPageSet = function(object) {
      $scope.peoplePerPage = object;

      $scope.pages();
    };

    $scope.orderName = function() {
      if ($scope.sortOrder == 'last_name + first_name') {
        $scope.sortOrder = '-last_name + -first_name';
      } else {
        $scope.sortOrder = 'last_name + first_name';
      }
    };

    $scope.orderGender = function() {
      if ($scope.sortOrder == 'gender') {
        $scope.sortOrder = '-gender';
      } else {
        $scope.sortOrder = 'gender';
      }
    };

    $scope.orderCompany = function() {
      if ($scope.sortOrder == 'company_name') {
        $scope.sortOrder = '-company_name';
      } else {
        $scope.sortOrder = 'company_name';
      }
    };

    $scope.orderJob = function() {
      if ($scope.sortOrder == 'job_title') {
        $scope.sortOrder = '-job_title';
      } else {
        $scope.sortOrder = 'job_title';
      }
    };

    $scope.peopleGenders = function() {
      $scope.peopleGendersList = [];
      for (i = 0; i < $scope.peopleList.length; i++) {
        $scope.peopleGendersList.push($scope.peopleList[i].gender);
      }
    };

    $scope.peopleCompanies = function() {
      $scope.peopleCompaniesList = [];
      for (i = 0; i < $scope.peopleList.length; i++) {
        $scope.peopleCompaniesList.push($scope.peopleList[i].company_name);
      }
    };

    $scope.peopleJobs = function() {
      $scope.peopleJobsList = [];
      for (i = 0; i < $scope.peopleList.length; i++) {
        $scope.peopleJobsList.push($scope.peopleList[i].job_title);
      }
    };
  }])
  .filter('unique', function() {

    return function(items, filterOn) {

      if (filterOn === false) {
        return items;
      }

      if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
        var hashCheck = {},
          newItems = [];

        var extractValueToCompare = function(item) {
          if (angular.isObject(item) && angular.isString(filterOn)) {
            return item[filterOn];
          } else {
            return item;
          }
        };

        angular.forEach(items, function(item) {
          var valueToCheck, isDuplicate = false;

          for (var i = 0; i < newItems.length; i++) {
            if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            newItems.push(item);
          }

        });
        items = newItems;
      }
      return items;
    };
  })
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  })
  .filter('startPagesFrom', function() {
    var J = 5;
    return function(input, start) {
      start = start;
      if (start < 9) {
        return input;
      } else {
        if (start + 1 == input.length) {
          return input.slice(J - 5);
        } else {
          if ((start + 1) % 5 === 0) {
            J = start;

            return input.slice(start - 5);
          } else {
            return input.slice(J - 5);
          }
        }
      }
    };
  });