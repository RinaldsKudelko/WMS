$(document).ready(function(){
  $(".pop-up-container").css("display", "none")
  $(".inner-main-block").css("display", "none")
  
  $("#main-block").on("click", function(){
    $(".pop-up-container").css("display", "none");
    $(".menu-item").css("background-color","#342b46")
  });
  $("#side-settings").on("click", function(){
    $(".menu-item").css("background-color","rgba(0,0,0,0)")
    $(this).css("background-color","#2c253c")
    
    $(".pop-up-container").css("display", "none");
    $("#side-settings-popup").css("display", "block");
  });
  $("#side-goodsin").on("click", function(){
    $(".menu-item").css("background-color","rgba(0,0,0,0)")
    $(this).css("background-color","#2c253c")
    $(".pop-up-container").css("display", "none");
    $("#side-goodsin-popup").css("display", "block");
  });

  $("#aprd").on("click", function(){
    hideall();
    $("#add-product").css("display", "block");
  });
  $("#dprd").on("click", function(){
    hideall();
    
    $("#del-product").css("display", "block");
    $("#del-product").find(".am-temp").remove()
    $("#edit-product").hide()
    $("#delete-product").hide()
    var store = JSON.parse(localStorage.getItem("dbs"));
    for(var i = 0; i<store.length; i++){
      var markup = "<tr class='amp-tr am-temp'><td class='amp-td' id='edit-code'>"+ store[i].code +"</td><td class='amp-td' id='edit-cust'>"+ store[i].customer +"</td><td class='amp-td' id='edit-desc'>"+ store[i].description +"</td><td class='amp-td' id='edit-ptype'>"+ store[i].pltype +"</td></tr>";
      $("#del-table").append(markup);
    }
  });
  $("#amprd").on("click", function(){
    hideall();
    $("#amend-product").css("display", "block");
  });
  $("#usr").on("click", function(){
    hideall();
    $("#users").css("display", "block");
  });
  $("#rpr").on("click", function(){
    hideall();
    $("#reports").css("display", "block");
  });
  $("#loc").on("click", function(){
    hideall();
    $("#locations").css("display", "block");
  });
  $("#create-gi").on("click", function(){
    hideall();
    $("#create-goodsin").css("display", "block");
    $("#gi-table").find(".gi-temp").remove()
    
    var gidata = JSON.parse(localStorage.getItem("gidb"));
    for(var i = 0; i<10; i++){
      var markup = "<tr class='gi-tr gi-temp'><td class='gi-td gi-td-po'>"+ gidata[i].po +"</td><td class='gi-td'>"+ gidata[i].customer +"</td><td class='gi-td'>"+ gidata[i].ref +"</td><td class='gi-td'>"+ gidata[i].status +"</td><td class='gi-td'>"+ gidata[i].pallets +"</td><td class='gi-td'>"+ gidata[i].datec +"</td><td class='gi-td'>"+ gidata[i].dated +"</td></tr>";
      $("#gi-table").append(markup);
      
    }
  });
  
  function hideall(){
    $(".pop-up-container").css("display", "none")
    $(".inner-main-block").css("display", "none")
    
    
  }
});