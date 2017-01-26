var main = function()
{
	// Add smooth scrolling to all links in navbar + footer link
	$(".navbar a, footer a[href='#myPage']").on('click', function(event) {
		// Prevent default anchor click behavior
		event.preventDefault();

		// Store hash
		var hash = this.hash;

		// Using jQuery's animate() method to add smooth page scroll
		// The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 900, function(){

			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		});
	});
	// university dropdown
	var sec = $('#bt1');
	$('#bt1').click(function(){
		sec.dropdown();
		$('#dd1 li').click(function(){
			var li = $(this);
			var text = li.text();
			sec.html(text+' <span class="caret"></span>');
		});
	});
	// faculty dropdown
	var sec2 = $('#bt2');
	$('#bt2').click(function(){
		sec2.dropdown();
		$('#dd2 li').click(function(){
			var li = $(this);
			var text = li.text();
			sec2.html(text+' <span class="caret"></span>');
		});
	});
	// button graphics
	$(".button-fill").hover(function () {
		$(this).children(".button-inside").addClass('full');
	}, function() {
		$(this).children(".button-inside").removeClass('full');
	});
	// image fade in
	$('img').fadeIn(1000);
}
$(document).ready(main);
