var gidata = []
var palletsdata = []
var palletsdata2 = []

function countPallets(po){
  var count = 1
  if(localStorage.getItem("palletsdb")){
    palletsdata2 = JSON.parse(localStorage.getItem("palletsdb"));
  }else{
    localStorage.setItem('palletsdb',[]);
  }
  for(var i=0; i<palletsdata2.length; i++){
    if(palletsdata2[i].po == po){
      count+= 1
      gidata = JSON.parse(localStorage.getItem("gidb"));
      for(var a=0; a<gidata.length; a++){
        if(gidata[a].po == po){
          gidata[a].pallets = count
        }
      }
      var res = JSON.stringify(gidata);
      localStorage.setItem('gidb',res);
      $("#pallets-head").text(count)
    }
  }
  return count
}


function giOBJ(po, cust, ref, status, pallets, datec, dated) {
    var obj = {
        "po": po,
        "customer": cust,
        "ref": ref,
        "status": status,
        "pallets": pallets,
        "datec": datec,
        "dated": dated
    }
    return obj
}

function addorder(po, cust, ref, status, pallets, datec, dated){
  if(localStorage.getItem("gidb")){
    gidata = JSON.parse(localStorage.getItem("gidb"));
  }else{
    localStorage.setItem('gidb',[]);
  }
  var prd = giOBJ(po, cust, ref, status, pallets, datec, dated);
  gidata.push(prd);
  var res = JSON.stringify(gidata);
  localStorage.setItem('gidb',res);
}

function deleteorder(po){
  if(localStorage.getItem("gidb")){
    gidata = JSON.parse(localStorage.getItem("gidb"));
  }else{
    localStorage.setItem('gidb',[]);
  }
  for(var i = 0; i<gidata.length; i++){
    if(gidata[i].po == po){
      var theind = gidata.indexOf(gidata[i])
      gidata.splice(theind, 1)
    }
  }
  var res = JSON.stringify(gidata);
  localStorage.setItem('gidb',res);
  console.log("deleted")
}
function addpallet(po, cust, sku, status, palletid, qty, bbd, datec, location){
  if(localStorage.getItem("palletsdb")){
    palletsdata = JSON.parse(localStorage.getItem("palletsdb"));
  }else{
    localStorage.setItem('palletsdb',[]);
  }
  var pallet ={
    "po":po, 
    "cust":cust,
    "sku":sku,
    "status": status, 
    "palletid": palletid, 
    "qty": qty, 
    "bbd": bbd, 
    "datec": datec, 
    "location": location,
  };
  palletsdata.push(pallet);
  var res = JSON.stringify(palletsdata);
  localStorage.setItem('palletsdb',res);
}

function checksku(sku){
  
  var store = JSON.parse(localStorage.getItem("dbs"));
  for(var i = 0; i<store.length; i++){
    if(store[i].code == sku){
      return true
    }
  }

}

var td = new Date()
var currentDate = `${td.getDate()}/${td.getMonth() + 1}/${td.getFullYear()}`;



