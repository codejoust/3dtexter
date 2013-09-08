$(document).ready( function() {
			
            $('.demo').each( function() {
                //
                // Dear reader, it's actually very easy to initialize MiniColors. For example:
                //
                //  $(selector).minicolors();
                //
                // The way I've done it below is just for the demo, so don't get confused 
                // by it. Also, data- attributes aren't supported at this time. Again, 
                // they're only used for the purposes of this demo.
                //
				$(this).minicolors({
					control: $(this).attr('data-control') || 'hue',
					defaultValue: $(this).attr('data-defaultValue') || '',
					inline: $(this).attr('data-inline') === 'true',
					letterCase: $(this).attr('data-letterCase') || 'lowercase',
					opacity: $(this).attr('data-opacity'),
					position: $(this).attr('data-position') || 'bottom left',
					change: function(hex, opacity) {
						var log;
            var div_element = $(this).parents('.form-group');
						try {
							log = hex ? hex : 'transparent';
							if( opacity ) log += ', ' + opacity;
              div_element.css('background-color', log);
						} catch(e) {}
					},
					theme: 'default'
				});
                
            });
   $('#render').click(function() {
        $('#progressbar').append('<div class="progress-label">Loading...</div>');

            var progressbar = $( "#progressbar" ),
      progressLabel = $( ".progress-label" );

    
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
 
      progressbar.progressbar( "value", val + 1 );
 
      if ( val < 99 ) {
        setTimeout( progress, 100 );
      }
    }
 
    setTimeout( progress, 3000 );
			
		});
  });
 
    
