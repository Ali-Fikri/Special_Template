///////////////////////////////
//----------Elements---------//
///////////////////////////////

// Settings Box
const colorLi = document.querySelectorAll(".colors-list li");
const randomBackSpans = document.querySelectorAll(".background-options span");
const bulletsOptSpan = document.querySelectorAll(".bullets-option span");
// Navigation Bar
const navBar = document.querySelector(".nav-bar");
const bulletsNav = document.querySelector(".nav-bullets");
const toggleMenuBtn = document.querySelector(".toggle-menu");
const sections = document.querySelectorAll("section");
// Landing Page
const landingPage = document.querySelector(".landing-page");
// Skills Section
let skillsSec = document.querySelector(".skills");
let skillItems = document.querySelectorAll(".skills .skill-progress span");
// Timeline Section
const boxes = document.querySelectorAll(".timeline-content .content-box");

///////////////////////////////
//-------Local Storage-------//
///////////////////////////////

//-----Color Option
// Check If There's Local Storage Color Option
let mainColor = localStorage.getItem("color_option");
// If There's Color Item In Local Storage
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Remove Active Class from All Colors List Item
  colorLi.forEach((element) => {
    element.classList.remove("active");

    // Add Active Class If Element's Dataset Color === Local Storage Color Option
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

//-----Random Background Option
let backgroundOption = true;

// Variable to Control Background Interval
let backgroundInterval;

// Check If There's Local Storage Background Option
let backgroundLocalItem = localStorage.getItem("background_option");
// If There's Background Item In Local Storage
if (backgroundLocalItem !== null) {
  // Handel Background Options Classes
  randomBackSpans.forEach((span) => {
    handleRandomBackground(span);
  });
}

//-----Bullets Option
// Check If There's Local Storage Bullets Option
let bulletLocalItem = localStorage.getItem("bullets_option");
// If There's Bullets Option Item In Local Storage
if (bulletLocalItem !== null) {
  // Remove Active Class from All Bullets Option Items
  bulletsOptSpan.forEach((element) => {
    element.classList.remove("active");
    if (bulletLocalItem === "block") {
      bulletsNav.style.display = `block`;

      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      bulletsNav.style.display = `none`;

      document.querySelector(".bullets-option .no").classList.add("active");
    }
  });
}

////////////////////////////////
//-------Event Listener-------//
////////////////////////////////

//-----Toggle Spin Class on Icon
document.querySelector(".settings-icon").addEventListener("click", (icon) => {
  // Toggle Class fa-spin For Rotation on Self
  icon.target.classList.toggle("fa-spin");
  // Toggle Class open on Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
});

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

//-----Random Background Options
randomBackSpans.forEach((span) => {
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

//-----Bullets Option
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

//-----Reset Button
document.querySelector(".reset-options").addEventListener("click", () => {
  localStorage.clear();

  window.location.reload();
});

//-----Create Progress Bar For All Skills
window.addEventListener("scroll", (_) => {
  if (window.scrollY >= skillsSec.offsetTop - 550) {
    skillItems.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  } else {
    skillItems.forEach((span) => {
      span.style.width = "0";
    });
  }
});

//-----Create Popup with The Image
document.querySelectorAll(".images-box img").forEach((img) => {
  img.addEventListener("click", () => {
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

//-----Close Popup Box and Overlay
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove Image Box
    document.querySelector(".popup-box").remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//-----Create Scroll Animation to Timeline Section
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

//-----Toggle Menu
toggleMenuBtn.addEventListener("click", (btn) => {
  // Stop Propagation
  btn.stopPropagation();

  // Toggle Class 'active' on Button
  this.classList.toggle("active");

  // Toggle Class 'open' on Nav Menu
  navBar.classList.toggle("open");
});

// Stop Propagation on Nav Menu
navBar.onclick = function (nav) {
  nav.stopPropagation();
};

//-----Click Anywhere Outside Nav Menu and Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenuBtn && e.target !== navBar) {
    // If Menu is Open
    if (navBar.classList.contains("open")) {
      // Toggle Class 'active' on Button
      toggleMenuBtn.classList.toggle("active");

      // Toggle Class 'open' on Nav Menu
      navBar.classList.toggle("open");
    }
  }
});

///////////////////////////////
//---------Functions---------//
///////////////////////////////
//----- Build The Navbar and The Nav Bullets
const createNavItem = (_) => {
  sections.forEach((sec) => {
    const listItem = document.createElement("li");
    const bulletItem = document.createElement("div");

    listItem.innerHTML = `<a href="#${sec.id}"
    data-section=".${sec.id}" class="link"</a>${sec.id}</a>`;
    navBar.appendChild(listItem);

    bulletItem.innerHTML = `<div class="bullet" data-section=".${sec.id}"><div class="tooltip">${sec.id}</div></div>`;
    bulletsNav.appendChild(bulletItem);
  });
};
createNavItem();

//-----Smooth Scrolling To The Section
const scrollToSection = (elements) => {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};
scrollToSection(document.querySelectorAll(".nav-bullets .bullet"));
scrollToSection(document.querySelectorAll(".nav-bar .link"));

//-----Handle The State
const handleState = (element) => {
  // Remove Active Class from All Colors List Item
  element.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  // Add Active Class on Element
  element.target.classList.add("active");
};

//-----Handel Active Background's Option span
const handleRandomBackground = (backgroundElement) => {
  // Remove Active Class from All Background Items
  backgroundElement.classList.remove("active");
  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".background-options .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".background-options .no").classList.add("active");
  }
};

//-----Randomize Images
const randomizeImgs = (_) => {
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
  if (backgroundOption === true) {
    backgroundInterval = setInterval((_) => {
      // Get Random Number
      randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image URL
      landingPage.style.backgroundImage = `url(../imgs/${imgsArray[randomNumber]})`;
    }, 10000);
  }
};

randomizeImgs();
