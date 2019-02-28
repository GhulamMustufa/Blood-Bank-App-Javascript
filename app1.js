//firebase database
var database = firebase.database().ref();



// all blood requests from database to dashboard

var targetLocation = database.child(`Blood Requests`);
targetLocation.on(`child_added`, function(snapshot) {
    // console.log(snapshot.val());
    // console.log(snapshot.key);
    var obj = snapshot.val();
    obj.objKey = snapshot.key;
  });