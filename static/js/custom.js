

(function($) {
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        $(".header").removeClass("pageDown");
        if (scroll > 0) {
            $(".header").addClass("pageDown");
        }
    });
})(jQuery);