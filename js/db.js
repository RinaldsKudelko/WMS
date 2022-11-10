var store = []


function productOBJ(code, cust, desc, ptype) {
    var obj = {
        "code": code,
        "customer": cust,
        "description": desc,
        "pltype": ptype,
    }
    return obj
}

function addprd(code, cust, desc, ptype){
  if(localStorage.getItem("dbs")){
    store = JSON.parse(localStorage.getItem("dbs"));
  }else{
    localStorage.setItem('dbs',[]);
  }
  var prd = productOBJ(code, cust, desc, ptype);
  store.push(prd);
  var res = JSON.stringify(store);
  localStorage.setItem('dbs',res);
}

function delprd(code){
  if(localStorage.getItem("dbs")){
    store = JSON.parse(localStorage.getItem("dbs"));
  }else{
    localStorage.setItem('dbs',[]);
  }
  for(var i = 0; i<store.length; i++){
    if(store[i].code == code){
      var theind = store.indexOf(store[i])
      store.splice(theind, 1)
    }
  }
  
  var res = JSON.stringify(store);
  localStorage.setItem('dbs',res);
}

$(document).ready(function(){
  $("#confirm-add-pallet").on("click", function(){
    var code=$("#addprd-code").val()
    var cust=$("#addprd-cust").val()
    var desc=$("#addprd-desc").val()
    var ptype=$("#addprd-ptype").val()
    addprd(code, cust, desc, ptype)
    $("#addprd-code").val("")
    $("#addprd-cust").val("")
    $("#addprd-desc").val("")
    $("#addprd-ptype").val("")
    $("#logger-text").text("Added product " + code + " to customer " + cust)
    $("#logger-text").css("color", "green")
    setTimeout(function(){
      $("#logger-text").text("")
    },2000)
  });

  $("#delete-product").on("click", function(){
    var code=$("#del-table").find(".amp-td-sel").siblings("#edit-code").text()
    delprd(code)
    $("#logger-text").text("Deleted " + code)
    $("#logger-text").css("color", "red")
    
    setTimeout(function(){
      $("#logger-text").text("")
    },2000)
    $("#del-product").css("display", "block");
    $("#del-product").find(".am-temp").remove()
    var store = JSON.parse(localStorage.getItem("dbs"));
    for(var i = 0; i<10; i++){
      var markup = "<tr class='amp-tr am-temp'><td class='amp-td' id='edit-code'>"+ store[i].code +"</td><td class='amp-td'>"+ store[i].customer +"</td><td class='amp-td'>"+ store[i].description +"</td><td class='amp-td'>"+ store[i].pltype +"</td></tr>";
      $("#del-table").append(markup);
    }
  });
})





