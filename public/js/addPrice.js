var visited = false,visited1 = false;
var coordinates = [];
var markers = [];
var lenght = 0; 
var flag = false; 
var ShopID;
$(document).ready(function(){
    console.log("we are ok!");
    var token = localStorage.getItem("token")
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
        var map= L.map('prices_map',{center:[37.918084, 23.707027], zoom: 10});
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
                        
                        var marker = new L.marker([coordinates[i], coordinates[i+1]]);
                        marker.key = "Name: "+data.name+", lat: "+coordinates[i]+", lng: "+coordinates[i+1];
                        marker.myId = data.id;
                        marker.addTo(map).on('click',onClick)
                        markers[j] = marker;
                        j = j + 1;
                        k = k + 2;    
                    })
                    /*console.log(response.shops)
                    var j = 0;
                    for(var i=0; i<=coordinates.length-2;i=i+2)
                    {
                        var marker = new L.marker([coordinates[i], coordinates[i+1]]).addTo(map).on('click',onClick);
                        marker.key = "name: lat: "+coordinates[i]+"lng: "+coordinates[i+1];
                        console.log(marker.key)
                        markers[j] = marker;
                        j = j + 1;
                    }*/           
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
    var Data = {

    }
    $.ajax({
        url: "/observatory/api/addprice",
        method: "GET",
        data: Data,
        
        success: function(response,status){
                 
        },
        error: function(response,status){

        }
    })
    
})