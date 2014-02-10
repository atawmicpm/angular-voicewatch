vwApp.directive('waveSurfer', function ($compile) {
  return {
    restrict: 'E',

    template: '<button id="playbutton" class="btn btn-primary" data-action="play"><i class="glyphicon glyphicon-play"></i> Play / <i class="glyphicon glyphicon-pause"></i> Pause</button>',
    link:function(scope, element, attrs) {
      
      var recording = attrs.recording;
      var resultId = attrs.resultId;
      var wavesurfer = Object.create(WaveSurfer);
      
      wavesurfer.init({
        container: document.querySelector('#wavesurfer' + resultId),
        waveColor: '#666',
        progressColor: '#428bca',
        height: 100,
      });

      wavesurfer.load(recording);
      
      element.bind('click', function(){
        wavesurfer.playPause();
      });

    }
  };
});


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

