
var detailData;
var uid;
var pPhone;
var firebaseConfig = {
apiKey: "AIzaSyD0N6h9XOCl96usVGanwWhL0YjH-9Ya-zY",
authDomain: "tsec-a2279.firebaseapp.com",
databaseURL: "https://tsec-a2279.firebaseio.com",
projectId: "tsec-a2279",
storageBucket: "tsec-a2279.appspot.com",
messagingSenderId: "392629182860",
appId: "1:392629182860:web:4b5459c449e8b3f6b476a9"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();



function getData(){
var query = firebase.database().ref("seller").orderByKey();
    query.once("value")
    .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            console.log(key);
            var phone = childSnapshot.child("phone").val();
            var data = childSnapshot.val().inStock;
            console.log(data);
            var keys = Object.keys(data);
            // console.log(keys);

            for(var i=0;i<keys.length;i++){
                console.log(keys[i]);
                var imgContainer = document.createElement('img');
                imgContainer.src = "Pictures/"+keys[i]+".jpg";
                var anchor = document.createElement('a');
                anchor.target = "_blank";
                anchor.href = "details.html";
                anchor.appendChild(imgContainer);

                var descDiv = document.createElement('div');
                descDiv.className = "desc";
                descDiv.innerHTML = keys[i] + " " + key;
                var divInner = document.createElement('div');
                divInner.className = "gallery";
                divInner.appendChild(anchor);
                divInner.appendChild(descDiv);
                var divOuter = document.createElement('div');
                divOuter.className = "responsive";
                  divOuter.appendChild(divInner);

                  document.body.appendChild(divOuter);
               
                
                
            }
            // ref.child("buyer/uid/payment").push(data);


    
});
    }).catch((err) => {
    console.log("Unexpected error:",error)
    })

}



function savetoDB( order, payment){


   firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    console.log("signed in")
    console.log(user.phoneNumber)
    pPhone = user.phoneNumber;


var query = firebase.database().ref("buyer").orderByKey();
    query.once("value")
    .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var phone = childSnapshot.child("phone").val();
            if(phone == pPhone){
            uid = key;
            console.log(uid);
            // ref.child
            var data ={
                orderKey:order,
                payment:payment
            }
var ref = database.ref('buyer/'+ uid+'/payment');
// var ref = database.ref('seller/'+)
ref.push(data);
            // ref.child("buyer/uid/payment").push(data);


    }
});
    }).catch((err) => {
    console.log("Unexpected error:",error)
    })
} else {
console.log("sign out")
// No user is signed in.
}
});

}


function paymentProcess() {
   var key_id =  'rzp_test_TUTqc1AxGpYDDJ';
   var key_secret =  'PzRcOhwY657HTOUwSBr1NayQ';
   var order_id =  Math.random().toString(36).substr(2, 16);
    var options = {
        "key": key_id, // Enter the Key ID generated from the Dashboard
        "amount": 320*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
        "currency": "INR",
        "name": "TSEC",
        "description": "DEMO",// Replace this with the order_id created using Orders API (https://razorpay.com/docs/api/orders).
        "handler": function (response){
            console.log(response.razorpay_payment_id);
            savetoDB(order_id,response.razorpay_payment_id);
            // $('#myModal').modal();
        },
        "prefill": {
            "name": "Ajit yadav",
            "email": "ajityadav.15399@gmail.com",
            "contact": "+919028422147"
        },
        "notes": {
            "address": "note value"
        },
        "theme": {
            "color": "#9932CC"
        }
    }
    var propay = new Razorpay(options);
    propay.open();
}

$("#target").on("click", "div", function() {
    //var ClickImageId = $(this).attr('className');
    detailData = $(this).text();
    // console.log(detailData)
    var d = detailData.split(" ");
    console.log(d)
    // var path = "currentData/";
    var ref = database.ref('currentData');
    var dd = {
        uid:d[1],
        crop:d[0]
    }
     ref.child(d[1]).set(dd);
})