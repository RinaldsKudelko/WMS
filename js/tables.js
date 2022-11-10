$(document).ready(function(){
  $(".amp-table").on("mouseenter", ".amp-td", function(){
    $(this).parent(".amp-tr").css("background-color", "#dddddd");
  });
  $(".amp-table").on("mouseleave", ".amp-td", function(){
    $(this).parent(".amp-tr").css("background-color", "rgba(0,0,0,0)");
  
  });
  
  $(".amp-table").on("click", ".amp-td", function(){
    var a = $(this).hasClass("amp-td-sel");
    $(".amp-td").removeClass("amp-td-sel");
    if(a){
      $(this).parent(".amp-tr").children(".amp-td").removeClass("amp-td-sel");
      $("#edit-product").hide()
    }else{
      $(this).parent(".amp-tr").children(".amp-td").addClass("amp-td-sel");
      $("#edit-product").show()
      $("#delete-product").show()
    }  
  });
  
  
});