// Initialize Firebase
var config = {
    apiKey: "AIzaSyDH6XcSwGIuZG76IIBeENEf7pIME9yrv6g",
    authDomain: "train-schedule-83a24.firebaseapp.com",
    databaseURL: "https://train-schedule-83a24.firebaseio.com",
    projectId: "train-schedule-83a24",
    storageBucket: "train-schedule-83a24.appspot.com",
    messagingSenderId: "82306266452"
  };

  firebase.initializeApp(config);
  var database = firebase.database();
  
  var train = "";
  var destination = "";
  var time = 0;
  var monthlyminutes = 0;
  var minutes = 0;
  

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    alert("we clicked the button");
    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    time = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
    //var time = $("#train-time").val().trim();
    minutes = $("#frequency").val().trim();

    var newTrain = {
        train: train,
        destination: destination, 
        time: time, 
        minutes: minutes, 
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

  // Uploads employee data to the database
  database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.time);
    console.log(newTrain.minutes);

    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
});


    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    console.log(childSnapshot.val());

    
    
    trainName = childSnapshot.val().train;
    trainDest= childSnapshot.val().destination;
    trainTime = childSnapshot.val().time;
    trainMin = childSnapshot.val().minutes;
    trainRemainder = childSnapshot.val().minutesAway;
    var freqMin = parseInt(trainMin);
    var dConverted = moment(trainTime, "HH:mm").subtract(1, 'years');    
    var trainMinLeft = moment(dConverted).format("HH:mm");
    var timeConverted = moment(trainMinLeft, "HH:mm").subtract(1, 'years');
    var timeDifference = moment().diff(moment(timeConverted), 'minutes');
    var timeRemain = timeDifference % freqMin;
    var minutesAway = freqMin - timeRemain;
    var nextTrain = moment().add(minutesAway, 'minutes');

    // Console.loging the last user's data
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainMin);

    //emptimePretty = moment.unix(sv.time).format("MM/DD/YYYY");

//Change the HTML to reflect
   var newRow = $("<tr>").append (
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainMin),
    $("<td>").text(moment(nextTrain, 'HH:mm').format("hh:mm a")),
    $("<td>").text(minutesAway + ' Minutes away'),
    

  );

   // Append the new row to the table
  $("#database-list > tbody").append(newRow);
  });

  //function (errorObject) {
  //console.log("Errors handled: " + errorObject.code);