// link to csv
var file = "/test";
var file2 = "/test2";

listStates = ["Choose a State ...","AK","AL","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
                "NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

function init () {
    d3.json(file, function (data) {
        // Adding state options using for loop to HTML
        function htmlBuild () {
            d3.select("#filter-state").selectAll("option").data(listStates).enter().append("option").html(function (data) {
                return `<option value="${data}">${data}</option>`
            })
        };
        htmlBuild();
    });
};

init();

//adds only 10 rows of data
function initTable () {
// 2014
    d3.json(file, function (data) {
        var tbody = d3.select("#table1").select("tbody");
        tbody.html("");
        for (var i = 0; i<10; i++) { 
            addData(data[i]);
        }
    });
// 2016
    d3.json(file2, function (data) {
        var tbody = d3.select("#table2").select("tbody");
        tbody.html("");
        for (var i = 0; i<10; i++) { 
            addData2(data[i]);
        }
    });
};

initTable();

// adds 2014 data to the table
function addData (survey) {
    var tbody = d3.select("#table1").select("tbody");
    var row = tbody.append("tr");
        Object.entries(survey).forEach(function([key, value]) {
        var cell = row.append("td");
        cell.text(value);
        });
};

// adds 2016 data to the table
function addData2 (survey) {
    var tbody = d3.select("#table2").select("tbody");
    var row = tbody.append("tr");
        Object.entries(survey).forEach(function([key, value]) {
        var cell = row.append("td");
        cell.text(value);
        });
};


// change data based on filter
function handleChange () {
    function changeTable1 () {
        d3.json(file, function(data) {
            var tbody = d3.select("#table1").select("tbody");
            tbody.html("");
            var dropdown1 = d3.select("#filter-state");
            var dropdownValue1 = dropdown1.property("value");
            var filteredStateData = data.filter(survey => survey.state === dropdownValue1);
            filteredStateData.forEach(addData);
        });
    };
    changeTable1();
    function changeTable2 () {
        d3.json(file2, function(data) {
            var tbody = d3.select("#table2").select("tbody");
            tbody.html("");
            var dropdown1 = d3.select("#filter-state");
            var dropdownValue1 = dropdown1.property("value");
            var filteredStateData = data.filter(survey => survey.state === dropdownValue1);
            filteredStateData.forEach(addData2);
        });
    };
    changeTable2();
};

var button = d3.select("#filter-btn");
button.on("click", handleChange);



function addPieChart (value) {
    var trace1 = {
        values: [value,(data.length - value)],
        labels: ["Yes","No"],
        type:"pie"
    }

    var layout = {}

    var plotData = [trace1];
    Plotly.newPlot("plot",plotData)
};


function addChart (f,div,title) {
    var coworkersCount = 0
    var supervisorCount = 0
    var anonymityCount = 0

    d3.json(f,function (data) {
        for (var i=0; i<data.length;i++) {
            if (data[i].coworkers === "Yes") {coworkersCount++}
            if (data[i].supervisor === "Yes") {supervisorCount++}
            if (data[i].anonymity === "Yes") {anonymityCount++}
        }

        function addPieChart () {

            var allValues = [
                [coworkersCount,(data.length - coworkersCount)],
                [supervisorCount,(data.length - supervisorCount)],
                [anonymityCount,(data.length - anonymityCount)]
            ];
            var trace1 = {
                title:"Coworkers",
                values: allValues[0],
                labels: ["Yes","No"],
                type:"pie",
                name: "Coworkers",
                domain: {
                    row:0,
                    column:0
                },
                hoverinfo: 'label+percent+name',
                textinfo: 'none'
            };
            var trace2 = {
                title:"Supervisors",
                values: allValues[1],
                labels: ["Yes","No"],
                type:"pie",
                name: "Supervisors",
                domain: {
                    row:0,
                    column:1
                },
                hoverinfo: 'label+percent+name',
                textinfo: 'none'
            };
            var trace3 = {
                title:"Anonymity",
                values: allValues[2],
                labels: ["Yes","No"],
                type:"pie",
                name: "Anonymity",
                domain: {
                    row:1,
                    column:0
                },
                hoverinfo: 'label+percent+name',
                textinfo: 'none'
            };
            var layout = {
                height: 500,
                width: 500,
                title: title,
                grid: {rows:2, columns:2}
            };
            var plotData = [trace1,trace2,trace3];
            Plotly.newPlot(div,plotData,layout)
        };        
        addPieChart();
    });
};

addChart(file,"2014-pies","2014");
addChart(file2,"2016-pies","2016");