var file = "static/data/MentalHealth2014.csv";
// variable counters
var maleCount = 0;
var femaleCount = 0;


// if fam male and yes
var famMYCount = 0;
// if fam male and no
var famMNCount = 0;
// if fam female and yes
var famFYCount = 0;
// if fam female and no
var famFNCount = 0;

var yesCount = 0;

var noCount = 0;



// function to read in data
d3.csv(file,function (data) {
    console.log(data);
    for (var i=0; i<data.length;i++) {
        // if statements that require condition like "Yes" to count
        if (data[i].Gender === "M") {maleCount++}
        if (data[i].Gender === "F") {femaleCount++}
        if (data[i].family_history == "Yes") {yesCount++}
        if (data[i].family_history == "No") {noCount++}
    }
    // check to see if it worked
    for (var i=0; i<data.length;i++) {
        //console.log("for loop")
        if (data[i].Gender === "M") {
            //console.log("male")
            if (data[i].family_history === "Yes") {
                famMYCount++
                //console.log(`famMYCount ${famMYCount}`)
            }
            else {
                famMNCount++
                //console.log(`famMNCount ${famMNCount}`)
            }
        }
        else {
            //console.log("female")
            if (data[i].family_history === "Yes") {
                famFYCount++
                //console.log(`famFYCount ${famFYCount}`)
            }
            else {
                famFNCount++
                //console.log(`famFNCount ${famFNCount}`)
            }
        }
    }

    console.log(famMYCount, famMNCount)
    console.log(famFYCount, famFNCount)

    let myChart1 = document.getElementById("myChart").getContext('2d');
    let chart1 = new Chart(myChart1, {
        type: 'bar',
        data: {
            labels: ["Family History"],
            datasets: [{

                label: "Male",
                backgroundColor: "#3e95cd",
                data: [famMYCount,famMNCount],
        }, {
                label: "Female",
                backgroundColor: "#8e5ea2",
                data: [famFYCount,famFNCount]
        },
    ],
    borderWidth: 1

    },
    options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            
            }
        }]
    }
    }
    });

});



