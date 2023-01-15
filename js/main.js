// Check If There's Local Storage Color Option
let mainColor = localStorage.getItem("color_option");
// If There's Color Item In Local Storage
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Remove Active Class from All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class If Element's Dataset Color === Local Storage Color Option
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable to Control Background Interval
let backgroundInterval;

// Check If There's Local Storage Background Option
let backgroundLocalItem = localStorage.getItem("background_option");
// If There's Background Item In Local Storage
if (backgroundLocalItem !== null) {
  // Remove Active Class from All Background Items
  document.querySelectorAll(".background-options span").forEach((element) => {
    element.classList.remove("active");
    if (backgroundLocalItem === "true") {
      backgroundOption = true;

      document
        .querySelector(".background-options .yes")
        .classList.add("active");
    } else {
      backgroundOption = false;

      document.querySelector(".background-options .no").classList.add("active");
    }
  });
}

// Check If There's Local Storage Bullets Option
let bulletLocalItem = localStorage.getItem("bullets_option");
// If There's Bullets Option Item In Local Storage
if (bulletLocalItem !== null) {
  // Remove Active Class from All Bullets Option Items
  document.querySelectorAll(".bullets-option span").forEach((element) => {
    element.classList.remove("active");
    if (bulletLocalItem === "block") {
      document.querySelector(".nav-bullets").style.display = `block`;

      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      document.querySelector(".nav-bullets").style.display = `none`;

      document.querySelector(".bullets-option .no").classList.add("active");
    }
  });
}

// Toggle Spin Class on Icon
document.querySelector(".settings-icon").onclick = function () {
  // Toggle Class fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");
  // Toggle Class open on Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleState(e);
  });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".background-options span");

// Loop On All Spans
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleState(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

const navBar = document.querySelector(".nav-bar");
const sections = document.querySelectorAll("section");
const bulletsNav = document.querySelector(".nav-bullets");

// Build The Navbar and The Nav Bullets
function createNavItem() {
  const listFragment = document.createDocumentFragment();
  const bulletFragment = document.createDocumentFragment();
  for (const sec of sections) {
    const listItem = document.createElement("li");
    const bulletItem = document.createElement("div");
    listItem.innerHTML = `<a href="#${sec.id}" class="link"</a>${sec.id}</a>`;
    listFragment.appendChild(listItem);

    bulletItem.innerHTML = `<div class="bullet" data-section=".${sec.id}"><div class="tooltip">${sec.id}</div></div>`;
    bulletFragment.appendChild(bulletItem);
  }
  navBar.appendChild(listFragment);
  bulletsNav.appendChild(bulletFragment);
}
createNavItem();

// Select Bullets Option Spans
const bulletsOptSpan = document.querySelectorAll(".bullets-option span");

bulletsOptSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsNav.style.display = `block`;

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsNav.style.display = `none`;

      localStorage.setItem("bullets_option", "none");
    }
    handleState(e);
  });
});

// Select All Bullets
const bullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Nav Links
const navLinks = document.querySelectorAll(".nav-bar .link");

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(bullets);
scrollToSection(navLinks);

// Get Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Images
let imgsArray = [
  "1-min.jpg",
  "2-min.jpg",
  "3-min.jpg",
  "4-min.jpg",
  "5-min.jpg",
  "6-min.jpg",
];

let randomNumber;

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval((_) => {
      // Get Random Number
      randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image URL
      landingPage.style.backgroundImage = `url(../imgs/${imgsArray[randomNumber]})`;
    }, 10000);
  }
}

randomizeImgs();

// Reset Button
document.querySelector(".reset-options").onclick = () => {
  localStorage.clear();

  window.location.reload();
};

// Create Progress Bar For All Skills
let skillsSec = document.querySelector(".skills");

let skillItems = document.querySelectorAll(".skills .skill-progress span");

window.onscroll = (_) => {
  // console.log(window.scrollY);
  if (window.scrollY >= skillsSec.offsetTop - 550) {
    skillItems.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  } else {
    skillItems.forEach((span) => {
      span.style.width = "0";
    });
  }
};

// Create Popup with The Image
let ourGallery = document.querySelectorAll(".images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class to The Element
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create Popup Box
    let popupBox = document.createElement("div");

    // Add Class to The Element
    popupBox.className = "popup-box";

    // Create The Image
    let popupImage = document.createElement("img");

    // Add Image Source
    popupImage.src = img.src;

    // Add The Image to The Image Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To The Body
    document.body.appendChild(popupBox);

    // Create The Close Button
    let closeButton = document.createElement("button");

    // Create The Button Text
    let closeButtonText = document.createTextNode("X");

    // Add The text to The span
    closeButton.appendChild(closeButtonText);

    // Add Class to The Button
    closeButton.className = "close-button";

    // Append The Close Button to The Image Box
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove Image Box

    document.querySelector(".popup-box").remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Create Scroll Animation to Timeline Section
const boxes = document.querySelectorAll(".timeline-content .content-box");

window.addEventListener("scroll", (_) => {
  const triggerBottom = window.innerHeight;

  // Loop on All Content Boxes
  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
});

// Handle The State
function handleState(ev) {
  // Remove Active Class from All Colors List Item
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active Class on Element
  ev.target.classList.add("active");
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tNav = document.querySelector(".nav-bar");

toggleBtn.onclick = function (btn) {
  // Stop Propagation
  btn.stopPropagation();

  // Toggle Class 'active' on Button
  this.classList.toggle("active");

  // Toggle Class 'open' on Nav Menu
  tNav.classList.toggle("open");
};

// Stop Propagation on Nav Menu
tNav.onclick = function (nav) {
  nav.stopPropagation();
};

// Click Anywhere Outside Nav Menu and Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tNav) {
    // If Menu is Open
    if (tNav.classList.contains("open")) {
      // Toggle Class 'active' on Button
      toggleBtn.classList.toggle("active");

      // Toggle Class 'open' on Nav Menu
      tNav.classList.toggle("open");
    }
  }
});
