// declaring variables
var InputEmailSignup;
var InputPasswordSignup;
var InputUserNameSignup;
var InputEmailLogin;
var InputPasswordLogin;
var auth = firebase.auth(); 


//firebase database
var database = firebase.database().ref();

var signUp = () => {
    InputUserNameSignup = document.getElementById("InputUserNameSignup").value;
    InputEmailSignup = document.getElementById("InputEmailSignup");
    InputPasswordSignup = document.getElementById("InputPasswordSignup");
    InputEmailLogin = document.getElementById("InputEmailLogin");
    InputPasswordLogin = document.getElementById("InputPasswordLogin");
    var email = InputEmailSignup.value;
    var  password = InputPasswordSignup.value;
// copying email/password from signup to login
    InputEmailLogin.value = email;
    InputPasswordLogin.value = password;
// firebase Authenciation Sign up

auth.createUserWithEmailAndPassword(email, password)
.catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
if (errorCode == 'auth/weak-password') {
alert('The password is too weak.');
} else {
alert(errorMessage);
}
console.log(error);
});

// firebase Authenciation Sign up
// closing modal
    $('#SignupModal').modal('hide');
// var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
// promise.catch(e => console.log(e.message));

// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser) {
//         console.log(firebaseUser);
//     }
//     else {
//         console.log("not logged in");
//     }
// })





}
var login = () => {
    InputEmailLogin = document.getElementById("InputEmailLogin");
    InputPasswordLogin = document.getElementById("InputPasswordLogin");
    var loginemail = InputEmailLogin.value;
    var loginpassword = InputPasswordLogin.value;


    var databaseLoginUsers = {
        // Name: InputUserNameSignup,
        Email: loginemail,
        Password: loginpassword
    }

    // firebase login
    firebase.auth().signInWithEmailAndPassword(loginemail, loginpassword)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Try again Wrong password.');
  } else {
    alert(`Try again ${errorMessage}`);
  }
  console.log(error);
})
    // firebase login
    // getting data of user
    .then(user => {
       
        if(user) {
                    console.log(user);
                    console.log(user.uid);
                    location = 'userhome.html';
                    // firebase database
                    // getting username email to database
                    var dbUser = database.child(`users/` + user.uid);
                    dbUser.set(databaseLoginUsers);

                }
                else {
                    console.log("not logged in");
                }
        
    })

    // realtime changer
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if(firebaseUser) {
    //         console.log(firebaseUser);
    //         console.log(firebaseUser.uid);
    //         // location = 'userhome.html'
    //     }
    //     else {
    //         console.log("not logged in");
    //     }
    // })
    // getting data of user







}

// getting div by id
var bloodRequestDiv = document.getElementById(`bloodRequestDiv`);


// userhome
// blood request
var bloodRequestData = {};

var bloodRequestSubmit = () => {
    // alert("ssss")
    bloodRequestData = {
        PatientName: document.getElementById("PatientName").value,
        BloodGroup: document.getElementById("BloodGroup").value,
        City: document.getElementById("City").value,
        DoctorName: document.getElementById("DoctorName").value,
        HospitalNameAddress: document.getElementById("HospitalNameAddress").value,
        PatientContactName: document.getElementById("ContactName").value,
        ContactNumber: document.getElementById("ContactNumber").value,
        ContactEmailID: document.getElementById("ContactEmailID").value,
        AdditionalInformation: document.getElementById("AdditionalInformation").value,
        WhenRequired: document.getElementById("WhenRequired").value
    }
    console.log(bloodRequestData);
// database
// setting blood request in database

var databaseBloodRequest = database.child(`Blood Requests`);
databaseBloodRequest.push(bloodRequestData);


    // closing modal
    $('#SignupModal').modal('hide');
}


// all blood requests from database to dashboard

var targetLocation = database.child(`Blood Requests`);
targetLocation.on(`child_added`, function(snapshot) {
    // console.log(snapshot.val());
    // console.log(snapshot.key);
// creating requests

    var obj = snapshot.val();
    obj.objKey = snapshot.key;
// cards

    var div1 = document.createElement(`DIV`);
    div1.setAttribute(`class`, `card`);

    var div2 = document.createElement(`DIV`);
    div2.setAttribute(`class`, `card-block`);
    div2.setAttribute(`class`, `container`);

    var divRow = document.createElement(`DIV`);
    divRow.setAttribute(`class`, `row`);

    var div3 = document.createElement(`DIV`);
    div3.setAttribute(`class`, `col-sm-6`);

    var div4 = document.createElement(`DIV`);
    div4.setAttribute(`class`, `col-sm-6`);
   

    
// name
    var BloodrequestName = document.createElement(`P`);
    var BloodrequestNameText = document.createTextNode(`Patient: ${obj.PatientName}`)
    BloodrequestName.appendChild(BloodrequestNameText);
    
// location
    var BloodrequestLocation = document.createElement(`P`);
    var BloodrequestLocationText = document.createTextNode(`Location: ${obj.City}`)
    BloodrequestLocation.appendChild(BloodrequestLocationText);

//  blood group
    var BloodrequestGroup = document.createElement(`P`);
    var BloodrequestGroupText = document.createTextNode(`${obj.BloodGroup}`)
    BloodrequestGroup.appendChild(BloodrequestGroupText);
    BloodrequestGroup.setAttribute(`class`, `colorred`);

//  date
var BloodrequestDate = document.createElement(`P`);
var BloodrequestDateText = document.createTextNode(`when required: ${obj.WhenRequired}`)
BloodrequestDate.appendChild(BloodrequestDateText);

// DR
var BloodrequestDR = document.createElement(`P`);
var BloodrequestDRText = document.createTextNode(`DR: ${obj.DoctorName}`)
BloodrequestDR.appendChild(BloodrequestDRText);

// num
var Bloodrequestnum = document.createElement(`P`);
var BloodrequestnumText = document.createTextNode(`Contact: ${obj.ContactNumber}`)
Bloodrequestnum.appendChild(BloodrequestnumText);

// mail
var Bloodrequestmail = document.createElement(`P`);
var BloodrequestmailText = document.createTextNode(`Email: ${obj.ContactEmailID}`)
Bloodrequestmail.appendChild(BloodrequestmailText);

// hospital
var Bloodrequesthospital = document.createElement(`P`);
var BloodrequesthospitalText = document.createTextNode(`Hospital: ${obj.HospitalNameAddress}`)
Bloodrequesthospital.appendChild(BloodrequesthospitalText);




    div3.appendChild(BloodrequestName);
    div3.appendChild(BloodrequestLocation);
    div3.appendChild(BloodrequestDR);
    div3.appendChild(Bloodrequesthospital);


    div4.appendChild(BloodrequestGroup);
    div4.appendChild(BloodrequestDate);
    div4.appendChild(Bloodrequestnum);
    div4.appendChild(Bloodrequestmail);

    divRow.appendChild(div3); 
    divRow.appendChild(div4);
    
    div2.appendChild(divRow);
    div1.appendChild(div2);
    bloodRequestDiv.appendChild(div1);
   
  });

