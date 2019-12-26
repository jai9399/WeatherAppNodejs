
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
function myfunc(event){
   var x = document.getElementById('value').value
   document.getElementById('run').innerHTML ="Running....";
   console.log(x)
   if(x!=''){
   fetch('/send?location='+x).then(function(request){
        console.log(request)
        if(request.status=='404'){
           return display('Incorrect Query')
        }
        request.json().then(function(data){
           console.log(data);
           if(data==undefined){
            display('Incorrect Query')}
            else{
           displaydata(data);}
        }).catch((e)=>{
           displaydata(e)
        })

       
   })
}
else{
   display("You must provide an address!");
}
}
function display(k){
         document.getElementById('run').innerHTML = k;       
}
function displaydata(k){
         console.log(k.timezone)
         document.getElementById('run').innerHTML="Timezone : "+k.timezone+"<br>"+"Temperature : "+k.temperature+"<br>"+"Humidity : "+k.humidity+"<br>"+"Dew Point : "+k.dewPoint+"<br>"+"Summary : "+k.summary;
}