$(document).ready(function(){
  $("#gi-edit-btn").hide()
  $("#gi-close-btn").hide()
  $("#gi-delete-btn").hide()
  $("#gi-table").on("mouseenter", ".gi-td", function(){
    $(this).parent(".gi-tr").css("background-color", "#dddddd");
  });
  $("#gi-table").on("mouseleave", ".gi-td", function(){
    $(this).parent(".gi-tr").css("background-color", "rgba(0,0,0,0)");
  });
  $("#gi-table").on("click", ".gi-td", function(){
    $("#gi-new-btn").show()
    var a = $(this).hasClass("gi-td-sel");
    $(".gi-td").removeClass("gi-td-sel");
    if(a){
      $(this).parent(".gi-tr").children(".gi-td").removeClass("gi-td-sel");
      $("#gi-edit-btn").hide()
      $("#gi-close-btn").hide()
      $("#gi-delete-btn").hide()
    }else{
      $(this).parent(".gi-tr").children(".gi-td").addClass("gi-td-sel");
      $("#gi-edit-btn").show()
      $("#gi-delete-btn").show()
    }  
  });
  $("#gi-delete-btn").on("click", function(){
    $("#gi-edit-btn").hide()
    $("#gi-delete-btn").hide()
    var a = $(".gi-td-sel").siblings(".gi-td-po").text()
    console.log(a)
    deleteorder(a)
    $("#gi-table").find(".gi-temp").remove()
    
    var gidata = JSON.parse(localStorage.getItem("gidb"));
    for(var i = 0; i<10; i++){
      var markup = "<tr class='gi-tr gi-temp'><td class='gi-td gi-td-po'>"+ gidata[i].po +"</td><td class='gi-td'>"+ gidata[i].customer +"</td><td class='gi-td'>"+ gidata[i].ref +"</td><td class='gi-td'>"+ gidata[i].status +"</td><td class='gi-td'>"+ gidata[i].pallets +"</td><td class='gi-td'>"+ gidata[i].datec +"</td><td class='gi-td'>"+ gidata[i].dated +"</td></tr>";
      $("#gi-table").append(markup);
      
    }
    
  })
  $("#gi-new-btn").on("click", function(){
    $("#gi-edit-btn").hide()
    $("#gi-delete-btn").hide()
    var temp = new Date()
    var newPo = `${temp.getDate()}${temp.getMonth() + 1}${temp.getFullYear()}${temp.getMilliseconds()}`;
    
    addorder(newPo, "", "", "Created", 0, currentDate, "")

    $("#gi-table").find(".gi-temp").remove()
    
    var gidata = JSON.parse(localStorage.getItem("gidb"));
    for(var i = 0; i<10; i++){
      var markup = "<tr class='gi-tr gi-temp'><td class='gi-td gi-td-po'>"+ gidata[i].po +"</td><td class='gi-td'>"+ gidata[i].customer +"</td><td class='gi-td'>"+ gidata[i].ref +"</td><td class='gi-td'>"+ gidata[i].status +"</td><td class='gi-td'>"+ gidata[i].pallets +"</td><td class='gi-td'>"+ gidata[i].datec +"</td><td class='gi-td'>"+ gidata[i].dated +"</td></tr>";
      $("#gi-table").append(markup);
      
    }
    
  })

  $("#gi-edit-btn").on("click", function(){
    var ponum = $(".gi-td-sel").siblings(".gi-td-po").text()
    
    $("#gi-new-btn").hide()
    $("#gi-edit-btn").hide()
    $("#gi-delete-btn").hide()
    $("#gi-close-btn").show()
    
    $("#gi-edit-overlay").show()
    var gidata = JSON.parse(localStorage.getItem("gidb"));
    var pldata = JSON.parse(localStorage.getItem("palletsdb"));
    for(var i = 0; i<gidata.length; i++){
      if(gidata[i].po == ponum){
        $("#po-head").text(gidata[i].po)
        var tc = gidata[i].customer
        if(tc == ""){
          console.log("no customer set")
        }else{
          $("#cust-head").remove()
          $(".element-to-change").append("<h3 id='cust-head'>" + gidata[i].customer + "</h3>")
        }
        $("#ref-head").val(gidata[i].ref)
        $("#status-head").text(gidata[i].status)
        $("#pallets-head").text(gidata[i].pallets)
        $("#datec-head").text(gidata[i].datec)
        
        $("#dated-head").text(gidata[i].dated)
      }
      
    }
    $(".gi-pallet-table-tr").remove()
    
    for(var i = 0; i<pldata.length; i++){
      if(pldata[i].po == $("#po-head").text()){
        var markup = "<tr class='gi-pallet-table-tr'><td class='gi-pallet-table-td'>" + pldata[i].palletid + "</td><td class='gi-pallet-table-td'>" + pldata[i].sku + "</td><td class='gi-pallet-table-td'>" + pldata[i].qty + "</td><td class='gi-pallet-table-td'>" + pldata[i].bbd + "</td><td class='gi-pallet-table-td'>" + pldata[i].status + "</td><td class='gi-pallet-table-td'>" + pldata[i].location + "</td></tr>"
      $("#gi-edit-pallet-table").append(markup)
      }
      
    }
    
    
  })
  $("#cust-head").on("focusout", function(){
    var ponum = $(".gi-td-sel").siblings(".gi-td-po").text()
    var gidata = JSON.parse(localStorage.getItem("gidb"));
    var theval;
    if($(this).val() !== ""){
      for(var i = 0; i<gidata.length; i++){
        if(gidata[i].po == ponum){
          gidata[i].customer = $(this).val()
          theval = $(this).val()
          var res = JSON.stringify(gidata);
          localStorage.setItem('gidb',res);
          $("#cust-head").remove()
          $(".element-to-change").append("<h3 id='cust-head'>" + theval + "</h3>")
        }
      }
    }
  });
  $("#add-pallet-btn").on("click", function(){
    var ponum = $("#po-head").text()
    var cust = $("#cust-head").text()
    var counter = countPallets(ponum)
    console.log(cust)
    if(cust !== ""){
      if(checksku($("#add-new-sku").val())){
        addpallet(ponum, cust, $("#add-new-sku").val(), "pend", ponum.substr(ponum.length - 5) + "-" + counter.toString(), $("#add-new-qty").val(), $("#add-new-bbd").val(), currentDate, "gi")
        
        $("#add-new-sku").val("")
        $("#add-new-qty").val("")
        $("#add-new-bbd").val("")
        $("#gi-edit-pallet-table").remove(".gi-pallet-table-td")
        var pldata = JSON.parse(localStorage.getItem("palletsdb"));
        for(var i = 0; i<pldata.length; i++){
          if(pldata[i].po == $("#po-head").text()){
            var markup = "<tr class='gi-pallet-table-tr'><td class='gi-pallet-table-td'>" + pldata[i].palletid + "</td><td class='gi-pallet-table-td'>" + pldata[i].sku + "</td><td class='gi-pallet-table-td'>" + pldata[i].qty + "</td><td class='gi-pallet-table-td'>" + pldata[i].bbd + "</td><td class='gi-pallet-table-td'>" + pldata[i].status + "</td><td class='gi-pallet-table-td'>" + pldata[i].location + "</td></tr>";
          } 
        }
        $("#gi-edit-pallet-table").append(markup)
      }else{
        console.log("no exists")
      }
    }
  });
  
  $("#add-new-sku").on("keyup", function(){
    var store = JSON.parse(localStorage.getItem("dbs"));
    var cust = $("#cust-head").text()
    
    for(var i=0;i<store.length; i++){
      console.log(store[i].customer, cust)
      console.log(store[i].code, $(this).val())
      if(store[i].code == $(this).val() & store[i].customer == cust){
        $(this).css("color", "green")
        break
      }else{
        $(this).css("color", "red")
        
      }
    }
  });

  
  $("#gi-close-btn").on("click", function(){
    $("#gi-edit-pallet-table").remove(".gi-pallet-table-tr")
    $("#gi-edit-overlay").hide()
    $("#gi-close-btn").hide()
    $("#gi-new-btn").show()
  })
  
});