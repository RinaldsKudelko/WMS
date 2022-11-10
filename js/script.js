$(document).ready(function(){
  $(".iblock").hide();

  $(".content").hide();
 
  $("#1").on("click", function(){
    $(".iblock").hide();
    $("#i1Block").show();
  });
  $("#2").on("click", function(){
    $(".iblock").hide();
    $("#i2Block").show();
  });
  $("#3").on("click", function(){
    $(".iblock").hide();
    $("#i3Block").show();
  });
  $("#4").on("click", function(){
    $(".iblock").hide();
    $("#i4Block").show();
  });

  
  $(".iblock").on("mouseleave", function(){
    $(".iblock").hide();
  });

  $("#create").on("click", function(){
    $(".content").hide();
    $("#cont1").show();
    $(".iblock").hide();
  });
  $("#amend").on("click", function(){
    $(".content").hide();
    $("#cont2").show();
    $(".iblock").hide();
  });
  
});