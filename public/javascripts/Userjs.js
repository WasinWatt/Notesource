//var user = require('../../routes/users').name
var main = function(){
  // fade the lastest page out, fade the clicked page in.
  $('#1').click(function(){
    $('.active-page').hide().removeClass('active-page');
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('#page1').fadeIn(600).addClass('active-page');
  });
  $('#2').click(function(){
    $('.active-page').hide().removeClass('active-page');
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('#page2').fadeIn(600).addClass('active-page');
  });
  $('#3').click(function(){
    $('.active-page').hide().removeClass('active-page');
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('#page3').fadeIn(600).addClass('active-page');
  });
  $('#4').click(function(){
    $('.active-page').hide().removeClass('active-page');
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('#page4').fadeIn(600).addClass('active-page');
  });
  // add the text to the comment section after the button is clicked.
  $('#submit').click(function(){
    $("#comment").append('<div><div class="col-sm-2 text-center"><img src="bandmember.jpg" class="img-circle" height="65" width="65" alt="Avatar"></div><div class="col-sm-10"><h4><small>Sep 29, 2015, 9:12 PM</small></h4><p>'+$('#text').val()+'</p><br></div></div>');
    $('#text').val('');
  });
  $(".sidenav a").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    //return false;
  });
  $(".fileid").click(function(){
    $(this).popover('hide');
  });
  $(".fileid").hover(function(){
    $(this).popover('show');
  });
  $('.fileid').mouseleave(function(){
    $(this).popover('hide');
  })
}
$(document).ready(main);
