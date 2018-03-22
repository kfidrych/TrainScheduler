var config = {
    apiKey: "AIzaSyDJP6X8KsKQStydXQ0RVKjMY_0gL5-Z19o",
    authDomain: "trainscheduler-73f05.firebaseapp.com",
    databaseURL: "https://trainscheduler-73f05.firebaseio.com",
    projectId: "trainscheduler-73f05",
    storageBucket: "",
    messagingSenderId: "982944364880"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function() {
    event.preventDefault();
    var name = $("#newName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
})

database.ref().on("child_added", function(snapshot) {
    var firstTime = snapshot.val().firstTrainTime;
    var tFrequency = snapshot.val().frequency;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minutesAway = tFrequency - tRemainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    $("tbody").append("<tr><th>" + snapshot.val().name + "</th><th>" + 
    snapshot.val().destination + "</th><th>" + snapshot.val().frequency + 
    "</th><th>" + nextArrival + "</th><th>" + minutesAway + "</th></tr>")
})