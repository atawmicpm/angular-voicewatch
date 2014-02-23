/*  create <wave> HTML tag that calls wavesurfer.js, displays the waveform, and adds the play/pause button */
vwApp.directive('wave', function ($compile) {
  return {
    restrict: 'E',
    template: '<i class="fa fa-caret-square-o-right fa-2x"></i>',

    link:function(scope, element, attrs) {
      
      var recording = attrs.recording;
      var resultId = attrs.resultId;
      var primary = attrs.primary;
      var wavesurfer = Object.create(WaveSurfer);


      if (primary == 1) {
        console.log('got a primary!');
        angular.element('#wave').empty();
      
        wavesurfer.init({
          container: document.querySelector('#wave'),
          waveColor: '#666',
          progressColor: '#3498db',
          height: 80,
        });

        wavesurfer.load(recording);
        // console.log(wavesurfer.load(recording));
      };

      element.bind('mouseenter', function() {

        angular.element('#wave').empty();
      
        wavesurfer.init({
          container: document.querySelector('#wave'),
          waveColor: '#666',
          progressColor: '#3498db',
          height: 80,
        });

        wavesurfer.load(recording);

      });

      element.bind('click', function() {
        wavesurfer.playPause();
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

