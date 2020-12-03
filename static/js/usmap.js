/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
		
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */


function myFunction(mhData) {
	console.log("now I am here: ", mhData);
	d3.select("#mapsvg").remove();

 //Width and height of map
var width = 960;
var height = 500;

// D3 Projection
var projection = d3.geo.albersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

var color = d3.scale.quantize().domain([0, 120]).range(['lightgreen','green','yellow','orange','teal','navy','blue','orange','purple','red']);

var legendText = [];
// 

//Create SVG element and append map to the SVG
var svg = d3.select("#mapstates")
			.append("svg")
			.attr("id","mapsvg")
			.attr("width", width)
			.attr("height", height);
        
// Append Div for tooltip to SVG
var div = d3.select("#mapstates")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);

// Load in my states data!
d3.json(mhData, function(data) {
color.domain([0,1,3,5,10,50,120]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json("static/data/us-states.json", function(json) {
	console.log("load GeoJSON data")

// Loop through each state data value in the .csv file
for (var i = 0; i < data.length; i++) {

	// Grab State Name
	var dataState = data[i].state;

	// Grab data value 
	var dataValue = 1;
	//console.log("State: ", dataState, " " , dataValue);

	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < json.features.length; j++)  {
		// console.log(json.features[j].id)
		// console.log(json.features[j].properties.name)
		var jsonState = json.features[j].id;
		// console.log(dataState, " ", jsonState);
		if (dataState == jsonState) {
	    //console.log(typeof json.features[j].properties.value)		
		// Copy the data value into the JSON
		if (isNaN(json.features[j].properties.value)) {
		//	console.log('Not a Number!');
			json.features[j].properties.value = 1;
		  } else {
		//  console.log('Is a Number');
		  json.features[j].properties.value ++;
		}
		//console.log(jsonState, "Survey Count: ", json.features[j].properties.value)	
		// Stop looking through the JSON
		break;
		} 
	}
	console.log("Loop finished: ")
}
		

// Bind the data to the SVG and create one path per GeoJSON feature
console.log("bind data",json);
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")

	.on("mouseover", function(d) {     
		console.log("mouseover: ",d)	
		svg.append("text").attr({
			id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
			 x: function() { return xScale(d.x) - 30; },
			 y: function() { return yScale(d.y) - 15; }
		 })
		 .text(function() {
		   return [d.x, d.y];  // Value of the text
		 });
    	div.transition()        
      	   .duration(200)      
           .style("opacity", .9);      
		   //div.text(d.id, d.properties.value)
		   if (isNaN(d.properties.value)) 
		   {
			   value = 0;
			}
		   else
		   {
			   value = d.properties.value
			   // console.log(d.properties.value)
			}
		   div.text(d.properties.name + '\n' + value)	  
		   .style("left", (d3.event.pageX) + "px")     
		   .style("top", (d3.event.pageY - 28) + "px");   
		 })  
	

		 

	//fade out tooltip on mouse out     
	// .on("mouseout", function(d) { 
	// 	div.transition()
	// 	.duration(500)  
	// 	.style("opacity", 0);   
	//    })
	
	.style("fill", function(d) {

	// Get data value
	var value = d.properties.value;
    //console.log("surveyCount: ", value);		
	if (value) {
	//If value exists…
	return color(value);
	} else {
	//If value is undefined…
	return "rgb(213,222,217)";
	}
	
});
console.log("bind date complete ", mhData);

      
// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
//var legend = d3.select("body").append("svg")
//      			.attr("class", "legend")
//     			.attr("width", 140)
//    			.attr("height", 200)
//   				.selectAll("g")
//   				.data(color.domain().slice().reverse())
//   				.enter()
//   				.append("g")
//     			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//  	legend.append("rect")
//   		  .attr("width", 18)
//   		  .attr("height", 18)
//   		  .style("fill", color);

//  	legend.append("text")
//  		  .data(legendText)
//      	  .attr("x", 24)
//      	  .attr("y", 9)
//      	  .attr("dy", ".35em")
//      	  .text(function(d) { return d; });
	});

});

}

mhData = "/test";
console.log("initial load: ",mhData);
myFunction(mhData);


d3.select("#mapselect").selectAll("input").on("change", function() {
	attribute = this.id;
	console.log(attribute);
	if (attribute === 'data_2014') {
		console.log(2014);
		mhData = "/test";
	} 
	if (attribute === 'data_2016') {
		console.log(2016);
		mhData = "/test2";
		console.log(mhData);
	}
	console.log("I am here: ", mhData);
	myFunction(mhData);
});
console.log("After Select: ", mhData);