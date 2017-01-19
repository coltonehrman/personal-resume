var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr>';
var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%data%</span><span class="white-text">%data%</span></li>';
var HTMLcontactLink = '<li class="flex-item"><a href="%data%" target="_blank">%data%</a></li>';
var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLskillsStart = '<div id="skills"></div>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="%data%" target="_blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLonlineSchoolStart = '<div class="education-entry"></div>';
var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="%data%" target="_blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><em><small>%data%</small></em>';

var googleMap = '<div id="map"></div>';
var map;

function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true,
    scrollwheel: false
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  function locationFinder() {
    var locations = [];
    locations.push(bio.contacts.location);

    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  function createMapMarker(placeData) {
    var lat = placeData.geometry.location.lat();
    var lon = placeData.geometry.location.lng();
    var name = placeData.formatted_address;
    var bounds = window.mapBounds;

    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infoWindow.close();
    });

    bounds.extend(new google.maps.LatLng(lat, lon));
    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  function pinPoster(locations) {
    var service = new google.maps.places.PlacesService(map);

    locations.forEach(function(place){
      var request = {
        query: place
      };
      service.textSearch(request, callback);
    });
  }

  window.mapBounds = new google.maps.LatLngBounds();
  locations = locationFinder();
  pinPoster(locations);
}

window.addEventListener('load', initializeMap);
window.addEventListener('resize', function(e) {
  map.fitBounds(mapBounds);
});

function replaceHTML(oldHTML, newData) {
  var newHTML = oldHTML;
  if ( $.isArray(newData) ) {
    $.each(newData, function(index, data){
      newHTML = newHTML.replace(/%data%/, data);
    });
  }
  else {
    newHTML = newHTML.replace(/%data%/, newData);
  }
  return newHTML;
}

function createRadarChart(selector, data) {
  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.radius = 4;
  RadarChart.defaultConfig.w = 300;
  RadarChart.defaultConfig.h = 300;

  data = data.map(function(elem){
    var newData = {};
    newData.className = elem.className || '';
    newData.axes = [];

    $.each(elem.axes, function(key, value){
      var axis = {};
      axis.axis = key;
      axis.value = value;
      newData.axes.push(axis);
    });

    return newData;
  });

  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var svg = d3.select(selector).append('svg')
    .attr('width', cfg.w)
    .attr('height', cfg.h);
  svg.append('g').datum(data).call(chart);
}
