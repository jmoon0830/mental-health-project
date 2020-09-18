// link to csv
var link  = "survey.csv";

// open csv
d3.csv(link, function (data) {
    var counter = 0;
    var countYes = 0;
    var countNo = 0;
    var countIdk = 0;
    // loop through each object
    for (var i = 0; i<data.length; i++) {
        // filter by United States
        if (data[i].Country === "United States") {
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
        }
        //console.log(data[i]);
    }
    // count how many United States objects
    console.log("United States Only:");
    console.log(counter);

    //How many answered Yes to Benefits
    console.log(`Yes: ${countYes}`)
    //How many answered No to Benefits
    console.log(`No: ${countNo}`)
    //How Many don't know to Benefits
    console.log(`Don't know: ${countIdk}`)
});
