$(".work-text").keyup(function(e) {
		kc=e.keyCode;
		if(isworking) {
			if(kc==27) {
				money+=sessionearnings;
				isworking=false;
				$(".work-paid").html("You got $"+sessionearnings+", type anything in the textbox to start again.");
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
					sessionearnings+=Math.ceil(difficulty/10);
					if(difficulty>=30)achievement(3);
				}
				else if($(".work-text").val()=="gamehelp16 rules") {
					if(achievements[3].achieved) {
						achievement(6);
						worktime=5000;
						$(".work-text").val("");
					}
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
					$(".work-paid").html("You got $"+sessionearnings+", type anything in the textbox to start again.");
					$(".work-text").val("");
					clearInterval(countdown);
					update();
				}
			},1);
		}
	});
