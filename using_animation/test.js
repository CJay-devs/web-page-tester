var slide1 = document.getElementById("slide-1");
var slide2 = document.getElementById("slide-2");
let pauseSlideAnimation = document.getElementById("pause");
let pauseState = false;

let slide1Interval; // Variable to store the interval ID
let slide2Interval;
let pauseSlide1Interval;
let pauseSlide2Interval;
const valueCheckTime = 200;

pauseSlideAnimation.addEventListener("click", function () {
    console.log(slide1.style.animationPlayState);

    if (
        slide1.style.animationPlayState === "running" &&
        slide2.style.animationPlayState === "running"
    ) {
        pauseSlide1Interval = setInterval(
            () => checkSlideLeftValue(slide1),
            valueCheckTime
        );
        pauseSlide2Interval = setInterval(
            () => checkSlideLeftValue(slide2),
            valueCheckTime
        );
    } else {
        clearInterval(pauseSlide1Interval); // Stop the 1 interval
        clearInterval(pauseSlide2Interval); // Stop the 2 interval
        slide1.style.animationPlayState = "running";
        slide2.style.animationPlayState = "running";
    }
});

slide1.addEventListener("mouseenter", function () {
    // console.log("slide 1 hover");
    pauseSlide2Interval = setInterval(
        () => checkSlideLeftValue(slide1),
        valueCheckTime
    );
});

slide1.addEventListener("mouseleave", function () {
    // console.log("slide 1 leave");
    clearInterval(pauseSlide2Interval); // Stop the interval
    // slide1.style.backgroundColor = "cyan";
    slide1.style.animationPlayState = "running";
    slide2.style.animationPlayState = "running";
});

slide2.addEventListener("mouseenter", function () {
    // console.log("slide 2 hover");
    slide2Interval = setInterval(
        () => checkSlideLeftValue(slide2),
        valueCheckTime
    );
});

slide2.addEventListener("mouseleave", function () {
    // console.log("slide 2 leave");
    clearInterval(slide2Interval); // Stop the interval
    // slide2.style.backgroundColor = "cyan";
    slide1.style.animationPlayState = "running";
    slide2.style.animationPlayState = "running";
});

function checkSlideLeftValue(currentSlide) {
    let slideLeftValue = window
        .getComputedStyle(currentSlide)
        .getPropertyValue("left");
    if (slideLeftValue === "0px") {
        console.log(`slideLeftValue of ${currentSlide.id} is 0px`);
        // currentSlide.style.backgroundColor = "red";
        slide1.style.animationPlayState = "paused";
        slide2.style.animationPlayState = "paused";
    }
}

// function checkEvents(element1, element2) {
//     if (animateComplete && slideHover) {
//         // Both events are occurring at the same time
//         element1.style.animation = "none";
//         element2.style.animation = "none";
//     }
// }
