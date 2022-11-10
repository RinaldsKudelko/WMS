$(document).ready(function(){
  $("#edit-product").hide()
  $("#delete-product").hide()
  $("#confirm-edit-product").hide()
  $("#cancel-edit-product").hide()

  $("#edit-product").on("click", function(){
    $("#overlay-edit").show()
    $("#confirm-edit-product").show()
    $("#cancel-edit-product").show()
    $("#edit-product").hide()
    $("#delete-product").hide()
    var a = $(".amp-td-sel").siblings("#edit-code").text()
    var x = $(".amp-td-sel").siblings("#edit-cust").text()
    var b = $(".amp-td-sel").siblings("#edit-desc").text()
    var c = $(".amp-td-sel").siblings("#edit-ptype").text()
    
    $("#edit-popup-code-input").text(a)
    $("#edit-popup-cust-input").val(x)
    $("#edit-popup-desc-input").val(b)
    $("#edit-popup-ptype-input").val(c)
  });
  $("#cancel-edit-product").on("click", function(){
    $("#overlay-edit").hide()
    $("#confirm-edit-product").hide()
    $("#cancel-edit-product").hide()
    $("#edit-product").show()
    $("#delete-product").show()
    
  });


  $("#confirm-edit-product").on("click", function(){
    console.log("updating")
    var a = $("#edit-popup-code-input").text()
    console.log("got a")
    var x = $("#edit-popup-cust-input").val()
    console.log("got a")
    var b = $("#edit-popup-desc-input").val()
    console.log("got a")
    var c = $("#edit-popup-ptype-input").val()
    console.log(a,x,b,c)
    function productOBJ(code, cust, desc, ptype) {
      var obj = {
          "code": code,
          "customer": cust,
          "description": desc,
          "pltype": ptype,
      }
      console.log("obj created")
      return obj
    }
    var store = JSON.parse(localStorage.getItem("dbs"));
    
    for(var i = 0; i<store.length; i++){
      if(store[i].code == a){
        console.log(store[i].code, a)
        var theind = store.indexOf(store[i])
        store.splice(theind, 1)
        
      }
    }
    var prd = productOBJ(a, x, b, c);
    store.push(prd);
    var res = JSON.stringify(store);
    localStorage.setItem('dbs',res);
    
    $("#overlay-edit").hide()
    $("#confirm-edit-product").hide()
    $("#cancel-edit-product").hide()
    $("#del-product").find(".am-temp").remove()
    
    for(var i = 0; i<10; i++){
      var markup = "<tr class='amp-tr am-temp'><td class='amp-td' id='edit-code'>"+ store[i].code +"</td><td class='amp-td' id='edit-cust'>"+ store[i].customer +"</td><td class='amp-td' id='edit-desc'>"+ store[i].description +"</td><td class='amp-td' id='edit-ptype'>"+ store[i].pltype +"</td></tr>";
      $("#del-table").append(markup);
    }
  });

  $(".edit-search-bar").on("keyup", function(){
    var inp = $(this).val()
    var store = JSON.parse(localStorage.getItem("dbs"));
    $("#del-product").find(".am-temp").remove()
    for(var i = 0; i<10; i++){
      if(store[i].code.startsWith(inp)){
        var markup = "<tr class='amp-tr am-temp'><td class='amp-td' id='edit-code'>"+ store[i].code +"</td><td class='amp-td' id='edit-cust'>"+ store[i].customer +"</td><td class='amp-td' id='edit-desc'>"+ store[i].description +"</td><td class='amp-td' id='edit-ptype'>"+ store[i].pltype +"</td></tr>";
      $("#del-table").append(markup);
      }
    }
  
  });

  
});