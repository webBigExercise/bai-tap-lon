
/*close modal*/
var modal = document.getElementById('modal-wrapper');
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

/*blur when hover*/
$(document).ready(function(){
            	$('.c1').hover(function(){
            		$('.c1 img').toggleClass('blur');
            	});
                $('.c2').hover(function(){
            		$('.c2 img').toggleClass('blur');
            	});
                $('.c3').hover(function(){
            		$('.c3 img').toggleClass('blur');
            	});
                // $('.col-md-2 button').on("click", function(){
                //     $('.top-div').toggleClass('blur');
                //     $('.container-fluid').toggleClass('blur');
                // })
                $('.bttt').click(function(){
                    $(".modal").fadeIn(600);
                })
            });

jQuery(document).ready(function(){
    $(".top-div h3").fadeIn(1500);
	$(".image").fadeIn(3000);
  });
