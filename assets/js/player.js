$(document).ready(function(){
	var $cover=$(".player-cover")
		,$bars=$(".player-spectrum-bar")
		,$spectrum=$(".player-spectrum")

		,paused=false

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

		var min=0.1;
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

	$(".play-pause-button").click(function(){
		paused=!paused;
		if(!paused) {
			start();
		}
	})
})
