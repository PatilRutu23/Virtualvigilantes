// Select all image containers
const imageContainers = document.querySelectorAll('.image-container');

// Select the lightbox and its components
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close-button');

// Function to open the lightbox
function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.style.display = 'block';
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
}

// Attach click event listeners to image containers
imageContainers.forEach(container => {
    container.addEventListener('click', () => {
        const imageSrc = container.querySelector('img').src;
        openLightbox(imageSrc);
    });
});

// Close the lightbox when the close button is clicked
closeBtn.addEventListener('click', closeLightbox);

// Close the lightbox when the overlay is clicked
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Select the previous and next buttons
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');

// Create an array to store the image sources
const imageSources = [];
imageContainers.forEach(container => {
    const imageSrc = container.querySelector('img').src;
    imageSources.push(imageSrc);
});

// Function to open the lightbox and display a specific image
function openLightbox(index) {
    lightboxImage.src = imageSources[index];
    lightbox.style.display = 'block';
}

// Event listeners for previous and next buttons
prevButton.addEventListener('click', () => {
    const currentIndex = imageSources.indexOf(lightboxImage.src);
    const prevIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    openLightbox(prevIndex);
});

nextButton.addEventListener('click', () => {
    const currentIndex = imageSources.indexOf(lightboxImage.src);
    const nextIndex = (currentIndex + 1) % imageSources.length;
    openLightbox(nextIndex);
});

// Attach click event listeners to image containers
imageContainers.forEach((container, index) => {
    container.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Close the lightbox when the close button is clicked
closeBtn.addEventListener('click', closeLightbox);

// Close the lightbox when the overlay is clicked
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Function to open the lightbox and display a specific image
function openLightbox(index)
{
    currentIndex = index;
    lightboxImage.src = imageSources[index];
    lightbox.style.display = 'block';

    // Center the lightbox vertically
    lightbox.style.justifyContent = 'center'; // Center vertically
    lightbox.style.alignItems = 'center';    // Center horizontally

    // Add margin to the .gallery container when the lightbox is open
    document.querySelector('.gallery').style.marginTop = '20px'; // Adjust the margin value as needed

    // Remove the zoomed class (if it exists) when opening the lightbox
    lightboxImage.classList.remove('zoomed');

    // Add zoom functionality
    lightboxImage.addEventListener('click', toggleZoom);
}

// Function to toggle zoom
function toggleZoom() {
    if (lightboxImage.classList.contains('zoomed')) {
        lightboxImage.classList.remove('zoomed');
    } else {
        lightboxImage.classList.add('zoomed');
    }
}

// Close the lightbox when the close button is clicked
closeBtn.addEventListener('click', () => {
    closeLightbox();
    lightboxImage.removeEventListener('click', toggleZoom); // Remove zoom event listener
});

function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* Create lens: */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* Prevent the lens from being positioned outside the image: */
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /* Set the position of the lens: */
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /* Display what the lens "sees": */
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }


// Optional: Implement navigation controls for previous and next images
// Add event listeners to these controls to change the displayed image
