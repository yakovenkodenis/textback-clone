// for mobile burger menu icon

(function($) {
    'use strict';
    $(function() {
      $('[data-toggle="offcanvas"]').on("click", function() {
        console.log('OFF CANVAS SCRIPT!');
        $('.sidebar-offcanvas').toggleClass('active')
      });
    });
  })(jQuery);
  