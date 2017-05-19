//the locations on the map
var locations = [{
        title: 'Humayuns Tomb',
        location: {
            lat: 28.593331,
            lng: 77.250722
        },
        selected: false,
        show: true,
        wikilink: '',
        url: ''
    },

    {
        title: 'Purana Qila',
        location: {
            lat: 28.609359,
            lng: 77.243829
        },
        selected: false,
        show: true
    },

    {
        title: 'India Gate',
        location: {
            lat: 28.612957,
            lng: 77.229485
        },
        selected: false,
        show: true
    },

    {
        title: 'Gurudwara Bangla Sahib',
        location: {
            lat: 28.626406,
            lng: 77.208725
        },
        selected: false,
        show: true
    }, {
        title: 'Red Fort',
        location: {
            lat: 28.6562,
            lng: 77.2410
        },
        selected: false,
        show: true
    }

];
var polygon = null;
var places = []; //array of the places
//viewmodel
var model = function() {

    var highlightedMarker = makeMarkerIcon('FFFF24'); //color of marker on highlight
    var defaultIcon = makeMarkerIcon('0091ff'); //the  default color of the marker

    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }

    //listing the markers on the map
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i,
            show: ko.observable(true),
            map: map,
            wikilink: '',
            url: ''

        });

        places.push(marker);

        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedMarker);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);

        });
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

        var Bounce = null;
        //source-https://developers.google.com/maps/documentation/javascript/examples/marker-animations
        var clickBounce = function() {
            if (Bounce !== null)
                Bounce.setAnimation(null);
            if (Bounce !== this) {
                this.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    Bounce.setAnimation(null);
                }, 1000); //will bounce for 1sec.
                Bounce = this;
            } else
                Bounce = null;
        };
        google.maps.event.addListener(marker, 'click', clickBounce);
    }

    this.selectAll = function(marker) {

        populateInfoWindow(marker, largeInfowindow);
        marker.selected = true;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 600);
    };

    var largeInfowindow = new google.maps.InfoWindow();
    //to show all the listings on the map
    function showListings() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
            places[i].setMap(map);
            bounds.extend(places[i].position);
        }
        map.fitBounds(bounds);
    }

    // This function will loop through the listings and hide them all.
    function hideListings() {
        for (var i = 0; i < places.length; i++) {
            places[i].setMap(null);
        }
    }

    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;

            infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '</div>' + '<br>' + '<div>' + '<a href="' + marker.url + '">' + marker.wikilink + '</a>' + '</div>'); //set content that should be appear in info window
            //the window now shows the wiki link to the place

            infowindow.open(map, marker);

            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });

        }
    }
    //this function is used to search the places on the map
    //help source - https://www.w3schools.com/howto/howto_js_filter_table.asp
    this.inputValue = ko.observable('');
    this.filtersearch = function() {

        largeInfowindow.close(); //close all info window that are previously opened window
        var SearchValue = this.inputValue();
        if (SearchValue.length === 0) {
            this.showAll(true);
        } else {
            for (i = 0; i < places.length; i++) {
                if (places[i].title.toLowerCase().indexOf(SearchValue.toLowerCase()) > -1) {
                    places[i].show(true);
                    places[i].setVisible(true);
                } else {
                    places[i].show(false);
                    places[i].setVisible(false);
                }
            }
            $('#other').addClass('open'); //this will open the dropdown box when we will search places

        }
        largeInfowindow.close();
    };

    this.showAll = function(variable) {
        for (i = 0; i < places.length; i++) {
            places[i].show(variable);
            places[i].setVisible(variable);
        }
    };
    //these are used to show and hide all the listings on the map
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);

    // Initialize the drawing manager.
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON
            ]
        }
    });
    document.getElementById('toggle-drawing').addEventListener('click', function() {
        toggleDrawing(drawingManager);
    });

    // Add an event listener so that the polygon is captured,  call the
    // searchWithinPolygon function. This will show the markers in the polygon,
    // and hide any outside of it.
    drawingManager.addListener('overlaycomplete', function(event) {
        // First, check if there is an existing polygon.
        // If there is, get rid of it and remove the markers
        if (polygon) {
            polygon.setMap(null);
            hideListings(places);
        }
        // Switching the drawing mode to the HAND (i.e., no longer drawing).
        drawingManager.setDrawingMode(null);
        // Creating a new editable polygon from the overlay.
        polygon = event.overlay;
        polygon.setEditable(true);
        // Searching within the polygon.
        searchWithinPolygon();
        // Make sure the search is re-done if the poly is changed.
        polygon.getPath().addListener('set_at', searchWithinPolygon);
        polygon.getPath().addListener('insert_at', searchWithinPolygon);
    });

    // This shows and hides (respectively) the drawing options.
    function toggleDrawing(drawingManager) {
        if (drawingManager.map) {
            drawingManager.setMap(null);
            // In case the user drew anything, get rid of the polygon
            if (polygon !== null) {
                polygon.setMap(null);
            }
        } else {
            drawingManager.setMap(map);
        }
    }

    // This function hides all markers outside the polygon,
    // and shows only the ones within it. This is so that the
    // user can specify an exact area of search.
    function searchWithinPolygon() {
        for (var i = 0; i < places.length; i++) {
            if (google.maps.geometry.poly.containsLocation(places[i].position, polygon)) {
                places[i].setMap(map);
            } else {
                places[i].setMap(null);
            }
        }
    }

    //wikipedia api to give the link to the wikipedia page of the marker

    places.forEach(function(marker) {

        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title +
            '&format=json&callback=?';
        $.ajax({
            method: 'GET',
            dataType: "json",
            url: wikiUrl,
            success: function(response) {
                console.log(response);
                var articleList = response[1]; //will take the first response
                var result = articleList[0]; //will take the first element of the response
                var urllist = response[3]; //same is done here for url
                var url = urllist[0];
                marker.wikilink = result;
                marker.url = url;

            },
            error: function(e) {
                this.errorinfo("Data unavailabe");
            }
        });
    });
};