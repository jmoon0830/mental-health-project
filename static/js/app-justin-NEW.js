// link to csv
var file = "static/data/MentalHealth2014.csv";
var file2 = "static/data/MentalHealth2016.csv";

listStates = ["Choose a State ...","AK","AL","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
                "NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

function init () {
    d3.csv(file, function (data) {
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
    d3.csv(file, function (data) {
        var tbody = d3.select("#table1").select("tbody");
        tbody.html("");
        for (var i = 0; i<10; i++) { 
            addData(data[i]);
        }
    });
// 2016
    d3.csv(file2, function (data) {
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
        d3.csv(file, function(data) {
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
        d3.csv(file2, function(data) {
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

function addChart () {
    var coworkersCount = 0
    var supervisorCount = 0
    var anonymityCount = 0
    d3.csv(file,function (data) {
        for (var i=0; i<data.length;i++) {
            if (data[i].coworkers === "Yes") {coworkersCount++}
            if (data[i].supervisor === "Yes") {supervisorCount++}
            if (data[i].anonymity === "Yes") {anonymityCount++}
        }
        console.log(data.length)
        console.log(coworkersCount);
        console.log(supervisorCount);
        console.log(anonymityCount);
    });
};

addChart();