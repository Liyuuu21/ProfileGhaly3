(function($) {
  "use strict";
  $(document).ready(function() {
    if (typeof Swiper === "undefined") return; // CDN tidak termuat (offline)
    new Swiper(".main-swiper", {
      speed: 500,
      navigation: { nextEl: "#billboard .swiper-arrow-next", prevEl: "#billboard .swiper-arrow-prev" },
    });
    new Swiper(".testimonial-swiper", {
      loop: true,
      navigation: { nextEl: ".review-content .swiper-arrow-next", prevEl: ".review-content .swiper-arrow-prev" },
    });
  });
})(jQuery);
