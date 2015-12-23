//////////////////////////// Graph Start
function graph01 (dataset) {
      //Width and height
var w = 600;
var h = 250;

// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
//         11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, w], 0.05);
var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

//Create SVG element
var svg = d3.select("#ggraph")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return xScale(i);
   })
   .attr("y", function(d) {
      return h - yScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
      return yScale(d);
   })
   .attr("fill", function(d) {
    return "rgb(0, 0, " + (d * 10) + ")";
   });
//Create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
      return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
      return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");
};
//////////////////////////// Graph end

var app = angular.module('myApp', []);
var jobbToSave;
var testVar = "testest";

app.controller('customersCtrl', function($scope, $http) {
  $scope.asd = "asdfasdf";
	var jobName;
	$scope.jobToSave = jobbToSave;

	$scope.submitJob = function() {
		jobName = $scope.jobTitle;
		callApi(jobName);	

		$scope.saveSearch = function() {
		 	console.log('clicked', jobName);
      
        var jobbToSave = $("h5").html();
        console.log("jobbToSavew",jobbToSave);

	  		$http.post('/jobs/new', {
		  		userName: "aaa",
		  		jobName: jobName,
		  		selectedList: jobbToSave,
		  		joblist: $scope.jobs	  		
	  	})
	  		.success(function(response){
	  			console.log('success!');
	  			console.log(response);
	  		})
	  		.error(function(error){
			  console.log(error);
		  	});		 	
		};
	};

  var callApi = function (jobName) {
	  webAddress = "https://api.usa.gov/jobs/search.json?query=" + jobName + "+jobs"
	  $http.get(webAddress)
	  .success(function(response) {
	  	console.log(response)
	  	$scope.jobs = response;
	  }).error(function(error){
	  	console.log(error)
	  })
	};//end of callAPi

});

// Google Map start

var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();

function initialize(location_array_array) {
 var locations = location_array_array;
 console.log("google", locations);
  map = new google.maps.Map(
    document.getElementById("map_canvas"), {
      center: new google.maps.LatLng(40.7127, -74.0059),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  geocoder = new google.maps.Geocoder();

  for (i = 0; i < locations.length; i++) {
    geocodeAddress(locations, i);
  }
}
google.maps.event.addDomListener(window, "load", initialize);

function geocodeAddress(locations, i) {
  var title = locations[i][0];
  var address = locations[i][1];
  var url = locations[i][2];
  geocoder.geocode({
      'address': locations[i][1]
    },

    function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
          map: map,
          position: results[0].geometry.location,
          title: title,
          animation: google.maps.Animation.DROP,
          address: address,
          url: url
        })
        infoWindow(marker, map, title, address, url);
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
      } else {
        alert("geocode of " + address + " failed:" + status);
      }
    });
}

function infoWindow(marker, map, title, address, url) {
  google.maps.event.addListener(marker, 'click', function() {
    var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
    iw = new google.maps.InfoWindow({
      content: html,
      maxWidth: 350
    });
    iw.open(map, marker);
  });
}

function createMarker(results) {
  var marker = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
    map: map,
    position: results[0].geometry.location,
    title: title,
    animation: google.maps.Animation.DROP,
    address: address,
    url: url
  })
  bounds.extend(marker.getPosition());
  map.fitBounds(bounds);
  infoWindow(marker, map, title, address, url);
  return marker;
}

// Google Map ends



$(function(){
	$('div').on("click",".jobb",  function(){
		var jobbToSave = $(this).html();
		$('h5').html(jobbToSave);
    var dataArray = [];
    $('#tr .min').each(function() {
      dataArray.push($(this).html());
    })
    console.log("dataset========",dataArray);
    graph01(dataArray);
	});

  $('.address').on("click", this, function() {

    location_array_array = [];
    location_array = ['Location 1 Name'];
    console.log(this);
    var clickedLocation = $(this).html();
    console.log(Array.isArray(this));
    location_array.push(clickedLocation);
    location_array.push('Location 1 URL');
    location_array_array.push(location_array);
    console.log(location_array_array);
    initialize(location_array_array);
    // location.push("url---");
    // console.log(location);
    $("h2.test").html(location_array_array);
  });

  var to, subject, text;
  $('td').on("click", '.email', function() {
    num = $(this).attr("iter");
    selIDnum = "#a"+num;

    to = $("#emailInput").val();
    subject = "These are the jobs you selected."
    text = $(selIDnum).html();

    console.log(text);
    $.get("http://damp-fjord-8597.herokuapp.com/send", {
      to:to, subject:subject, text:text
    }, function(data) {
      console.log(data);
    })
  })



})

