let nav = document.querySelector(".navbar")
window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        nav.classList.add("header-scrolled");
    }
    else {
        nav.classList.remove("header-scrolled");
    }
}

// js for the navbar 

let navBar = document.querySelectorAll(".nav-link")
let navcollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (e) {

    e.addEventListener("click", function () {
        navcollapse.classList.remove("show");
    })

});


// theme changer 
const themeBtn = document.getElementById("theme-btn");
const body = document.body;

themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    const themeIcon = document.querySelector(".theme-icon");
    themeIcon.classList.toggle("fa-solid");

    const theme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

const userTheme = localStorage.getItem("theme");

if (userTheme === "dark") {
    body.classList.add("dark");
    document.querySelector(".theme-icon").classList.add("dark");
} else {
    body.classList.add("light");
}
