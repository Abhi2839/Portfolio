const toggle=document.getElementById("theme-toggle");

toggle.onclick=()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

toggle.innerHTML="☀️";

}else{

toggle.innerHTML="🌙";

}

};

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});

});

document.querySelectorAll("section").forEach(sec=>{
sec.classList.add("hidden");
observer.observe(sec);
});