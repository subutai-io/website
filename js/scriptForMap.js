
                /*
                 Map Settings

                 Find the Latitude and Longitude of your address:
                 - http://universimmedia.pagesperso-orange.fr/geo/loc.htm
                 - http://www.findlatitudeandlongitude.com/find-address-from-latitude-and-longitude/

                 */

                // Map Markers
                var mapMarkers = [{
                    address: "New York, NY 10017",
                    html: "<strong>New York Office</strong><br>New York, NY 10017",
                    icon: {
                        image: "img/pin.png",
                        iconsize: [26, 46],
                        iconanchor: [12, 46]
                    },
                    popup: true
                }];

                // Map Initial Location
                var initLatitude = 40.75198;
                var initLongitude = -73.96978;

                // Map Extended Settings
                var mapSettings = {
                    controls: {
                        draggable: true,
                        panControl: true,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: true,
                        streetViewControl: true,
                        overviewMapControl: true
                    },
                    scrollwheel: false,
                    markers: mapMarkers,
                    latitude: initLatitude,
                    longitude: initLongitude,
                    zoom: 16
                };

                var map = $("#googlemaps").gMap(mapSettings);

                // Map Center At
                var mapCenterAt = function(options, e) {
                    e.preventDefault();
                    $("#googlemaps").gMap("centerAt", options);
                }

