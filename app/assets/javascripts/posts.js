var tweenObjNum = 3;

var setTextData = function(element) {

	var success = function(result) {

		if (result.text) {

			element.innerHTML = result.text
			animateElement(element);

		}

	}
	
	var options = {
		type: 'get',
		url: 'posts/1',
		success: success,
	}

	$.ajax(options);
}

var setStyle = function(element) {

	var families = ['Arial', 'times', 'comic sans ms', 'trebuchet ms', 'verdana', 'courier new'];
	var colors = ['#D8DBFF', '#D8EFFF', '#FFDCF6', '#FFEDF4', '#FFF7DD', '#F0FFD1'];

	var fontSize = (Math.random()*20)+5;
	var fontFamily = families[Math.floor(Math.random()*(families.length))];
	var color = colors[Math.floor(Math.random()*(colors.length))];

	element.style = {};
	element.style.fontWeight = 'bold';
	element.style.fontSize = fontSize;
	element.style.fontFamily = fontFamily;
	element.style.color = color;

	return element;
}

var createElement = function() {

	var element = document.createElement('p');

	element = setStyle(element);

	document.body.appendChild(element);
	return element;

}

var removeElement = function(element) {
	document.body.removeChild(element);
}

var animateElement = function(element) {

	var complete = function() {
		console.log(this.vars);
		setTextData(setStyle(element));
	};

	var explode = function() {

		//var from = {top: $('#header').css('height'), scaleX: 1, scaleY: 1, autoAlpha: 1};
		var from = {top: this.top, scaleX: 1, scaleY: 1, autoAlpha: 1};
		var to = {scaleX: 7, scaleY: 7, autoAlpha: 0, onComplete: complete};
		
		var options = {
			duration: 0.7,
			from: from,
			to: to
		};

		TweenMax.fromTo(element, options.duration, options.from, options.to);

	};

	var left = window.innerWidth * 0.7;

	var from = {top: window.innerHeight, left: left - (Math.random() * left), scaleX: 1, scaleY: 1, autoAlpha: 1};

	var contentHeight = window.innerHeight - (parseInt($('#header').css('height')) + 40);

	var to = {top: contentHeight - Math.random() * contentHeight, onComplete: explode, scaleX: 1, scaleY: 1, autoAlpha: 1};
	console.log(window.innerHeight);

	var options = {
		duration: (Math.random()*3) + 3,
		from: from,
		to: to
	};

	TweenMax.fromTo(element, options.duration, options.from, options.to);

}

//append result with animation
var onload = function() {

	var i = 0;
	while (i++ < tweenObjNum) {
		var element = createElement();
		setTextData(element);
	}

	$('#form-input').unbind('click').bind('click', function(e) {

		e.preventDefault();

		if ($('form#new_post').is(':visible')) {

			$('form#new_post').fadeOut('fast', function() {
				$('form#new_post textarea').focusout();
			});

		} else {

			$('form#new_post').fadeIn('fast');
			$('form#new_post textarea').focus();

		}

	});

	$('form#new_post').on('ajax:complete', function(xhr, status) {

		if (status.responseJSON.result == true) {

			$('#post_text').removeClass('invalid');
			$('#post-message')
						.removeClass('invalid').addClass('valid')
						.text('Your message has been sent!');

			setTimeout(function(){

				$('form#new_post').fadeOut('fast', function(){
					
					//rest contents inside box
					$('#post_text').val('');
					$('#post-message').text('');

				});

			}, 1000);

		} else {

			//inform invalid input
			$('#post_text').addClass('invalid');
			$('#post-message').removeClass('valid').addClass('invalid')
					.text(status.responseJSON.message);

		}

	});
}

$(onload);

