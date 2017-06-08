rotate = function(images){
 jQuery(function(){
   jQuery.each(images, function(i,v){
     jQuery('.rotatebox .images').append('<img src="' + v + '" data-nth="' + i + '" />');
    });
   jQuery('.rotatebox .images img').css('z-index', '1');
   jQuery('.rotatebox .images img').first().css('z-index', '2');
   jQuery('.rotatebox .slider').slider({
      min: 0,
      max: (images.length * 2) - 1,
      value: 0,
      slide: function(evt, ui){
        target = ui.value % images.length;
       jQuery('.rotatebox .images img').css('z-index', '1');
       jQuery('.rotatebox .images img[data-nth=' + target + ']').css('z-index', '2');
      },
    });
  });
};
