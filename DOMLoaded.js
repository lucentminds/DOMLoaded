/**
 * 08-29-2011
 * Based on a couple of smart atricles I read. Will add them to comments when I find them again.
 * ~~ Scott
 */
(function(window){


 var DOMLoaded = function( callback ) {
	var alreadyrunflag = false; //flag to indicate whether target function has already been run
	var contentloadtag;
	var safariInterval;

	switch( true )
	{
		case /Safari/i.test(navigator.userAgent):
			safariInterval = setInterval(function(){

			if(/loaded|complete/.test(document.readyState)){
				clearInterval( safariInterval );
				callback(); // call target function
			}}, 10)
			break;

		case typeof document.addEventListener != 'undefined':
			document.addEventListener( 'DOMContentLoaded' , function(){
			alreadyrunflag = true;
				callback(); // call target function
			}, false );
			break;

		case ( document.all && !window.opera ):
			// We don't need to wait for the dom to load. We can use "defer" with these browsers.
			document.write( '<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)">\x3C/script>' );

			contentloadtag = document.getElementById( 'contentloadtag' );
			contentloadtag.onreadystatechange = function() {
				if ( contentloadtag.readyState == "complete" ) {
				  alreadyrunflag = true;
				  callback();
				}
			}

		default:
			window.onload = function() {
				setTimeout( function(){
					if (!alreadyrunflag){
						callback();
					}
				}, 0);
			}
	}// /switch()
};// /DOMLoaded()

window['DOMLoaded'] = DOMLoaded;

}(window));