casper.options.logLevel = "debug";
casper.options.verbose  = true;

casper.start( 'http://www.cwinters.com/testing/casper_ajax_call.html' );

casper.then( function() {
    this.viewport( 800, 600 );
    this.test.assertEquals( this.getTitle(), 'CasperJS testing: AJAX results', 'Page title' );
    this.capture( 'ajax_1_before_click.png' );

    this.click( '#generate_list' );

    this.waitUntilVisible( '#wishlist', function() {
        this.capture( 'ajax_2_after_visible.png' );
        var headerText = this.evaluate( function() { return $( '#wishlist p' ).text(); } );
        this.test.assertMatch( headerText, /Chris 2011/, 'Header content' );
        this.test.assertEvalEquals( function() { 
            return $( '#wishlist ul li' ).length; 
        }, 3, 'Wish list count' );
      },
      function() {
        console.log( "Timeout hit on waiting for new DOM item." );
      });
});

casper.run( function() {
    this.test.done();
});