const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
toggle.innerHTML = "☀️";
}else{
toggle.innerHTML = "🌙";
}

localStorage.setItem("theme",
document.body.classList.contains("light") ? "light" : "dark");

});

// load saved theme
if(localStorage.getItem("theme") === "light"){
document.body.classList.add("light");
toggle.innerHTML = "☀️";
}