
let table = document.querySelector("table");
let fbutton = document.querySelector("#fetch");
 let sbutton = document.getElementById("send");

 let Name= document.getElementById("name");
 let email = document.getElementById("email");



function sendRequest(method,url,data){
return fetch(url,{
  method:method,
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(data)
})
.then(response=>{
  if(response.status >=200 && response.status<300)
  return response.json();
  else{
    throw new Error ("something went wrong");
  }
})
}


async function fetchRequest(){
  try{
  let data = await sendRequest("get","https://jsonplaceholder.typicode.com/users");
  let lists = data;
  let li = `<tr><th>Name</th><th>Email</th></tr>`;
  for(list of lists){
    li+= `<tr> <td>${list.name}</td><td>${list.email}</td></tr>`;
  }
  table.innerHTML = li;
} catch(erro){
  alert("Something went wrong..");
}
}



async function createPost(name,email){
let id = Math.floor(Math.random()*500);
let post={
  id:id,
  name:name,
  email:email
}
try{
  let postData = await sendRequest("POST","https://jsonplaceholder.typicode.com/users",post);
  alert("Data is posted successfully...")
} catch(error){
  alert("somethig  went wrong..");
}

}



fbutton.addEventListener("click", ()=>{
fetchRequest();
fbutton.disabled = true;
fbutton.style.background = "red";
});



sbutton.addEventListener("click",ev=>{
  ev.preventDefault();
  if(Name.value == ""&&
  email.value == ""){
    alert("Empty input field..!");
    return;
  }else{
    createPost(Name.value,email.value);
    Name.value = "";
    email.value = "";
  }

})


