import { products, folderName, goTop } from "./database.js";
let productImage = document.querySelector(".image img"),
  previousButton = document.querySelector("#previousButton"),
  previousIcon = document.querySelector(".image-box .fa-arrow-alt-circle-left"),
  pauseButton = document.querySelector("#pasueButton"),
  continueButton = document.querySelector("#continueButton"),
  nextButton = document.querySelector("#nextButton"),
  nextIcon = document.querySelector(".image-box .fa-arrow-alt-circle-right"),
  overLayer = document.querySelector(".overLayer"),
  imageBox = document.querySelector(".image-box"),
  closeIcon = document.querySelector("#close"),
  imageInfo = document.querySelector(".img-info"),
  imageIndex = 0,
  currentIndex,
  interval;

/*playSlider get the next image and change the src of product image */
let playSlider = () => {
  imageIndex++;
  if (imageIndex == products.length) {
    imageIndex = 0;
  }
  displayInfo(imageIndex);
  productImage.src = `${folderName}${products[imageIndex].src}`;
};
interval = setInterval(playSlider, 2000);

/*display the info box containing title and description for the product */
function displayInfo(imageIndex) {
  imageInfo.innerHTML = ``;
  let h2 = document.createElement("h2"),
    title = document.createTextNode(`${products[imageIndex].title}`),
    h5 = document.createElement("h5"),
    description = document.createTextNode(
      `${products[imageIndex].description}`
    );
  h2.appendChild(title);
  h5.appendChild(description);
  h2.classList.add("fw-bold");
  imageInfo.appendChild(h2);
  imageInfo.appendChild(h5);
}

/*pause the image slider "clear interval"*/
let pauseSlider = () => {
  clearInterval(interval);
};
pauseButton.addEventListener("click", pauseSlider);

/*continue the interval */
let continueSlider = () => {
  interval = setInterval(playSlider, 2000);
};
continueButton.addEventListener("click", continueSlider);

/*get the next image of the slider */
let nextSlide = () => {
  clearInterval(interval);
  playSlider();
  interval = setInterval(playSlider, 2000);
};
nextButton.addEventListener("click", nextSlide);

/*get the previous image of the slider */
let previousSlide = () => {
  clearInterval(interval);
  imageIndex--;
  if (imageIndex < 0) {
    imageIndex = products.length - 1;
  }
  displayInfo(imageIndex);
  productImage.src = `${folderName}${products[imageIndex].src}`;
  interval = setInterval(playSlider, 2000);
};
previousButton.addEventListener("click", previousSlide);

/*open over layer when click on an image and get it's index */
let showLayer = (e) => {
  overLayer.classList.replace("d-none", "d-flex");
  imageBox.style.backgroundImage = `url('${e.target.src}')`;
  for (let i = 0; i < products.length; i++) {
    let targetImage = e.target.src;
    if (targetImage.includes(products[i].src)) {
      currentIndex = i;
    }
  }
};
productImage.addEventListener("click", showLayer);

/*get the next image background on the image box of the layer*/
let nextImage = () => {
  currentIndex++;
  if (currentIndex == products.length) {
    currentIndex = 0;
  }
  imageBox.style.backgroundImage = `url('${folderName}${products[currentIndex].src}')`;
};
nextIcon.addEventListener("click", nextImage);

/*get the previous image background on the image box of the layer*/
let previousImage = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = products.length - 1;
  }
  imageBox.style.backgroundImage = `url('${folderName}${products[currentIndex].src}')`;
};
previousIcon.addEventListener("click", previousImage);

/*close the over layer using close icon */
let closeLayer = () => {
  overLayer.classList.replace("d-flex", "d-none");
};
closeIcon.addEventListener("click", closeLayer);

/*close overlayer when click on it */
overLayer.addEventListener("click", function (e) {
  if (e.target == overLayer) {
    closeLayer();
  }
});

/*add event key down to document then check if overlayer open and apply functions */
document.addEventListener("keydown", function (e) {
  if (overLayer.classList.contains("d-flex")) {
    if (e.key == "ArrowRight") {
      nextImage();
    } else if (e.key == "ArrowLeft") {
      previousImage();
    } else if (e.key == "Escape") {
      closeLayer();
    }
  }
});

/*add scroll event on window when reach the section appear the photos  */
function getSections() {
  let comeLeft = document.querySelector(".show-left"),
    comeRight = document.querySelector(".show-right"),
    come = [comeLeft, comeRight];
  for (var i = 0; i < come.length; i++) {
    let windowHeight = window.innerHeight,
      elementTop = comeLeft.getBoundingClientRect().top,
      elementHeight = comeLeft.getBoundingClientRect().height;
    if (elementTop < windowHeight - elementHeight / 2) {
      comeLeft.classList.remove("invisible");
      comeLeft.classList.add("animation-from-left");
      comeRight.classList.remove("invisible");
      comeRight.classList.add("animation-from-right");
    }
  }
}
window.addEventListener("scroll", getSections);

document.querySelector(".go-top").addEventListener("click", goTop);
