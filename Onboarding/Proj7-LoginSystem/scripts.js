let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function loadSlides() {
    fetch('/images')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('slideshow-container');
        data.files.array.forEach(element => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'mySlides fade';

            const numberText = document.createElement('div');
            numberText.className = 'numbertext';
            numberText.innerText = '${element.number} / ${data.files.length}';
            slideDiv.appendChild(numberText);

            const image = document.createElement('img');
            image.src = '/images/' + element.file;
            slideDiv.appendChild(image);

            const captionText = document.createElement('div');
            captionText.className = 'text';
            captionText.innerText = element.caption;
            slideDiv.appendChild(captionText);

            container.appendChild(slideDiv);

        });
    }). catch(error => {
        console.error('Error:', error);
    });
}