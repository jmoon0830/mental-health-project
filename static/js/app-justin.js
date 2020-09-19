// link to csv
var file = "static/data/MentalHealth2014.csv";

// open csv
d3.csv(file, function (data) {
    var counter = 0;
    var countYes = 0;
    var countNo = 0;
    var countIdk = 0;
    var statesList = ["Choose a State ..."];
    // loop through each object
    for (var i = 0; i<data.length; i++) {
        // filter by United States
        counter++    
        if (data[i].benefits === "Yes") {
            countYes++
        }
        else if (data[i].benefits === "No") {
            countNo++
        }
        else {
            countIdk++
        }
        // Loop that finds unique states
        if (statesList.includes(data[i].state) === false) {
            statesList.push(data[i].state);
        }
    }
    // count how many United States objects
    console.log("United States Only:");
    console.log(counter);

    // How many answered Yes to Benefits
    console.log(`Yes: ${countYes}`)
    // How many answered No to Benefits
    console.log(`No: ${countNo}`)
    // How Many don't know to Benefits
    console.log(`Don't know: ${countIdk}`)
    // List of Unique States
    console.log(`List of Unique States: ${statesList}`)
    // Adding state options using for loop to HTML
    function htmlBuild () {
        d3.select("#filter-state").selectAll("option").data(statesList).enter().append("option").html(function (data) {
            return `<option value="${data}">${data}</option>`
        })
    };
    htmlBuild();

    function init () {
        var tbody = d3.select("tbody");
        tbody.html("");
        for (var i = 0; i<20; i++) { 
            addData(data[i]);
        }
    };

    init();

    // change data based on filter
    function handleChange () {
        var tbody = d3.select("tbody");
        tbody.html("");
        var dropdown1 = d3.select("#filter-state")
        var dropdownValue = dropdown1.property("value");
        var filteredData = data.filter(survey => survey.state === dropdownValue);
        console.log(filteredData);
        filteredData.forEach(addData);
    };
    // adds data to the table
    function addData (survey) {
        var tbody = d3.select("tbody");
        var row = tbody.append("tr");
            Object.entries(survey).forEach(function([key, value]) {
            var cell = row.append("td");
            cell.text(value);
            });
    };
    var button = d3.select("#filter-btn");
    button.on("click", handleChange);


});

