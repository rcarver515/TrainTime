$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyArvZsh7iBbSz-MoKYizTw3OZoOhkShuvY",
    authDomain: "traintime-51aec.firebaseapp.com",
    databaseURL: "https://traintime-51aec.firebaseio.com",
    projectId: "traintime-51aec",
    storageBucket: "traintime-51aec.appspot.com",
    messagingSenderId: "224832151997"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $(".submitButton").on("click",function(event) {
      event.preventDefault();
      console.log("Ready")

      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();
      var frequency = parseInt($("#frequency").val().trim());

      var train = {
          trainName:trainName,
          destination:destination,
          firstTrainTime:firstTrainTime,
          frequency:frequency

      };
      database.ref().push(train)
      $(".form-control").val("");

})
    database.ref().on("child_added",function(childSnapshot){
        
        var trainData = childSnapshot.val()
        var convertedFirstTrainTime = moment(trainData.firstTrainTime,"HH:mm");
        var difference = moment().diff(moment(convertedFirstTrainTime),"minutes");
        var timeRemaining = difference % trainData.frequency;
        var minutesAway = trainData.frequency - timeRemaining;
        var nextArrival = moment().add(minutesAway,"minutes");
        nextArrival = moment(nextArrival).format("HH:mm");

        $("#trainInfo").append(
            `
            <tr>
                    <td>${trainData.trainName}</td>
                    <td>${trainData.destination}</td>
                    <td>${trainData.frequency}</td>
                    <td>${nextArrival}</td>
                    <td>${minutesAway}</td>
                </tr>
            `
        )


    })
})
