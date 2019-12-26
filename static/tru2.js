
var k;
function run(){
   let y = document.getElementById('linker');
   let x = document.getElementById('runner');
   console.log(x.offsetHeight);
   console.log(y);   
   console.log(y.style.display)
   if(y.style.display=="none" || y.style.display==''){
   y.style.display="flex";
   x.style.marginTop = 300;
}
   else{
      y.style.display="none";
      x.style.marginTop = 100;
   }
   
}
function check(){
if(screen.width>800){
   let y = document.getElementById('linker');
   y.style.display ="flex";
   let x = document.getElementById('runner');
   x.style.marginTop=200;
}
else{
	let x = document.getElementById('runner');
   x.style.marginTop=300;
}
}
window.addEventListener('resize', function(event){
   check();
 });
/*function myfunc(event){
   var x = document.getElementById('value').value
   document.getElementById('run').innerHTML ="Running....";
   console.log(x)
   if(x!=''){
   fetch('/send?location='+x).then(function(request){
        console.log(request)
        request.json().then(function(data){
           console.log(data);
           displaydata(data);
        })

       
   })
}
else{
   display("You must provide an address!");
}
}*/


function display(k){
         document.getElementById('run').innerHTML = k;       
} 
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      display("Geolocation is not supported by this browser.");
    }
  }
  
  
  async function showPosition(position) {
     const lat = await position.coords.latitude;
     const long = await position.coords.longitude;
     document.getElementById('Lat').innerHTML = "Lattitude : "+lat;
     document.getElementById('Long').innerHTML = "Longitude : "+long;
    $.post('/current',{"lat":lat,"long":long},function(data,status){
             console.log('Data : '+data);
             console.log('Status : '+status);
    })
   
  }
  function weather(){
   fetch('/loc').then(function(request){
      request.json().then(function(data){
         console.log(data);
         displaydata(data);
      })
  }) 
  }
function displaydata(k){
         console.log(k.timezone)
         document.getElementById('run').innerHTML="The Specifics are :-"+"<br>"+"<br>"+"Timezone : "+k.timezone+"<br>"+"Temperature : "+k.temperature+"<br>"+"Humidity : "+k.humidity+"<br>"+"Dew Point : "+k.dewPoint+"<br>"+"Summary : "+k.summary;
}
document.onload=getLocation();