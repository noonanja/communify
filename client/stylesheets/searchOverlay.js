Template.home.events({
	// 'click #trigger-overlay': function() {
	// 	toggleOverlay();
	// },
	'click .overlay-close': function() {
		toggleOverlay();
	}
});

// Template.home.rendered = function() {
//   $(window).on('keydown', function(e) {
//     if ((e.which == 27) && (Router.current() && (Router.current().path.indexOf('search') > 0))) {
// 	 toggleOverlay();
// 	}
//   });
// };


var toggleOverlay = function() {
	var triggerBttn = document.getElementById('trigger-overlay'),
		overlay = document.querySelector('div.overlay'),
		closeBttn = overlay.querySelector('button.overlay-close');
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ],
		support = {transitions : Modernizr.csstransitions};

	if (classie.has(overlay,'open')) {
				document.body.style.overflow = '';
				classie.remove(overlay, 'open');
				classie.add(overlay, 'close');
				Router.go('/');
				var onEndTransitionFn = function(ev) {
					if (support.transitions) {
						if ( ev.propertyName !== 'visibility' ) return;
						this.removeEventListener( transEndEventName, onEndTransitionFn );
					}
					classie.remove( overlay, 'close' );
				};
				if (support.transitions) {
					overlay.addEventListener(transEndEventName, onEndTransitionFn);
				}
				else {
					onEndTransitionFn();
				}
			}
			else if (!classie.has(overlay,'close')) {
				document.body.style.overflow = 'hidden';
				classie.add(overlay, 'open');
			}
};
