var flag = false;

$(document).ready(function(){
    console.log("we are ok!");
    /*var token = localStorage.getItem("token")
    if (token == null){
        alert("You must be logged in to add new product")
        $(location).attr("href", "/login");

    }*/
     

    var map= L.map('prices_map',{center:[37.918084, 23.707027], zoom: 6});
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{maxZoom: 20,subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);

    var petrolIcon = L.icon({
        iconUrl: '/static/pictures/1170466.svg',
        iconSize:     [10, 30],
        iconAnchor:   [15, 40],
        popupAnchor:  [-5, -36]
    });

    var Lat,Lng,mymarker;

    map.on('click', 
	function(e){
 		 var coord = e.latlng.toString().split(',');
 		 var lat = coord[0].split('(');
         var lng = coord[1].split(')');
         if(flag == false)
         {
            flag = true;
            alert("You clicked the map at LAT: " + lat[1] + " and LONG: " + lng[0]);
            mymarker = L.marker(e.latlng).addTo(map);
            Lat = e.latlng.lat;
            Lng = e.latlng.lng;
            console.log("lat:"+Lat+"lng"+Lng)
         }
 		 
    });
    
    

    mymarker = L.marker([e.latlng.lat,e.latlng.lng], {title: "MyPoint", alt: "The Big I", draggable: true})
    .addTo(map)
    .on('dragend', function() {
		var coord = String(mymarker.getLatLng()).split(',');
		console.log(coord);
		var lat = coord[0].split('(');
        console.log(lat);
		var lng = coord[1].split(')');
		console.log(lng);
		myMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".");
	});
});

 


/*var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        var newMarker = new L.marker([e.latlng],{icon: petrolIcon}).addTo(map).bindPopup('<b></b><div><img style="width:100%" src="" alt="image"/></div>')
        //.setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);*/

