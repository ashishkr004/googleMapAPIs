// Google Map API(Application Programming Interface)
// Include Jquery. Google CDN: <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
// Include google map js: <script src="https://maps.googleapis.com/maps/api/js"></script>


var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();

// This function the google autocomplete service, where it first gives options from bounded area.
function locationAutocomplete(){
    var latitude_1=28.30;
    var longitude_1=76.40;
    var latitude_2=29.50;
    var longitude_2=77.40;

    // Defines the bounded rectangular area on the map. 
    var mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(latitude_1,longitude_1), new google.maps.LatLng(latitude_2,longitude_2));
    
    // Definig google events
    var options = {
        bounds: mapBounds,
        componentRestrictions: {country: 'in'}
    };      

    var location = $('#location').val();
    var autopickLocation = new google.maps.places.Autocomplete(location, options);
}

// This function displays a route on the map starting from point A and end at point B.
function displayRoute(){
    var latitudeA=$('#latitudeA').val();     // take value from label whose id is equal to latitudeA.
    var longitudeA=$('#longitudeA').val();
    var latitudeB=$('#latitudeB').val();
    var latitudeB=$('#longitudeB').val();

    var coordinateA = new google.maps.LatLng(latitudeA,longitudeA);
    var coordinateB = new google.maps.LatLng(latitudeB,longitudeB);

    // variable mapOption is of type object.
    var mapOptions = {
        zoom:12,
        // center: New_Delhi,
        scrollwheel: true,
        draggable: true,
        scaleControl: true,
        optimizeWaypoints: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    directionsDisplay = new google.maps.DirectionsRenderer();

    var request = {
        origin: coordinateA,
        destination: coordinateB,
        //waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status){
        if (status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
        }
    });
    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);        // id of the map where wants to display route is equal to googleMap.
    directionsDisplay.setMap(map);  
    geocoder = new google.maps.Geocoder();
}


// The function gives the route details like distance, total driving time and others from point A(starting point) to point B(ending point).
function routeDetails(){
    var startPoint = $('#startPoint').val();    // take value from label whose id equal to 'startPoint'
    var endPoint = $('#endPoint').val();
    var request = {
        origin: startPoint,
        destination: endPoint,
        travelMode: google.maps.TravelMode.DRIVING
    };
    
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var route = response.routes[0];

            $('#distance').val(route.legs[0].distance.value);
            $('#duration').val(route.legs[0].duration.value);
            $('#latitudeA').val(route.legs[0].start_location.G);
            $('#longitudeA').val(route.legs[0].start_location.K);
            $('#latitudeB').val(route.legs[0].end_location.G);
            $('#longitudeB').val(route.legs[0].end_location.K)
        }
    });
}   

google.maps.event.addDomListener(window, 'load', locationAutocomplete);
