var uid;
var crop;
var showData;
var split;
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

    var query = firebase.database().ref("currentData").orderByKey();
    query.once("value")
    .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.val());
                 crop = childSnapshot.val().crop;
                 uid = childSnapshot.val().uid;
                console.log(crop +" "+uid)

                var query = firebase.database().ref("seller").orderByKey();
                query.once("value")
                .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key;
                            if(key == uid){
                                var data = childSnapshot.val().inStock;
                                var keys = Object.keys(data);
                                console.log(keys);
                                for(var i=0;i<keys.length;i++){
                                    var splitData = data[keys[i]].split(" ");
                                    // splitData.split(" ");
                                     showData =  "name " + splitData[0] + " quantity " + splitData[1] + " price " + splitData[2];
                                     var cutdata = document.getElementById('kg').value;
                                     splitData[1] -= cutdata;
                                     document.getElementById("details").innerHTML = showData;

                                    //  var dataDiv = document.createElement("div");
                                    //  dataDiv.innerHTML = showData;
                                    // dataDiv.className = dataDiv;
                                    //  document.body.appendChild(dataDiv);

                                    split = splitData;

                                //     var cutdata = document.getElementById('kg').value;
                                //     splitData[1] -= cutdata;
                                //     showData =  "name " + splitData[0] + " quantity " + splitData[1] + " price " + splitData[2];
                                //        console.log(showData)
                                //     document.getElementById("details").innerHTML = showData;
                                   
                                //     var ref = database.ref('seller/'+key+'inStock/'+splitData[0]);
                                //    ref.child(splitData[0]).set(splitData[0]+" "+splitData[1]+" "+splitData[2]);



                                    console.log("keys "+data[keys[i]]);
                                }
                            }
                        });
                    }).catch((err) => {
                    console.log("Unexpected error:",error)
                    })

                var row = document.createElement('div');
                row.className = "row";
                var rowColumn = document.createElement('div');
                rowColumn.className = "column left";
                var imgContainer = document.createElement('img');
                imgContainer.src = "Pictures/"+crop+".jpg";
                rowColumn.appendChild(imgContainer);
                row.appendChild(rowColumn)

                // descDiv.innerHTML = keys[i] + " " + key;
                var divInner = document.createElement('div');
                divInner.className = "text";
                divInner.appendChild(imgContainer);
                // divInner.appendChild(descDiv);
                var divOuter = document.createElement('div');
                divOuter.className = "column right";
                divOuter.appendChild(divInner);
                row.appendChild(divOuter)
                document.body.appendChild(row);
                document.getElementById("dyno").appendChild(row);

                var ref = database.ref("currentData").child(uid).remove();

            });
        }).catch((err) => {
        console.log("Unexpected error:",error)
        })
// console.log(crop+" "+uid);

function savetoDB( order, payment){

console.log("split data" +split);

                                //     document.getElementById("details").innerHTML = showData;
                                   
                                //     var ref = database.ref('seller/'+key+'inStock/'+splitData[0]);
                                //    ref.child(splitData[0]).set(splitData[0]+" "+splitData[1]+" "+splitData[2]);

    firebase.auth().onAuthStateChanged(function(user) {
 if (user) {
     console.log("signed in")
     console.log(user.phoneNumber)
     pPhone = user.phoneNumber;
 
 
 var query = firebase.database().ref("buyer").orderByKey();
     query.once("value")
     .then(function(snapshot) {
         var Buid;
             snapshot.forEach(function(childSnapshot) {
             var key = childSnapshot.key;
             var phone = childSnapshot.child("phone").val();
             if(phone == pPhone){
             Buid = key;
             console.log(Buid);
             // ref.child
             var data ={
                 orderKey:order,
                 payment:payment
             }
 var ref = database.ref('buyer/'+ Buid+'/payment');
 // var ref = database.ref('seller/'+)
 ref.push(data);
 var ref = database.ref('seller/'+uid+'/payment');
 ref.push(data);

 var upData = document.getElementById("kg").value;
 split[1] = split[1]-(upData);
 console.log(split);

//  var ref = database.ref('seller/'+uid+'/inStock/').child(split[0]).remove();

var ref = database.ref('seller/'+uid+'/inStock');
var data = split[0]+" "+split[1]+" "+split[2];
ref.child(split[0]).set(data);




// ref.child("buyer/uid/payment").push(data);
// var query = firebase.database().ref("seller").orderByKey();
//     query.once("value")
//     .then(function(snapshot) {
//             snapshot.forEach(function(childSnapshot) {
//             var key = childSnapshot.key;
                // console.log("UIDUID "+uid);
            // if(uid == key){
            //     var data = childSnapshot.val().inStock;
            //     console.log(data);
            //     var keys = Object.keys(data);
            //     for(var i=0;i<keys.length;i++){
            //         var fromDb =  data[keys[i]].split(" ");
            //         // if(fromDb[0] == splitData[0]){
            //                 // var ref = database.ref('seller/'+uid+'inStock/'+splitData[0]);
            //                 // ref.child(splitData[0]).set(splitData[0]+" "+splitData[1]+" "+splitData[2]);

                        
            //         // }
                
            //     }
            // }

    //     })
    // }).catch((err) => {
    //     console.log("Unexpected error:",error)
    //     })













 
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
         "amount": 320*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or â‚¹500.
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