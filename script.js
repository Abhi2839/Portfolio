const toggle=document.getElementById("theme-toggle");

toggle.onclick=()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
toggle.innerHTML="☀️";
}else{
toggle.innerHTML="🌙";
}

};

const cards=document.querySelectorAll(".about-card");

window.addEventListener("scroll",()=>{

cards.forEach(card=>{

const cardTop=card.getBoundingClientRect().top;

if(cardTop < window.innerHeight - 100){

card.classList.add("show");

}

});

});