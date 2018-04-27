var config = {
    apiKey: "AIzaSyBbgk4LzR7rJY43ka817sS3V-aJ0rFJ9l0",
    authDomain: "email-form-11.firebaseapp.com",
    databaseURL: "https://email-form-11.firebaseio.com",
    projectId: "email-form-11",
    storageBucket: "email-form-11.appspot.com",
    messagingSenderId: "463160700980"
};
firebase.initializeApp(config);
var users;
var exists =false;
$(function () {


//   //Reference username collection
    var userRef = firebase.database().ref('username');
    firebase.database().ref('username').on('value', function (snapshot) {
        users = snapshot.val();

    }, function (err) {
        console.log(err);
    });


 //get values
 var email = $("#Email").val();

//listen for form submit
    document.getElementById('email-form').addEventListener('submit',submitForm);

    function checkIfUserExists(userId) {


        var arr = Object.values(users);

        arr.forEach( function (arrayItem)
        {
            if(arrayItem.user === userId){
                
              console.log(userId);
              exists=true;
            }
        });
        
         userExistsCallback(exists);


    }

    function userExistsCallback(exists) {
        if (exists) {
              //show alert
            document.querySelector('.alert2').style.display ='block';

            //Hide alert after 1 seconds
            setTimeout(function(){
                document.querySelector('.alert2').style.display ='none';
                location.reload(true);
            },1000);
           

        } else {

            //save message
            saveUser(email);

            //show alert
            document.querySelector('.alert').style.display ='block';

            //Hide alert after 1 seconds
            setTimeout(function(){
                document.querySelector('.alert').style.display ='none';
                location.reload(true);
            },1000);

        }
    }






    //fun to get form values
    function getInputVal(id){
        return document.getElementById(id).value;
    }
    //save message to firebase
    function saveUser(email){

        var newUser = userRef.push();
        newUser.set({
            user: email
        })
    }


//Submit form
    function submitForm(e){
        e.preventDefault();

       //get values
       email = $("#Email").val();

        //check if user exist

        checkIfUserExists(email);


    }



});
