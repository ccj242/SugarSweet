// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.services','ngCordova','ngSanitize'])

.config(function($compileProvider,$ionicConfigProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//); //iOS fix  
    $ionicConfigProvider.views.transition('none'); //removes all transitions

//if (ionic.Platform.isAndroid()) {
$ionicConfigProvider.scrolling.jsScrolling(false); //supposed to help android performance?
//}
        })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("AppCtrl", function($scope,$http,Db,$ionicPlatform,$cordovaAppRate,$cordovaSocialSharing,$ionicModal, $window,$timeout){

alert('top padding, cancel barcode,apprate and share details,share double-take');

  ionic.Platform.ready(function(){
  /**/
  AppRate.preferences.storeAppURL.ios = '1068075904';
  AppRate.preferences.storeAppURL.android = 'market://details?id=com.jarvisfilms.sugarsweet';
  AppRate.preferences.usesUntilPrompt = 5;

    $cordovaAppRate.promptForRating(false).then(function (result) {
        // success
    });
});

if (navigator.appVersion.indexOf("Android") > 0 ){
$scope.SMSTactics=true;
}else{
  $scope.SMSTactics=false;
}

  $scope.noscan=true;

  $ionicModal.fromTemplateUrl('phoneflare.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


$scope.openfunc=function(id){
  $window.open($scope.sugars[id][2],'_blank');
}


$scope.share=function(){
$timeout(function(){
  $cordovaSocialSharing
    .share("a free app that helps identify sugar alcohols and artificial sweeteners", "SugarSweet: A Free Colitis/Crohn's app", "http://www.phoneflare.com/logo.png", "http://www.phoneflare.com") // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });


},300)
}

$ionicPlatform.onHardwareBackButton(function() {
 $scope.loading=false;
});

$scope.scan=function(){

if(Math.floor(Math.random()*4)<1){
  $scope.openModal();
}

$scope.upcerror=false;
$scope.dataerror=false;
$scope.matches=false;
$scope.safe=false;
$scope.loading=true;

cordova.plugins.barcodeScanner.scan(
      function (result) {

if(Number(result.text)=='NaN' || (result.text.length!==12 && result.text.length!==8)){
  $scope.upcerror=true;
  $scope.loading=false;
  return;
}
       
dURL='http://api.v3.factual.com/t/products-cpg-nutrition?filters={"$or":[{"ean13":"'+result.text+'"},{"upc":"'+result.text+'"}]}';

$http({
                method:'GET',
                url: dURL,
                params:{'KEY':'FtpcjJAXfzzm1Kq3U2j0WKlQ0fCMGgralMY50GRc'}
            }).success(function(response) {

if (!response.response.data[0]){
  $scope.dataerror=true;
  $scope.loading=false;
    return;
};

              $scope.data=response.response.data[0];

  if (typeof $scope.data.ingredients === 'undefined'){
  $scope.dataerror=true;
  $scope.loading=false;
    return;
  }
              dump=JSON.stringify($scope.data.ingredients);
              //alert('sugars '+$scope.data.sugars)
              //alert('calories '+$scope.data.calories)
$scope.sugars=[];
$scope.safe=true;
$scope.noscan=false;

    for (i=0;i<sweeteners.length;i++){

     if ((dump.toLowerCase()).includes(sweeteners[i].toLowerCase())){

url="https://en.wikipedia.org/wiki/"+sweeteners[i];

if(i<6){type="caloric sweetener"}else if (i<19){type="artificial sweetener"}else if (i<33){type="sugar alcohol"}else if (i<45){type="non-FDA approved sweetener"}else{type="natural protein sweetener"};
  $scope.sugars.push([sweeteners[i],type,url]);
  $scope.matches=true;
  $scope.safe=false;
     };

};
$scope.loading=false;

if($scope.data.sugars*4>$scope.data.calories && $scope.data.sugars>0){
  alert('No sweetners found but calorie to sugar ratio is off');
  //$scope.scan();
  return;
};



// red flag 4 calories per gram of sugar. So if there is less than 
              // $scope.data.serving_size;
               //$scope.data.sugars;
              // $scope.data.total_carb;
            //310 grams carbs on avg and 90 grams sugar on avg daily relativize - cups 
//$scope.scan();
            }).error(function(response) {
                console.log('error '+ JSON.stringify(response));
                $scope.scan();
            });


      }, 
      function (error) {
        $scope.loading=false;
        $scope.noscan=true;
          //alert("Scanning failed: " + error);
          //$scope.scan();
      }
   );
}

$ionicPlatform.on('resume', function(){

$scope.$apply(function(){

$scope.noscan=true;
$scope.upcerror=false;
$scope.dataerror=false;
$scope.matches=false;
$scope.safe=false;
$scope.loading=false;
});
  });

$scope.birds=function(){
  $window.open('https://www.youtube.com/embed/2rI_em4MscE?VQ=HD1080&autoplay=1','_system');
}

$scope.smstactics=function(){
  $window.open('https://play.google.com/store/apps/details?id=com.jarvisfilms.smstactics&hl=en','_blank');

}

$scope.wordunk=function(){
  if (navigator.appVersion.indexOf("Android") > 0 ){
  $window.open('https://play.google.com/store/apps/details?id=com.jarvisfilms.wordunknown&hl=en','_blank');
}else{
  $window.open('https://itunes.apple.com/de/app/word-unknown/id1064901570?l=en&mt=8','_blank');
}
}

$scope.iconic=function(){
  if (navigator.appVersion.indexOf("Android") > 0 ){
  $window.open('https://play.google.com/store/apps/details?id=com.ionicframework.menu656740&hl=en','_blank');
}else{
  $window.open('https://itunes.apple.com/de/app/iconic-passwords/id1042191398?l=en&mt=8','_blank');
}
}

$scope.tmm=function(){
  $window.open('http://www.typemymusic.com','_blank');
}

$scope.phoneflare=function(){
  if (navigator.appVersion.indexOf("Android") > 0 ){
  $window.open('https://play.google.com/store/apps/details?id=com.jarvisfilms.phoneflare','_blank');
}else{
  $window.open('https://itunes.apple.com/us/app/phoneflare/id1068075904?ls=1&mt=8','_blank');
}
}


});


//})