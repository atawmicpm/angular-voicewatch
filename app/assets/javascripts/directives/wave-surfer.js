vwApp.directive('waveSurfer', function ($compile) {
  return {
    restrict: 'E',
    template: '<button id="playbutton" class="btn btn-primary">play / pause</button>',
    link:function(scope, element, attrs) {
      
      var recording = attrs.recording;
      var resultId = attrs.resultId;
      // var node = '<div id=wavesurfer"' + resultId + '"><div>';
      // var e = angular.element(element);
      // $compile(e.contents())(scope);
      // element.append(e);

      var wavesurfer = Object.create(WaveSurfer);
      
      console.log(angular.element(element).parent());

      wavesurfer.init({
        // container: element,
        // container: document.querySelector('#test'),
        // container: $(element[0]),
        container: document.querySelector('#wavesurfer' + resultId),
        // container: e,
        waveColor: '#666',
        progressColor: '#428bca',
        height: 100,
        // normalize: true
      });

      wavesurfer.load(recording);
      
      element.bind('click', function(){
        wavesurfer.playPause();
      });


      // document.querySelector('#play' + resultId).bind('click', function(){
      //   wavesurfer.play();
      // });
    }
  };
});

// vwApp.directive('playButton', function() {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attrs) {
//       element.bind('click', function(){
//         wavesurfer.play();
//       });
//     }
//   };
// });

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
    }
});

// vwApp.directive('')
// var wavesurfer = Object.create(WaveSurfer);

// wavesurfer.init({
//     container: document.querySelector('#wave'),
//     waveColor: 'violet',
//     progressColor: 'purple'
// });

// wavesurfer.on('ready', function () {
//     wavesurfer.play();
// });

// wavesurfer.load('example/media/demo.mp3');