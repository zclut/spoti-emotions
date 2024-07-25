let storyline = null;
// Slides
let currentSlide = 0;
let slider = null;
let slides = null;
let time = null
// Buttons
let next = null
let prev = null; 
// Indicators
let indicators = [];

const singleSlide = () => {
    slides[0].classList.remove('hidden');
    slides[0].classList.add('block');
    slides[0].setAttribute('aria-hidden', 'false');
}

const multipleSlides = () => {
    createIndicators();
    createControls();
    changeSlide(currentSlide);
}

export const initStoryLine = () => {
    storyline = document.getElementById('storyline')
    slider = document.getElementById('slider');
    slides = document.querySelectorAll('.slide');
    slides.length > 1 ? multipleSlides() : singleSlide();
}

const createIndicators = () => {
    const header = document.getElementById('header');
    let indicatorsWrapper: HTMLUListElement | HTMLUListElement[] = document.createElement('ul');
    indicatorsWrapper.classList.add('indicator');
    indicatorsWrapper.setAttribute('aria-label', 'Storyline indicators');
    for (let i = slides.length; i > 0; i--) {
        const indicator = document.createElement('li');
        const indicatorBar = document.createElement('span');
        indicator.classList.add('indicator-item');
        indicatorBar.classList.add('indicator-bar');
        indicatorBar.style.animationDuration = `${4500 / 1000}s`;
        indicator.appendChild(indicatorBar);
        indicatorsWrapper.appendChild(indicator);
    }
    header.appendChild(indicatorsWrapper);
    indicators = Array.from(storyline.querySelectorAll('.indicator-item')) as HTMLUListElement[];
}

const createControls = () => {
    const controls = document.createElement('div');
    controls.classList.add('storyline-controls');

    // Previous button
    prev = document.createElement('button');
    prev.type = 'button';
    prev.classList.add('absolute', 'h-full', 'w-1/2', 'top-0', 'left-0', 'bg-transparent', 'border-none', 'shadow-none')
    prev.setAttribute('disabled', true);
    prev.addEventListener('click', prevHandler)

    // Next button
    next = document.createElement('button');
    next.type = 'button';
    next.classList.add('absolute', 'h-full', 'w-1/2', 'top-0', 'right-0', 'bg-transparent', 'border-none', 'shadow-none')
    next.addEventListener('click', nextHandler)

    controls.appendChild(prev);
    controls.appendChild(next);

    slider.appendChild(controls);
}

const prevHandler = () => {
    currentSlide -= 1;
    indicators[currentSlide + 1].classList.remove('item-loaded');
    indicators[currentSlide + 1].classList.remove('item-loading');
    indicators[currentSlide].classList.remove('item-loaded');
    if (currentSlide === 0) {
        prev.setAttribute('disabled', true);
    }
    if (currentSlide !== slides.length) {
        next.removeAttribute('disabled');
        changeSlide(currentSlide);
    }
}

const nextHandler = () => {
    currentSlide += 1;
    indicators[currentSlide - 1].classList.remove('item-loading');
    indicators[currentSlide - 1].classList.add('item-loaded');
    if (currentSlide === slides.length - 1) {
        next.setAttribute('disabled', true);
    }
    if (currentSlide > 0) {
        prev.removeAttribute('disabled');
        changeSlide(currentSlide);
    }
}

const changeSlide = (index: number) => {
    slides.forEach(slide => {
        slide.classList.remove('block');
        slide.classList.add('hidden');
        slide.setAttribute('aria-hidden', 'true');
    })

    currentSlide = index;
    slides[currentSlide].classList.remove('hidden');
    slides[currentSlide].classList.add('block');
    slides[currentSlide].setAttribute('aria-hidden', 'false');    

    indicators[currentSlide].classList.add('item-loading');

    clearTimeout(time);
    time = setTimeout(() => {
        if (currentSlide !== slides.length - 1) {
            nextHandler();
        } else {
            indicators[currentSlide].classList.add('item-loaded');
            indicators[currentSlide].classList.remove('item-loading');
        }
    }, 4500)
}