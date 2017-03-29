
var memory_array = ['A','B','C','D','E','F','G','H'];
var memory_array_L1 = ['A','B','C','D','E','F','G','H','I','J','K','L'];
var memory_array_L2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];
//var memory_array_L1 = ['I','J','K','L'];


function first_lv(){
	document.getElementById("container").style.width="530px";
	output_image(memory_array);
}
function second_lv(){
	document.getElementById("container").style.width="780px";	
	output_image(memory_array_L1);
}
function third_lv(){
	document.getElementById("container").style.width="1050px";
	
	output_image(memory_array_L2);
}
function start_page(){
		
	var start_elements="<div id='float'><img src='image/title.png' alt='MEMORY GAME'/></div><div id='level_button'><h2>Select the Level</h2><p><button class='hvr-grow' onclick='first_lv()'>Level 1</button></p><p><button class='hvr-grow' onclick='second_lv()'>Level 2</button></p><p><button class='hvr-grow' onclick='third_lv()'>Level 3</button></p><div>";
	document.getElementById("container").style.width="530px";
	document.getElementById("container").style.height="560px";
	
	document.getElementById("container").innerHTML = start_elements;
	$("#float").animate({"top": "-=280px"}, "slow");
}


function output_image(array){
    var images = [];
    var guess1 = "";
    var guess2 = "";
    var count = 0;
    var timePassed=0;
    var minutes=0;
    var seconds=0;
	var num_click=0;
    var audioC=document.getElementById("correct");
    var audioW=document.getElementById("wrong");
	var audio_win=document.getElementById("yay");
	audioC.muted= false;
    audioW.muted= false;
    var memory_values=[];
    for (var i = 0; i <array.length; i++) { 
            var img = array[i] + '.png';
            images.push(img);
            images.push(img);
            }

    // get images, place them in an array & randomize the order

    randomizeImages();
    // output images 
    var output = "<p id='time_bar'>Time : <span id='timer'>00:00</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspNo. of Click: <span id='click'></span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class='Switch On'></span></p>"; 
    for (var i = 0; i < images.length; i++) { 
      output += "<li class='card'>";
      output += "<div class='face front'></div>";
      output += "<div class='face back'>";
      output+="<img src = 'image/" + images[i] + "' alt='"+images[i].charAt(0)+"'/>";
      output+="</div>";
      output += "</li>";
    }
    output+="<p><button class='hvr-grow' onclick='start_page()'>Back</button></p>";
    document.getElementById("container").innerHTML = output;

    // randomize array of images
    function randomizeImages(){
        Array.prototype.randomize = function()
        {
            var i = this.length, j, temp;
            while ( --i )
            {
                j = Math.floor( Math.random() * (i - 1) );
                temp = this[i];
                this[i] = this[j];
                this[j] = temp;
            }
        };
        images.randomize();
    }
    timerInit();
    $('.Switch').click(function() {
        $(this).toggleClass('On').toggleClass('Off');
        if($(this).hasClass("Off")){
            audioC.muted = true;
            audioW.muted = true;
        }
        else{
            audioC.muted= false;
            audioW.muted= false;
        }
    });
    $("li").click(function() {
		
        if ( count < 2 &&  ($(this).hasClass("flipped")) === false) {
            count++;
            $(this).addClass('flipped');
			num_click++;
			document.getElementById("click").innerHTML = num_click;
            if (count === 1 ) { 
                guess1 = $(this).find("img").attr("src"); 
            }   

            //guess #2
            else { 
                guess2 = $(this).find("img").attr("src");  

                // since it's the 2nd guess check for match
                if (guess1 === guess2) { 
                    console.log("match");
                    $('li').find("img[src='" + guess2 + "']").addClass("match");
                    audioC.play();
					setTimeout(function() {
                        count=0;
                    }, 1000);

                } 
                  else{
                        console.log("miss");
                        audioW.play();
                        setTimeout(function() {
                            $("img").not(".match").closest("li").removeClass("flipped");
                            count=0;
                        }, 1200);
                    } 
            }
        }
        if ($("img.match").length === $("li").find("img").length) {
            setTimeout(function() {
				document.getElementById("container").style.width="780px";
                document.getElementById("container").innerHTML = "<p id='end'>Well done</p><p id='end' style='font-size: 40px;'>"+minutes+" minutes "+seconds+" seconds used<br/>"+num_click+" clicked</p><p><button id='backBtn' class='hvr-grow' onclick='start_page()'>Back</button></p>";
				document.getElementById("backBtn").disabled = true;
				audio_win.play();
            }, 1000);
			setTimeout(function() {
                document.getElementById("backBtn").disabled=false;

            }, 5000);
        }

    });
    function timerInit() {
            var timer = document.getElementById("timer");
            var timerInterval = setInterval(function(){

                            timePassed++;

                            minutes = Math.floor(timePassed / 60);
                            seconds = timePassed % 60;

                            minutes = minutes < 10 ? "0"+minutes : minutes;
                            seconds = seconds < 10 ? "0"+seconds : seconds;

                            timer.innerHTML = minutes+":"+seconds;

            }, 1000);
    }

}
