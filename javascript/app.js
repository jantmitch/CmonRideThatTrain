var config = {
    apiKey: "AIzaSyAMtBovRPA35cueRVVIWi1XeII4z5FeuzM",
    authDomain: "cmonridethattrain.firebaseapp.com",
    databaseURL: "https://cmonridethattrain.firebaseio.com",
    projectId: "cmonridethattrain",
    storageBucket: "",
    messagingSenderId: "382238641006"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

database.ref().on("value", function(snapshot) {
    // console.log(snapshot.val());
});

database.ref().on("child_added", function(snapshot) {
    var newtrain = snapshot.val().trainName;
    var newdestination = snapshot.val().destination;
    var newTrainTime = snapshot.val().firstTrain;
    var newFrequency = snapshot.val().frequency;

    createRow(newtrain,newdestination,newTrainTime,newFrequency);
});

var createRow = function(newtrain,newdestination,newTrainTime,newFrequency) {

    var tBody = $("tbody");
    var tRow = $("<tr>");

    var trainTd = $("<td>").text(newtrain);
    var destinationTd = $("<td>").text(newdestination);
    var trainTimeTd = $("<td>").text(newTrainTime);
    var frequencyTd = $("<td>").text(newFrequency);

    tRow.append(trainTd, destinationTd, trainTimeTd, frequencyTd);

    tBody.append(tRow);
  };

  $("#submit").on("click", function() {

    event.preventDefault();
    
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    // console.log(trainName, destination, firstTrain, frequency);
});

database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });