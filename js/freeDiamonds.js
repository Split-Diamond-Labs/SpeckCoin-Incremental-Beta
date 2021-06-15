(function() {
let isworking=false;
let sessionearnings=0;
let worktime=1000;
let lettertotype=countdown="";
let difficulty=1;
$(".work-text").keyup(function(e) {
		kc=e.keyCode;
		if(isworking) {
			if(kc==27) {
				data.game.diamonds[0]+=Math.floor(sessionearnings);
				isworking=false;
				$(".work-paid").html("You got "+sessionearnings+" diamonds, type anything in the textbox to start again.");
				sessionearnings=0;
				$(".work-text").val("");
				$(".work-type").html("(start working first)");
				clearInterval(countdown);
				update();
			}
			else {
				if($(".work-text").val()==lettertotype) {
					difficulty++;
					$(".work-text").val("");
					lettertotype=randomletter(Math.ceil(difficulty/10));
					$(".work-type").html(lettertotype);
					worktime=1000-difficulty*10;
					$(".work-time").html(worktime);
					sessionearnings+=difficulty/10;
				}
			}
		}
		else {
			difficulty=1;
			isworking=true;
			$(".work-text").val("");
			lettertotype=randomletter(1);
			$(".work-type").html(lettertotype);
			worktime=1000;
			$(".work-time").html(worktime);
			countdown=setInterval(function() {
				worktime--;
				$(".work-time").html(worktime);
				if(worktime<=0) {
					isworking=false;
					sessionearnings=0;
					$(".work-paid").html("You got "+sessionearnings+" diamonds, type anything in the textbox to start again.");
					$(".work-text").val("");
					clearInterval(countdown);
					update();
				}
			},1);
		}
	});
	function randomletter(a) {
		output="";
		for (i=0;i<a;i++) {
        		output=output+String.fromCharCode(97 + Math.floor(Math.random() * 26));
		}
		return output;
	}
}
)();
