const moreNav = document.querySelector(".more-dropdown");
const hiddenNav = document.querySelector(".hidden-dropdown");
const menuHamburger = document.getElementById("menu-hamburger");
const mainLogo = document.getElementById("main-logo");
const searchNav = document.getElementById("head-search");
const searchBox = document.getElementById("search-box");
const searchInput = document.getElementById("search-input");
const navBar = document.getElementById("nav-bar");
const allProducts = document.getElementById("all-products");
const cartNav = document.getElementById("head-cart");
const signInNav = document.getElementById("login");
const hideNavElements = document.getElementsByClassName("hide-nav");
const searchCancelButton = document.getElementById("search-cancel");
let displayedNavElement;
let searchCheck = true;
let mobileViewCheck;
const midPcWidth = 1400;
const smTabWidth = 950;
const lgMobileWidth = 860;

moreNav.addEventListener("click", function () {
    hiddenNav.style.display =
        hiddenNav.style.display === "block" ? "none" : "block";
    moreNav.classList.toggle("bg-active-color");
});

searchNav.addEventListener("click", function () {
    clickSearchAction();
});

searchCancelButton.addEventListener("click", function () {
    cancelSearchAction();
});

document.addEventListener("click", function (event) {
    if (!moreNav.contains(event.target)) {
        hiddenNav.style.display = "none";
        moreNav.classList.remove("bg-active-color");
    }
});

document.addEventListener("click", function (event) {
    if (!searchNav.contains(event.target)) {
        if (!searchBox.contains(event.target)) {
            cancelSearchAction();
        }
    }
});

window.addEventListener("scroll", function () {
    let button = document.querySelector(".head-to-top");
    let threshold = 0.31; // % of the page height
    let pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY > threshold * pageHeight) {
        button.style.visibility = "visible";
    } else {
        button.style.visibility = "hidden";
    }
});

function handleResize() {
    let windowWidth = window.innerWidth;
    if (windowWidth > smTabWidth || windowWidth <= lgMobileWidth) {
        hiddenNav.style.display = "none";
        moreNav.classList.remove("bg-active-color");
    }
    if (windowWidth > lgMobileWidth - 10 && mobileViewCheck === true) {
        cancelSearchAction();
    }
    if (window.innerWidth <= lgMobileWidth && mobileViewCheck === false) {
        cancelSearchAction();
    }
}

function clickSearchAction() {
    displayedNavElement = [];
    searchCheck = false;
    for (let i = 0; i < hideNavElements.length; i++) {
        if (hideNavElements[i].style.display != "none") {
            displayedNavElement.push(hideNavElements[i]);
            hideNavElements[i].style.display = "none";
        }
    }
    if (window.innerWidth > lgMobileWidth) {
        mainLogo.style.display = "flex";
    } else {
        mainLogo.style.display = "none";
    }
    searchBox.style.display = "flex";
    searchCancelButton.style.display = "flex";
    searchInput.focus();
}

function cancelSearchAction() {
    if (searchCheck === false) {
        searchCheck = true;
        for (let i = 0; i < displayedNavElement.length; i++) {
            displayedNavElement[i].style.display = "flex";
        }
        searchCancelButton.style.display = "none";
        searchBox.style.display = "none";
        mainLogo.style.display = "flex";
        searchInput.value = "";
    }
}

function handleViewportChange1(event) {
    if (window.innerWidth <= midPcWidth) {
        // Change the text when the viewport width is less than or equal to 1400px
        searchNav.firstChild.textContent = "";
        cartNav.firstChild.textContent = "";
        signInNav.style.display = "none";
    } else {
        // Change the text for other viewport widths
        searchNav.firstChild.textContent = "Search";
        cartNav.firstChild.textContent = "Cart";
        if (searchCheck === true) {
            signInNav.style.display = "flex";
        }
    }
    searchInput.addEventListener("focus", () => {
        searchBox.style.border = "2px solid var(--blue-bg-btn-color)";
    });

    searchInput.addEventListener("blur", () => {
        searchBox.style.border = "1px solid var(--header-color)";
    });
}

function handleViewportChange2(event) {
    if (window.innerWidth <= lgMobileWidth) {
        mobileViewCheck = true;
        navBar.style.display = "none";
        allProducts.style.display = "none";
        searchCancelButton.style.order = "-3";
        searchCancelButton.innerHTML =
            '<img src="icons/arrowhead_left.svg" alt="Search cancel icon">';
        if (window.innerWidth <= lgMobileWidth && searchCheck === true) {
            menuHamburger.style.display = "flex";
        }
    } else {
        mobileViewCheck = false;
        if (searchCheck === true) {
            navBar.style.display = "flex";
            allProducts.style.display = "flex";
        }
        searchCancelButton.style.order = "0";
        searchCancelButton.innerHTML = "Cancel";
        menuHamburger.style.display = "none";
    }
}

// Call the function initially
handleViewportChange1();
handleViewportChange2();

window.addEventListener("resize", handleResize);

// Add event listener to trigger the function whenever the viewport width changes
window.addEventListener("resize", handleViewportChange1);
window.addEventListener("resize", handleViewportChange2);
