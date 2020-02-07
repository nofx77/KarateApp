// Arketype Object
if (!window.ark) window.ark = {};




/* !-- Attaches the global page load event handler -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
document.addEventListener("DOMContentLoaded", function() {
	
		
	ark.filters();
		
	ark.controls();
	
	
});


/* !-- Filters -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
ark.filters = function() {
	
	$("#filters input").change(function() {
        
        var type 	= $(this).data("type");
        var filter 	= $(this).data("filter");
        
        //On Check show controls buttons
        $(".controls .actions").css("display","flex");
        
        
        //IF ITEM IS CHECK
        if($(this).is(":checked")) {
        	
        	$("#stock div").each(function(i) {
        		if($(this).data("type") == type && $(this).data("belt") == filter) {

	        		$("#randomizer").append($(this).clone());

        		}
        	});
        
        //IF ITEM IS UNCHECK
        } else {
	        	        
	        $("#randomizer div").each(function(i) {
        		
        		if($(this).data("type") == type && $(this).data("belt") == filter) {
	        		
	        		
	        		if($("#randomizer").hasClass("slick-initialized")) {
	        			$("#randomizer").slick("unslick");
	        		}
	        		
	        		$(this).remove();
	        		
	        		
        		}
        	});
        	
        	if(!$("#filters input:checked").length) {
		       $(".controls .actions").hide();
	        }
			
        } 
        
        
        var items	= $("#randomizer div").length;
        
        if(items == 0 ) {
	    	$("#items").text("Aucun item sélectionné")
        } else {
	       $("#items").text(items + " items sélectionnés")  
        }
         
          
    });
	
};




/* !-- Controls -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
ark.controls = function() {
	
	$("#start").click(function() {
		
		if(!$("#randomizer").hasClass("slick-initialized")) {
			
			$(".wrapper-randomizer").addClass("init");
			
			$("#randomizer div").shuffle();
			
			var __speed 	= $("#randomizer div").first().data("time");
			var videoLink 	= $("#randomizer div").first().data("link");
			var startTime	= $("#randomizer div").first().data("start");
			
			if(videoLink != null) {
				$("#videolink").fadeIn();
				$("#videolink").attr({
				    href:videoLink, 
				    "data-start":startTime
				});
			} else {
				$("#videolink").fadeOut();
			}	
			
			//START TIMER
			$('#timer').timer({
			    countdown: true,
				duration: millisToMinutesAndSeconds(__speed),
				callback: function() {
					$("#timer").timer('remove');
				}
			});
			
			//INIT CAROUSEL
			ark.carousel();
			
			//HIDE Start button
			$("#start").hide();
			
			//SHOW STOP BUTTON
			$("#end").show();
			
			//DISABLING CHECKBOX
			$('input').attr('disabled', true);
			
			$("html, body").animate({ scrollTop: 0 }, "slow");
			
			return false
					
		}
		
	});
	
	$("#end").click(function() {
        
        //STOP CAROUSEL AND EMPTY
    	$("#randomizer").slick("unslick").empty();
		
		//SHOW START BUTTON
		$("#start").show();
		
		//CLEAR TIMER
		$("#timer").timer('remove').empty();
		
		//HIDE VIDEO BUTTON
		$('#videolink').fadeOut();
		
		//UNCHECK ALL CHECKBOX
		var	$checkbox = $(':checkbox');
			$checkbox.prop('checked', false);
		
		//HIDE START AND END BUTTON
		$(".controls .actions").hide();
		 
		$("#selectall").text("Tout sélectionner");
		 
		$('input').attr('disabled', false);
		 
		$(this).hide();
		 
		 $("#items").text("Aucun item sélectionné")
		 
		 return false

	});
	
	$("#videolink").click(function() {
		
		var link = $(this);
		var time = $("#videolink").data("start");
		
		$.fancybox.open({
				src  : link.attr("href")
			},{
	        padding : 0,
	        width : 640,
	        openEffect  : 'elastic',
	        closeClickOutside : true,
	        beforeLoad : function() {	            
	            $("#randomizer").slick('slickPause'); 
	            $('#timer').timer('pause');
	        },
	        afterClose : function() {
		        $("#randomizer").slick('slickPlay');
		        $('#timer').timer('resume');
		        $("#videolink").removeData("start");
	        }, 
	        touch : false,
	        youtube : {
	            start: parseInt(time)
			}
	    });
	    
	    return false;
	});
	
};



/* !-- Carousel -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
ark.carousel = function() {

	var slider 		= $("#randomizer");
	var __speed 	= $("#randomizer div").first().data("time");
	var isPause 	= false;
	
	slider.slick({
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		autoplay: true,
		autoplaySpeed: __speed,
		cssEase: 'linear',
		arrows: false,
		swipe: true
	})
	.on("init", function(e, slick) {

		slideTime = $('div[data-slick-index="'+ slick.currentSlide + '"]').data("time");
		
		slider.slick("setOption", "autoplaySpeed", slideTime);
		
	})
	.on("afterChange", function(e, slick) {
	    
	    slideTime = $('div[data-slick-index="'+ slick.currentSlide + '"]').data("time");
	    videoLink = $('div[data-slick-index="'+ slick.currentSlide + '"]').data("link");
	    startTime = $('div[data-slick-index="'+ slick.currentSlide + '"]').data("start");
		
		if(videoLink != null) {
			$("#videolink").fadeIn();
			$("#videolink").attr({
			    href:videoLink, 
			    "data-start":startTime
			});
		} else {
			$("#videolink").fadeOut();
		}
	    
	    slider.slick("setOption", "autoplaySpeed", slideTime);
	    
	    $("#timer").timer('remove');
	    
	    $('#timer').timer({
	        countdown: true,
			duration: millisToMinutesAndSeconds(slideTime),
			callback: function() {
				$("#timer").timer('remove');
			}
		});
	});
	
	$(document).on('keydown', function(e) {
				
		//HITS LEFT ARROWS
        if(e.keyCode == 37) {
            slider.slick('slickPrev');
        }
        
        //HITS RIGHT ARROWS
        if(e.keyCode == 39) {
            slider.slick('slickNext');
        }
        
        //HITS SPACE BAR
        if(e.keyCode == 32) {
            
            if(isPause == false) {

            	slider.slick('slickPause');
            	$('#timer').timer('pause');
            	isPause = true;
            	
            } else {

                slider.slick('slickPlay');
                $('#timer').timer('resume'); 
                isPause = false;
            }
        }
        
        return false;
    });
	
};





/* !-- FUNCTION to convert milliseconds in MM:SS -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + "m" + (seconds < 10 ? '0' : '') + seconds + "s";
}


(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);