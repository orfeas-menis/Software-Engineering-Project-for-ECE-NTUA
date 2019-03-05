var visited = false,visited1 = false;
var coordinates = [];
var markers = [];
var lenght = 0; 
var flag = false; 
var ShopID;
var map;
var token;
$(document).ready(function(){
    console.log("we are ok!");
    token = localStorage.getItem("token")
    if (token == null){   
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");
    }
    else
    {
        //map initialize
        var GeoSearchControl = window.GeoSearch.GeoSearchControl;
        var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;

        //var xcord,ycord;
        //map starts
        map= L.map('prices_map',{center:[37.918084, 23.707027], zoom: 10});
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18}).addTo(map);
        
        var myprovider =  new OpenStreetMapProvider();

        var geocoder = new GeoSearchControl({
            provider: myprovider,              // required
            style: 'bar',                             
            showMarker: false,                                   // optional: true|false  - default true
            showPopup: false,                                   // optional: true|false  - default false
            marker: {                                           // optional: L.Marker    - default L.Icon.Default
              icon: new L.Icon.Default(),
              draggable: false,
            },
            popupFormat: ({ query, result }) => result.label,   // optional: function    - default returns result label
            maxMarkers: 1,                                      // optional: number      - default 1
            retainZoomLevel: false,                             // optional: true|false  - default false
            animateZoom: true,                                  // optional: true|false  - default true
            autoClose: true,                                   // optional: true|false  - default false
            searchLabel: 'Enter address',                       // optional: string      - default 'Enter address'
            keepResult: true                                 // optional: true|false  - default false
        })

        map.addControl(geocoder);

        var petrolIcon = L.icon({
            iconUrl: '/static/pictures/1170466.svg',
            iconSize:     [30, 35],
            iconAnchor:   [15, 35],
            popupAnchor:  [-5, -36]
        });
        
        //TELOS XARTH



        //dropdown list gia products
        $.ajax({
            url: "/observatory/api/products",
            method: "GET",
            
            success: function(response){
                if(visited == false)
                {
                    visited = true;
                    var list = response.products
                    $.each(list, function(i,data){
                        $("#prices_products").append("<option value='"+data.id+"'>"+data.name+"</option>")
                    })
                }      
            },
            error: function(response,status){
            
            }
        })
        //telos dropdown list gia products

        //arxh gia eisagwgh markers sto xarth 
        $.ajax({
            url: "/observatory/api/shops",
            method: "GET",
            
            success: function(response){
                if(visited1 == false)
                {
                    visited1 = true;
                    var cords = response.shops
                    
                    var j = 0;
                    var k = 0;


                    $.each(cords, function(i,data){ 
                        var lat = data.lat;
                        var lng = data.lng;
                        coordinates[k] = lat; 
                        coordinates[k+1] = lng;
                        
                        var marker = new L.marker([lat,lng]);
                        marker.key = "Name: "+data.name+", lat: "+lat+", lng: "+lng;
                        marker.myId = data.id;
                        marker.addTo(map).on('click',onClick)
                        markers[j] = marker;
                        console.log(marker)
                        j = j + 1;
                        k = k + 2;    
                    })
                               
                }      
            },
            error: function(response,status){
            }
        })
        //telos gia markers
        var popup = L.popup();

        function onClick(e) { //afto kanei trigger otan pataw se ena marker mono
            popup
                .setLatLng(e.latlng)
                .setContent(this.key)
                .openOn(map);
            ShopId = e.target.myId; //edw krataw to ShopId otan kanw click se ena marker gia na to xrhsimopoihsw sto submit argotera
            console.log(ShopId)
        }

    } 
});
var home = false;

$("#Home").on("click",function(event){
    if(home == false)
    {
        home = true;
        $(location).attr("href", "/");
    }

})

$("#Account").on("click",function(event){
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to see your account")
        $(location).attr("href", "/login");
    }
    else
    {
        $(location).attr("href", "/account"); //gia twra to vazw na me vazei pali sto home
    }  
})

$("#AddPrice").on("click",function(event){
    var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add price")
        $(location).attr("href", "/login");
    } 
    else
    {
       $(location).attr("href", "/addprice"); 
    }  
})

$("#About").on("click",function(event){
    $(location).attr("href", "/about");
})

$("#Contact").on("click",function(event){
    $(location).attr("href", "/contact");
})


$("#Login").on("click",function(event){
    $(location).attr("href", "/login");
})


$("#Logout").on("click",function(event){
    $(location).attr("href", "/logout");
})
var selectedProd;
$('#product_select').click(function(){ 
    event.preventDefault();  
    selectedProd = document.getElementById('prices_products').value; //edw apothikevw thn epilogh tou xrhsth dld to productId
    console.log(selectedProd)
 
}) 

$("#add_product_page_button").click(function(event){
    event.preventDefault();
    $(location).attr("href", "/addproduct");
})

$("#add_shop_page_button").click(function(event){
    event.preventDefault();
    $(location).attr("href", "/addshop");
})

$("#add_price_submit_button").click(function(event){
    event.preventDefault();
    var datefrom,dateto;

      datefrom = new Date($('#DF').val());
      day = datefrom.getDate();
      month = datefrom.getMonth() + 1;
      year = datefrom.getFullYear();
      var DATEFROM = [year, month, day].join('-');

      dateto = new Date($('#DT').val());
      day = dateto.getDate();
      month = dateto.getMonth() + 1;
      year = dateto.getFullYear();
      var DATETO = [year, month, day].join('-');
      //console.log(DATEFROM,DATETO)

    var Data = {
        price: $("#prod_price").val(),
        shopId: ShopId,
        productId: selectedProd,
        dateFrom: DATEFROM,
        dateTo: DATETO,
    }
    
    $.ajax({
        url: "/observatory/api/prices",
        method: "POST",
        data: Data,
        headers: {
            "X-OBSERVATORY-AUTH" : token
        },    
        
        success: function(response,status){
            alert("your price submitted succesfully")
        },
        error: function(response,status){
            alert("something went wrong")
        }
    })
    
})