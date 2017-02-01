'use strict';
app.controller('HomeCtrl',
    ["$sce", "$timeout", "$http", function ($sce, $timeout, $http) {
        var controller = this;
        controller.state = null;
        controller.API = null;
        controller.currentVideo = 0;
        controller.videos = [[],[]];

        controller.onPlayerReady = function(API) {
            controller.API = API;
        };

        controller.onCompleteVideo = function() {
            controller.isCompleted = true;

            controller.currentVideo++;

            if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;

            controller.setVideo(controller.currentVideo);
        };

        $http.get("current.json").then(function (response) {


            for (var i=0, l=response.data.length; i<l; i++) {

                for (var mi=0, ml=response.data[i].length; mi<ml; mi++) {

                    var mediaFile = {
                        src: $sce.trustAsResourceUrl(response.data[i][mi].src), type: response.data[i][mi].type
                    };

                    controller.videos[i].push(mediaFile);

                }
            }

        });


        /*controller.videos = [
         {
         sources: [
         {src: ("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
         {src: ("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
         {src: ("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
         ]
         },
         {
         sources: [
         {src: ("http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov"), type: "video/mp4"},
         {src: ("http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg"), type: "video/ogg"}
         ]
         }

         ];*/

        controller.config = {
            preload: "none",
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false,
            sources: controller.videos[0],
            theme: {
                url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
            },
            plugins: {
                poster: "http://www.videogular.com/assets/images/videogular.png"
            }
        };

        controller.setVideo = function(index) {
            controller.API.stop();
            controller.currentVideo = index;
            controller.config.sources = controller.videos[index];
            $timeout(controller.API.play.bind(controller.API), 100);
        };
    }]
);
