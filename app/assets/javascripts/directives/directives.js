/*  create <wave> HTML tag that calls wavesurfer.js, displays the waveform, and adds the play/pause button */
vwApp.directive('wave', function ($compile) {
  return {
    restrict: 'E',
    template: '<i ng-class="{\'success pull-left\': result.status == 0, \'danger pull-left\': result.status == 1}" class="fa fa-caret-square-o-right fa-2x pointer"></i>',

    link:function($scope, $element, $attrs) {
      
      var recording   = $attrs.recording;
      var resultId    = $attrs.resultId;
      var primary     = $attrs.primary;
      var wavesurfer  = Object.create(WaveSurfer);

      if (primary == 1) {
        console.log('got a primary!');
        angular.element('#wave').empty();
      
        wavesurfer.init({
          container: document.querySelector('#wave'),
          waveColor: '#666',
          progressColor: '#3498db',
          height: 80,
        });

        $scope.waveFaded = false;
        wavesurfer.load(recording);
        $scope.current_recording = recording;
      };

      $element.bind('mouseenter', function() {
        if (recording !== $scope.current_recording) {
          $scope.waveFaded = true;
          angular.element('#wave').empty();
        
          wavesurfer.init({
            container: document.querySelector('#wave'),
            waveColor: '#666',
            progressColor: '#3498db',
            height: 80,
          });

          $scope.current_recording = recording;
          wavesurfer.load(recording);
          $scope.waveFaded = false;
        };
      });


      $element.bind('click', function() {
        $scope.$emit('finished', recording);  
        wavesurfer.playPause();  
      });

      wavesurfer.on('play', function() {
        $scope.$emit('playing', recording);
      });
      
      wavesurfer.on('finish', function(){
        $scope.$emit('finished', recording);
      });     


    }
  };
});

/*  add on-finish-render attribute to any ng-repeat to have it emit/broadcast ngRepeatFinished
    so other scripts can perform updates once the information is rendered 
*/
vwApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

