jQuery(document).ready(function($){var last;$('.menuouter a[rel]').mouseenter(function(e){var rel=$(this).attr('rel');var target=this;lastButton=$(this);var parent_menu_level=$($(target).parents('div[menu_level]')).attr('menu_level');$('div[menu_level]').each(function(index,element){var menu_level=$(this).attr('menu_level');var thisRel=$(this).attr('rel');if(menu_level>parent_menu_level&&this.id!=rel){if($(this).is(":visible")){$(this).slideUp({duration:500});}}});var currDataId=$(target).attr('data-id');if(currDataId=='menu1'){$(document).find('[data-id=menu2]').removeClass('active');$(document).find('[data-id=menu3]').removeClass('active');}if(currDataId=='menu2'){$(document).find('[data-id=menu2]').removeClass('active');$(document).find('[data-id=menu3]').removeClass('active');}if(currDataId=='menu3'){$(document).find('[data-id=menu3]').removeClass('active');}$(document).find('[data-id='+currDataId+']').removeClass('active');var visible=$("#"+rel).slideToggle('fast').is(":visible");if(visible){if($(target).attr('id')==$(last).attr('id')){$(document).find('[data-id=menu3]').removeClass('active');last='';}else{$(target).addClass("active");last=$(target);}}else{}});jQuery(".menuouter").mouseleave(function(e){$(".menurowsecond, .graybar").slideUp("slow");$(".topheader .menurow a").removeClass("active");});});jQuery(document).ready(function(){var owl=jQuery("#motercycle");owl.owlCarousel({itemsCustom:[[0,1],[450,1],[600,1],[700,2],[1000,5],[1200,5],[1400,5],[1600,5]],navigation:true});});jQuery(document).ready(function(){var owl=jQuery("#scooter");owl.owlCarousel({itemsCustom:[[0,1],[450,1],[600,1],[700,2],[1000,5],[1200,5],[1400,5],[1600,5]],navigation:true});});jQuery(document).ready(function(){var owl=jQuery("#superbike");owl.owlCarousel({itemsCustom:[[0,1],[450,1],[600,1],[700,2],[1000,5],[1200,5],[1400,5],[1600,5]],navigation:true});});jQuery(document).ready(function(){var owl=jQuery("#navi");owl.owlCarousel({itemsCustom:[[0,1],[450,1],[600,1],[700,1],[1000,1],[1200,1],[1400,1],[1600,1]],navigation:true});});jQuery(document).ready(function(){jQuery('.morediv').hide();jQuery('.btn2').hover(function(){if(!jQuery(this).hasClass('hoverd')){jQuery(this).addClass('hoverd')
jQuery('.morediv').show();jQuery('#removeadd-btn').addClass('aaa')
jQuery('html, body').animate({ scrollTop: jQuery(document).height() });
}
}, function () { jQuery(this).removeClass('hoverd') });
}); jQuery(document).on("click", function () { jQuery(".morediv").hide(); jQuery('#removeadd-btn').removeClass('aaa') }); var selectIds = jQuery('#panel1,#panel2,#panel3'); jQuery(function ($) { selectIds.on('show.bs.collapse hidden.bs.collapse', function () { jQuery(this).prev().find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus'); }) }); jQuery('#video').on('click', function () { jQuery(this).html('<iframe width="560" height="315" src="https://www.youtube.com/embed/gPZgwKo_zqI?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>').css('background', 'none'); }); if (typeof Object.create !== "function") { Object.create = function (e) { function t() { } t.prototype = e; return new t } } (function (e, t, n, r) { var i = { init: function (t, n) { var r = this; r.elem = n; r.$elem = e(n); r.newsTagName = r.$elem.find(":first-child").prop("tagName"); r.newsClassName = r.$elem.find(":first-child").attr("class"); r.timer = null; r.resizeTimer = null; r.animationStarted = false; r.isHovered = false; if (typeof t === "string") { if (console) { console.error("String property override is not supported") } throw "String property override is not supported" } else { r.options = e.extend({}, e.fn.bootstrapNews.options, t); r.prepareLayout(); if (r.options.autoplay) { r.animate() } if (r.options.navigation) { r.buildNavigation() } if (typeof r.options.onToDo === "function") { r.options.onToDo.apply(r, arguments) } } }, prepareLayout: function () { var n = this; e(n.elem).find("." + n.newsClassName).on("mouseenter", function () { n.onReset(true) }); e(n.elem).find("." + n.newsClassName).on("mouseout", function () { n.onReset(false) }); e.map(n.$elem.find(n.newsTagName), function (t, r) { if (r > n.options.newsPerPage - 1) { e(t).hide() } else { e(t).show() } }); if (n.$elem.find(n.newsTagName).length < n.options.newsPerPage) { n.options.newsPerPage = n.$elem.find(n.newsTagName).length } var r = 0; e.map(n.$elem.find(n.newsTagName), function (t, i) { if (i < n.options.newsPerPage) { r = parseInt(r) + parseInt(e(t).height()) + 10 } }); e(n.elem).css({ "overflow-y": "hidden", height: r }); e(t).resize(function () { if (n.resizeTimer !== null) { clearTimeout(n.resizeTimer) } n.resizeTimer = setTimeout(function () { n.prepareLayout() }, 200) }) }, findPanelObject: function () { var e = this.$elem; while (e.parent() !== r) { e = e.parent(); if (e.parent().hasClass("panel")) { return e.parent() } } return r }, buildNavigation: function () { var t = this.findPanelObject(); if (t) { var n = '<ul class="pagination pull-right" style="margin: 0px;">' + '<li><a href="#" class="prev"><span class="glyphicon glyphicon-chevron-down"></span></a></li>' + '<li><a href="#" class="next"><span class="glyphicon glyphicon-chevron-up"></span></a></li>' + '</ul><div class="clearfix"></div>'; var r = e(t).find(".panel-footer")[0]; if (r) { e(r).append(n) } else { e(t).append('<div class="panel-footer">' + n + "</div>") } var i = this; e(t).find(".prev").on("click", function (e) { e.preventDefault(); i.onPrev() }); e(t).find(".next").on("click", function (e) { e.preventDefault(); i.onNext() }) } }, onStop: function () { }, onPause: function () { var e = this; e.isHovered = true; if (this.options.autoplay && e.timer) { clearTimeout(e.timer) } }, onReset: function (e) { var t = this; if (t.timer) { clearTimeout(t.timer) } if (t.options.autoplay) { t.isHovered = e; t.animate() } }, animate: function () { var e = this; e.timer = setTimeout(function () { if (!e.options.pauseOnHover) { e.isHovered = false } if (!e.isHovered) { if (e.options.direction === "up") { e.onNext() } else { e.onPrev() } } }, e.options.newsTickerInterval) }, onPrev: function () { var t = this; if (t.animationStarted) { return false } t.animationStarted = true; var n = "<" + t.newsTagName + ' style="display:none;" class="' + t.newsClassName + '">' + e(t.$elem).find(t.newsTagName).last().html() + "</" + t.newsTagName + ">"; e(t.$elem).prepend(n); e(t.$elem).find(t.newsTagName).first().slideDown(t.options.animationSpeed, function () { e(t.$elem).find(t.newsTagName).last().remove() }); e(t.$elem).find(t.newsTagName + ":nth-child(" + parseInt(t.options.newsPerPage + 1) + ")").slideUp(t.options.animationSpeed, function () { t.animationStarted = false; t.onReset(t.isHovered) }); e(t.elem).find("." + t.newsClassName).on("mouseenter", function () { t.onReset(true) }); e(t.elem).find("." + t.newsClassName).on("mouseout", function () { t.onReset(false) }) }, onNext: function () { var t = this; if (t.animationStarted) { return false } t.animationStarted = true; var n = "<" + t.newsTagName + ' style="display:none;" class=' + t.newsClassName + ">" + e(t.$elem).find(t.newsTagName).first().html() + "</" + t.newsTagName + ">"; e(t.$elem).append(n); e(t.$elem).find(t.newsTagName).first().slideUp(t.options.animationSpeed, function () { e(this).remove() }); e(t.$elem).find(t.newsTagName + ":nth-child(" + parseInt(t.options.newsPerPage + 1) + ")").slideDown(t.options.animationSpeed, function () { t.animationStarted = false; t.onReset(t.isHovered) }); e(t.elem).find("." + t.newsClassName).on("mouseenter", function () { t.onReset(true) }); e(t.elem).find("." + t.newsClassName).on("mouseout", function () { t.onReset(false) }) } }; e.fn.bootstrapNews = function (e) { return this.each(function () { var t = Object.create(i); t.init(e, this) }) }; e.fn.bootstrapNews.options = { newsPerPage: 4, navigation: true, autoplay: true, direction: "up", animationSpeed: "normal", newsTickerInterval: 4e3, pauseOnHover: true, onStop: null, onPause: null, onReset: null, onPrev: null, onNext: null, onToDo: null } })(jQuery, window, document)
jQuery(function(){jQuery(".demo1").bootstrapNews({newsPerPage:3,autoplay:true,pauseOnHover:true,direction:'up',newsTickerInterval:4000,onToDo:function(){}});});jQuery(document).ready(function(ev){jQuery('#Accessories').on('slide.bs.carousel',function(evt){jQuery('#Accessories .controls li.active').removeClass('active');jQuery('#Accessories .controls li:eq('+jQuery(evt.relatedTarget).index()+')').addClass('active');});});jQuery(document).ready(function(ev){jQuery('#Gallery').on('slide.bs.carousel',function(evt){jQuery('#Gallery .controls li.active').removeClass('active');jQuery('#Gallery .controls li:eq('+jQuery(evt.relatedTarget).index()+')').addClass('active');});});jQuery(".accordion dd").on("mouseenter","a:eq(0)",function(event){var dd_parent=jQuery(this).parent();if(dd_parent.hasClass('active'))jQuery(".accordion dd div.content:visible").slideDown("normal");else{jQuery(".accordion dd div.content:visible").slideUp("normal");jQuery(this).parent().find(".content").slideToggle("normal");}});jQuery(function(){jQuery('#myTab a:first').tab('show')});(function(){var template={open:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><circle id="graph" r="15.9154943092" cx="16" cy="16" transform="rotate(-90 16 16)" /><mask id="clip"><use xlink:href="#graph" fill="#FFF" /></mask></defs><g class="graph" mask="url(#clip)" stroke-width="32">',piece:'<use class="graph__percent graph__percent--{{num}}" xlink:href="#graph" fill="none" stroke="{{color}}" stroke-dasharray="0 {{offset}} {{percent}} 100" />',close:'</g></svg>'};var regex={number:/([0-9]+)$/i,color:/(#[0-9A-Z]+)/i};function Piece(data){data=data.trim();this.number=parseInt(data.match(regex.number));this.color=data.match(regex.color)[1];}Piece.prototype.render=function(total,num){return template.piece.replace('{{num}}',num).replace('{{color}}',this.color).replace('{{offset}}',(this.offset/total)*100).replace('{{percent}}',(this.number/total)*100);}
function Pie(elem){this.data=elem.getAttribute('data-pie').split(',');this.pieces=[];this.total=0;var output="",len=this.data.length,piece,i;for(i=0;i<len;i++){piece=new Piece(this.data[i]);piece.offset=this.total;this.total+=piece.number;this.pieces.push(piece);}len=this.pieces.length;for(i=0;i<len;i++){output+=this.pieces[i].render(this.total,i);}elem.innerHTML=template.open+output+template.close;}var pies=document.querySelectorAll('[data-pie]');for(i=0;i<pies.length;i++){new Pie(pies[i]);}}());jQuery(document).ready(function(ev){jQuery('.engine').css('margin-left','700px');jQuery('.transmission').css('margin-left','700px');jQuery('.tyres-brakes').css('margin-left','700px');jQuery('.frame-suspension').css('margin-left','700px');jQuery('.electricals').css('margin-left','700px');jQuery('.CHASSIS').css('margin-left','700px');jQuery('.SUSPENSION').css('margin-left','700px');jQuery('.WHEELS').css('margin-left','700px');jQuery('.BRAKES').css('margin-left','700px');jQuery('.INSTRUMENTS').css('margin-left','700px');jQuery('.specificationsLi a').hover(function(){jQuery('.specificationsLi a').removeClass('specifications-active')
jQuery(this).addClass('specifications-active');var ab=jQuery(this).attr('name');jQuery('.part-'+ab).css({"margin-left":"0px"},"5000").stop().siblings("div").css({"margin-left":"700px"},"5000");});});jQuery(document).ready(function(ev){jQuery('.handle-bar-weights').hide();jQuery('.stylish-meter-console').hide();jQuery('.d3').hide();jQuery('.viscous-air-filter').hide();jQuery('.superior-performance').hide();jQuery('.gear-shift').hide();jQuery('.mono-suspension').hide();jQuery('.alloy-wheels').hide();jQuery('.premium-front').hide();jQuery('.Racing-Muffler').hide();jQuery('.PGM-FI').hide();jQuery('.Comfortable-Siting').hide();jQuery('.PGM-FI').hide();jQuery('.C-ABS').hide();jQuery('.Liquid-Cooled').hide();jQuery('.feature-li').hover(function(){jQuery('.feature-li').removeClass('feature-active')
jQuery(this).addClass('feature-active');var ab=jQuery(this).attr('name');jQuery('.part-'+ab).show().siblings(".aaa").hide();});});jQuery(document).ready(function(){jQuery('.ashu-1').slideUp();jQuery('.ashu-2').slideUp();jQuery('.ashu-3').slideUp();jQuery('.ashu-4').slideUp();jQuery('.ashu-5').slideUp();jQuery('.ashu-6').slideUp();jQuery('.ashu-7').slideUp();jQuery('.ashu-8').slideUp();jQuery('.ashu-9').slideUp();jQuery('.ashu-10').slideUp();jQuery('.ashu-11').slideUp();jQuery('.ppp').click(function(){var at=jQuery(this).attr('name');jQuery('.accessories-popup-sec img.accessories-images-hide, .accessories-popup-left, .accessories-popup-right').css('visibility','hidden');jQuery('.ashu-'+at).slideDown();});jQuery('.cxx').click(function(){var att=jQuery(this).attr('name');jQuery('.ashu-'+att).slideUp();jQuery('.accessories-popup-sec img.accessories-images-hide, .accessories-popup-left, .accessories-popup-right').css('visibility','visible');});});jQuery(document).ready(function(){function close_accordion_section(){jQuery('.accordion .accordion-section-title').removeClass('active');jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');}jQuery('.accordion-section-title').click(function(e){var currentAttrValue=jQuery(this).attr('href');if(jQuery(e.target).is('.active')){close_accordion_section();}else{close_accordion_section();jQuery(this).addClass('active');jQuery('.accordion '+currentAttrValue).slideDown(300).addClass('open');}e.preventDefault();});});jQuery(document).ready(function(){jQuery('#Accessories').carousel({interval:false,pause:null,wrap:false});var i;jQuery('li[data-target="#Accessories"]').on("mouseover",function(){jQuery('#Accessories').carousel('pause');var control=jQuery(this),interval=100;i=setInterval(function(){control.trigger("click");},interval);}).on("mouseout",function(){jQuery('#Accessories').carousel('pause');clearInterval(i);});});