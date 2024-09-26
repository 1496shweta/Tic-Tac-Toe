


function breakText (){
var h1= document.querySelector("h1");
var h1Text= h1.textContent;
var spilittedTect = h1Text.split("");
var clutter ="";
spilittedTect.forEach(function (elem){
    clutter+= `<span>${elem}<span>`
})
h1.innerHTML=clutter;
}
breakText();

gsap.from("h1 span",{
    y:40,duration:0.7,
    opacity:0,
    delay:0.5,stagger:0.1
})

gsap.from("p",{
    y:70,duration:0.7,
    opacity:0,
    delay:0.5,stagger:0.2
})
gsap.from("button",{
    y:100,duration:0.7,
    opacity:0,
    delay:0.5,stagger:0.3
})


document.querySelector("#ai").addEventListener("click", function() {
    window.location.href = "../game1/index.html"; // Adjust the path as needed
});

document.querySelector("#friends").addEventListener("click", function() {
    window.location.href = "../friends/index.html"; // Adjust the path as needed
});