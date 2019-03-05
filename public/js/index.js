var xcord,ycord,token;
var cords = false;
var dist = false;
var coordinates = [];
var markers = [];
var map;

$(document).ready(function(){
    console.log("we are ok!"); 
    var visited2 = false;
    $.ajax({
        url: "/observatory/api/products",
        method: "GET",
        
        success: function(response){
            if(visited2 == false)
            {
                visited2 = true;
                var list = response.products
                $.each(list, function(i,data){
                    $("#products_drop").append("<option value='"+data.id+"'>"+data.name+"</option>")  
                })
            }      
        }
    }) 
    
    var visited = false;
    $.ajax({
        url: "/observatory/api/shops",
        method: "GET",
        
        success: function(response){
            if(visited == false)
            {
                visited = true;
                var list = response.shops
                $.each(list, function(i,data){
                    $("#shops_drop").append("<option value='"+data.id+"'>"+data.name+"</option>")
                })
            }      
        }
    })
    //map initialize
    var GeoSearchControl = window.GeoSearch.GeoSearchControl;
    var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;

    
    //map starts
    map= L.map('index_map',{center:[37.918084, 23.707027], zoom: 10});
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

    var customIcon = L.icon({
        iconUrl: '/static/pictures/1170466.svg',
        iconSize:     [30, 35],
        iconAnchor:   [15, 35],
        popupAnchor:  [-5, -36]
    });

    //markers
map.on('click', onMapClick);

var markers = [];

// Script for adding marker on map click
function onMapClick(e) {

  var geojsonFeature = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [e.latlng.lat, e.latlng.lng],
    }
  }
  if (markers.length > 0) {
    map.removeLayer(markers.pop());
  }
  var marker;

  L.geoJson(geojsonFeature, {

    pointToLayer: function(feature, latlng) {

      marker = L.marker(e.latlng, {

        title: "lat"+e.latlng.lat+",lng"+e.latlng.lng,
        alt: "lat"+e.latlng.lat+",lng"+e.latlng.lng,
        riseOnHover: true,
        draggable: true,
        icon: customIcon
      });
      markers.push(marker)
      xcord = e.latlng.lat;
      ycord = e.latlng.lng;
      cords = true;
      return marker;
    }
  }).addTo(map);

}
//telos markers

});

///////////////////////////////////// TAGS /////////////////////////////////////////
var TagsList = [];
var TagsStringList = [];
[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input'),
        tags = [];
    
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input');
    mainInput.addEventListener('input', function () {
        let enteredTags = mainInput.value.split(',');
        if (enteredTags.length > 1) {
            enteredTags.forEach(function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    addTag(filteredTag);
            });
            mainInput.value = '';
        }
    });

    mainInput.addEventListener('keydown', function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    function addTag (text) {
        let tag = {
            text: text,
            element: document.createElement('span'),
        };

        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function () {
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);
        tags.push(tag);
        el.insertBefore(tag.element, mainInput);
        refreshTags();   
    }

    function removeTag (index) {
        let tag = tags[index];
        tags.splice(index, 1);
        el.removeChild(tag.element);
        refreshTags();
    }

    function refreshTags () {
        let tagsList = [];
        tags.forEach(function (t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(',');
        TagsStringList = hiddenInput.value; //string me ta tags xwrismena me komma
        TagsList = tagsList; //tags se morfh string mesa se pinaka
    }

    function filterTag (tag) {
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }
});
////////////////////////////// TELOS TAGS /////////////////////////////////



var home = true;

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

var myshop = [];
$('#shop_select').click(function(){
     myshop[0] = document.getElementById('shops_drop').value;
     //console.log(myshop)
})



var myproduct = [];
$('#product_select').click(function(){
     myproduct[0] = document.getElementById('products_drop').value;
     //console.log(myproduct)
})

var myDist;
$('#dist_select').click(function(){
     myDist = document.getElementById('dist_drop').value;
     dist = true;
})

var mytag; 
var visited3=false; 
$('#index_search').click(function(){
    token = localStorage.getItem("token")
    if(dist == cords)
    {
        var myurl = "/observatory/api/prices?";
        if(myshop)
            myurl = myurl + "&shops="+myshop;
        if(myproduct)
            myurl = myurl + "&products="+myproduct;
        if(myDist)
            myurl = myurl + "&geoDist="+myDist;
        if(ycord)
            myurl = myurl + "&geoLng="+ycord+"&geoLat="+xcord;
        if(TagsList)
            myurl = myurl + "&tags="+TagsList;

        $.ajax({
            url: myurl,
            method: "GET",
            headers: {
                "X-OBSERVATORY-AUTH" : token
            }, 
            
            success: function(response,status){
                for(i=0;i<markers.length;i++){
                    map.removeLayer(markers[i]);
                }
                //eisagwgh markers ston xarth
                var selectedshops = response.prices;
                var j = 0;
                var k = 0;
                $.each(selectedshops, function(i,data){
                    var temp = data.shopId;
                    var productName = data.productName;
                    var shopdist = data.shopDist
                    var date = data.date;
                    var price = data.price;
                    $.ajax({
                        url: "/observatory/api/shops/"+temp,
                        method: "GET",   
                        
                        success: function(response,status){
                            var lat = response.lat;
                            var lng = response.lng;
                            
                            var marker = new L.marker([lat, lng]);
                            marker.key = "Price:" +price+ " Shop: "+response.name+", Product: "+productName+", Distance: "+shopdist+", Date: "+date;
                            marker.myId = temp;
                            marker.addTo(map).on('click',onClick)
                            markers[j] = marker;
                            j = j + 1;
                            
                            
                        },
                        error: function(response,status){
                            alert("something went wrong")
                        }
                    })

                    
                    /**/    
                }) 
                
                var popup = L.popup();

                function onClick(e) { //afto kanei trigger otan pataw se ena marker mono
                    popup
                        .setLatLng(e.latlng)
                        .setContent(this.key)
                        .openOn(map);
                    ShopId = e.target.myId; //edw krataw to ShopId otan kanw click se ena marker gia na to xrhsimopoihsw sto submit argotera
                }

            },
            error: function(response,status){
                console.log("shops="+myshop+"&products="+myproduct+"&geoDist="+myDist+"&geoLng="+ycord+"&geoLat="+xcord+"&tags="+TagsList)

                alert("kophkes"+response)
                
            }
        })
    }
    else
    {
        if(cords==true)
        {
            alert("You have to select search area distanse when you have a marker!")
        }
        else
        {
            alert("You have to put a marker when you have search area distance!")
        }
        
    }
    
    
})
