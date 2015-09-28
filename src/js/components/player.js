var React = require('react');
var Reflux = require('reflux');
var AudioStore = require('../stores/audio');
var LikeStore = require('../stores/like');
// var shell = remote.require('shell');



var AudioPlayer = React.createClass({

  getInitialState: function () {
    var song = localStorage.getItem('currentsong');
    if(AudioStore._dataBeingPlayed) {
      return AudioStore._dataBeingPlayed;
    } else {
      return { paused: true};
    }
  },

  like: function () {
    LikeStore.likeTrack(this.state.id);
  },

  playPause: function (event) {
    var button = $(event.target);
    event.preventDefault();
    window.animiateGooey();
    var stream = AudioStore._audioBeingPlayed;
    if(stream.paused) {
      button.removeClass('fa-pause').addClass('fa-play');
      stream.play();
    } else {
      button.removeClass('fa-play').addClass('fa-pause');
      $(stream).animate({ volume: 0}, { duration: 1250, complete: function () {
        stream.pause();
        stream.volume = 1;
      }});
    }
  },

  componentDidMount: function () {
    var $cover=$(".player-cover")
      ,$bars=$(".player-spectrum-bar")
      ,$spectrum=$(".player-spectrum")

      ,paused= (!AudioStore.currentlyPlaying())

      ,barWidth=$bars.width()
      ,barHeight=$bars.height()

      ,coverPos=$cover.position()
      ,coverSize=$cover.width()
      ,coverCenter=coverPos.left+(coverSize/2)
      ,coverRadius=coverSize/2

      ,spectrumPos=$spectrum.position().top
      ,spectrumMargin=parseFloat($spectrum.css("marginTop"))
    ;

    $.fn.animBar=function(v){
      var $bar=$(this);

      var min=0.5;
      var setV=true
      if(typeof v=="undefined"){
        v=min+(Math.random()*(1-min));
        setV=false;
      }else{
        // v=Math.max(min,v)
      }

      if(v>parseFloat($bar.attr("data-scale")) && v>min){
        TweenMax.to($bar,v*(setV?0.6:0.2),{
          scaleY:v,
          attr:{
            "data-scale":v
          },
          ease:Quad.easeOut,
          onComplete:function(){
            TweenMax.to($bar,v*0.6,{
              scaleY:0.1,
              attr:{
                "data-scale":0.1
              },
              ease:Quad.easeIn,
              onComplete:function(){
                $bar.animBar(v*0.5)
              }
            });
          },
          onUpdate:function(){
          }
        });

      }
      if(!setV && !paused){
        setTimeout(function(){
          $bar.animBar()
        },Math.random()*500);
      }
    }
    function start() {
      $bars.each(function(){
        var $cur=$(this);
        $cur.attr("data-scale",0.5);
        TweenMax.set($cur,{
          scaleY:0
        });
        $cur.animBar();
      })
    }

    start();

    window.animiateGooey = function() {
      paused=!paused;
      if(!paused) {
        start();
      }
    };
  },

  render: function () {
    return (
      <div className="main-container">
        <div className="content">
        <div className="player">
          <div className="player-info">
            <div className="player-info-text">
              <h2 className="player-song-name">{this.state.title || "N/A"}</h2>
              <h3 className="player-artist">{this.state.user.username || "N/A"}</h3>
            </div>
            <div className="player-cover">
              <img src={this.state.artwork_url || "assets/default.jpg"}
                width="300"/>
            </div>
          </div>
          <div className="player-spectrum">
            <div className="player-spectrum-bars">
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
              <div className="player-spectrum-bar"></div>
            </div>
          </div>
          <div className="player-controls">
            <div className="player-buttons">
              <button className="player-button">
                <i className="fa fa-bars"></i>
              </button>
              <button className="player-button" onClick={this.like}>
                <i className="fa fa-heart"></i>
              </button>
              <button className="player-button play-pause-button" onClick= {this.playPause}>
                <i className="fa fa-pause"></i>
              </button>
              <button className="player-button">
                <i className="fa fa-step-forward"></i>
              </button>
            </div>
            <div className="player-slider"></div>
          </div>
        </div>
      </div>
    </div>
    );
  }
});
module.exports = AudioPlayer;
