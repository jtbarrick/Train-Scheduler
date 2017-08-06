  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAVwFj7k09yRSsBjbYMtdad16LXlGT7LD0",
    authDomain: "trainscheduler-762f5.firebaseapp.com",
    databaseURL: "https://trainscheduler-762f5.firebaseio.com",
    projectId: "trainscheduler-762f5",
    storageBucket: "gs://trainscheduler-762f5.appspot.com",
    messagingSenderId: "124239659476"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var departureTime = moment($("#train-time-input").val().trim()).format('LT');
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: departureTime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newdTrain.name);
  console.log(newdTrain.destination);
  console.log(newdTrain.time);
  console.log(newdTrain.frequency);

  // Alert
  alert("New Train Successfully Added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var departureTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(departureTime);
  console.log(frequency);

  // // Prettify the Train time
  var trainDeparturePretty = moment.unix(departureTime).format('LT');

  // Calculate the time to next arrival
  // To calculate the next arrival
  var nextArrival = moment().diff(moment.unix(departureTime, "X"), "minutes");
  console.log(nextArrival);

  // Calculate the minutes away
  var minutesAway = departureTime - nextArrival;
  console.log(minutesAway);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainDeparturePretty + "</td><td>" + trainDeparturePretty + "</td><td>" + frequency + "</td><td>" + minutesAway + "</td></tr>");
});