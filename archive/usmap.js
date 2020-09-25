// open csv
var file = "static/data/MentalHealth2014.csv"
d3.csv(file, function (data) {
    var stateList = [];
    //var allStates = [];
    var stateCount = [];
    //console.log(data);
    for(var i=0; i<data.length; i++) {
        if (stateList.includes(data[i].state) === false) {
            stateList.push(data[i].state);
            stateCount.push(1);
        } else {
            stateCount[stateCount.length-1] ++;
        }
        //allStates.push(data[i].state);
    }
    // List of Unique States
    console.log(`List of Unique States: ${stateList}`)
    console.log(`Count of Unique States: ${stateCount}`)
    //console.log(`List of Unique States: ${allStates}`)
})

// Set params and queue map files
// Map variables
var width = 580,
  height = 450,
  svg = d3.select('body').append('svg')
    .attr('width', '100%')
    .attr('viewBox', '0 0 ' + width + ' ' + height),

// Data variables
dataPath = 'static/data/MentalHealth2014.csv',
stateCode = 'static/data/state_codes.csv'
stateId = 'state',
stateName = ' ',
state = ' ',
observation = 'value',
rangeTruncated = true,
divergent = true,

  
// Define increments for data scale
min = 75, //Floor for the first step
max = 125, //Anything above the max is the final step
steps = 11, //Final step represents anything at or above max
increment = (max - min) / (steps - 1),

// Color variables
borderColor = '#fff', //Color of borders between states
noDataColor = '#ddd', //Color applied when no data matches an element
lowBaseColor = '#d73027', //Color applied at the end of the scale with the lowest values
midBaseColor = '#ffffbf';
highBaseColor = '#4575b4';

var sequentialDomain = [0, steps - 1];
var divergentDomain = [0, (steps - 1)/2, steps - 1];
var sequentialRange = [lowBaseColor, highBaseColor];
var divergentRange = [lowBaseColor, midBaseColor, highBaseColor];

// Create distinct colors for each increment based on two base colors
var colors = [],
  //Color applied at the end of the scale with the highest values
  scaleColor = d3.scale.linear()
    .domain(divergent ? divergentDomain : sequentialDomain)
    .range(divergent ? divergentRange : sequentialRange)
    .interpolate(d3.interpolateHsl); //Don't like the colors you get? Try interpolateHcl or interpolateHsl!


var tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('opacity', 0);

var projection = d3.geo.albersUsa()
  .scale(width * 1.2)
  .translate([width / 2, height - height * 0.6]);


  var path = d3.geo.path()
  .projection(projection);

var mapColor = d3.scale.quantize()
  .domain([min, max + increment]) //Uses max+increment to make sure cutoffs between steps are correct
  .range(colors);

var map = svg.append('g')
  .attr('class', 'counties');

var legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform', 'translate(0,' + (height - height * 0.1) + ')');

 // used to load multiple files 
queue()
  .defer(d3.json, 'static/data/states-10m.json')
  .defer(d3.csv, stateCode)
  .await(ready);

// Map-building functions
function ready(error, us, data) {
  if (error) return console.error(error);
console.log("State Objects: ", us.objects.states)

  map.selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
  .enter().append('path')
    .attr('d', path)
   .attr('fill', noDataColor)
  //  .attr('fill', 'red')
    .attr('id', function (d) { return 'state' + d.id; });

  data.forEach(function (d) {
    console.log('data function', d)
    //console.log('State Name: ', stateName)
     d3.select('#state' + parseInt(d[stateId])) 
      .style('fill', mapColor(parseFloat(d[observation])))
      .on('mouseover', function () { return addTooltip(d[state], parseFloat(d[id])); })
      .on('mouseout', function (d) { tooltip.transition().duration(200).style('opacity', 0); });
  });

  map.append('path')
    .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
    .attr('fill', 'none')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .attr('d', path);

  drawLegend();
}

var adjustment = d3.scale.linear()
        .domain([0, window.innerWidth])
        .range([0, 150]);

function addTooltip(label, number) {
  tooltip.transition()
  .duration(200)
  .style('opacity', 0.9);
  tooltip.html(
  label + ': ' + (typeof(+number) === 'number' ? tooltipDataType(number) : 'No Data')
  )
  .style('left', (d3.event.pageX - adjustment(d3.event.pageX)) + 'px')
  .style('top', (d3.event.pageY + 50) + 'px');
}

function drawLegend() {
  var legendData = [{'color': noDataColor, 'label': 'No Data'}],
    legendDomain = [],
    legendScale,
    legendAxis;

  if (rangeTruncated) {
    for (var i = 0, j = colors.length; i < j; i++) {
      var fill = colors[i];
      var label = legendDataType(min + increment * i)
        + (
          i === j - 1 ? '+' : '-'
          + legendDataType(min + increment * (i + 1))
        );
      legendData[i + 1] = { color: fill, label: label };
    }
  } else {
    for (var i = 0, j = colors.length; i < j; i++) {
      var fill = colors[i];
      var label = legendDataType(min + increment * i);
      legendData[i + 1] = { color: fill, label: label };
    }
  }

  for (var k = 0, x = legendData.length; k < x; k++) {
    legendDomain.push(legendData[k].label);
  }

  legendScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2)
    .domain(legendDomain);

  legendAxis = d3.svg.axis()
    .scale(legendScale)
    .orient('bottom');

  legend.call(legendAxis);

  legend.selectAll('rect')
    .data(legendData)
  .enter()
    .append('rect')
    .attr('x', function (d) {return legendScale(d.label);})
    .attr('y', -30)
    .attr('height', 30)
    .attr('class', 'legend-item')
    .transition()
    .duration(700)
    .attrTween('width', function () {return d3.interpolate(0, legendScale.rangeBand());})
    .attrTween('fill', function (d) {return d3.interpolate('#fff', d.color);});
} 

// List of Unique States
//console.log(`List of Unique States: ${statesList}`)





//onEachFeature: function(feature, layer) {
    // var text = L.tooltip({
    //     permanent: true,
    //     direction: 'center',
    //     className: 'text'
    // })
    // .setContent("some text")
    // .setLatLng(layer.getLatLng());
    // text.addTo(Classroomsbyamount);

    // rest of your code
//}