// for mobile burger menu icon

(function($) {
    'use strict';
    $(function() {
      $('[data-toggle="offcanvas"]').on("click", function() {
        $('.sidebar-offcanvas').toggleClass('active')
      });
    });
  })(jQuery);
  