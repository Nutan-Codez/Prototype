// Initialize the map
let map;
let service;
let infowindow;

function initMap() {
    const defaultLocation = { lat: -37.8136, lng: 144.9631 }; // Default location (Melbourne)
    
    // Create a map centered on the default location
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 12,
    });

    infowindow = new google.maps.InfoWindow();

    // Call the search function when the search button is clicked
    document.getElementById('search-btn').addEventListener('click', function() {
        searchHospitals();
    });
}

// Search for hospitals based on the location entered by the user
function searchHospitals() {
    const locationInput = document.getElementById('search-input').value;
    
    // Geocode the location entered by the user to get coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: locationInput }, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            map.setCenter(location);

            const request = {
                location: location,
                radius: 5000, // 5km radius
                type: ['hospital'], // Search for hospitals
            };

            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // Clear previous markers
                    clearMarkers();

                    // Loop through the results and create a marker for each hospital
                    for (let i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            });
        } else {
            alert('Location not found: ' + status);
        }
    });
}

// Create a marker for each hospital
function createMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

// Clear all markers from the map (optional)
function clearMarkers() {
    for (let i = 0; i < map.markers.length; i++) {
        map.markers[i].setMap(null);
    }
    map.markers = [];
}

// Initialize the map when the window loads
window.onload = initMap;
