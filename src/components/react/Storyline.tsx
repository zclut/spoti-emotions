import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { storyLine } from 'store';



const Storyline = () => {
    const $storyLine = useStore(storyLine);
    console.log($storyLine);

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

    useEffect(() => {
        if ($storyLine && $storyLine.length > 0) {
            storyline = document.getElementById('storyline')
            slider = document.getElementById('slider');
            slides = document.querySelectorAll('.slide');
            init();
        }
    }, [$storyLine]);

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
    
    const init = () => {
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


    return (
        $storyLine && $storyLine.length > 0 ? (
            <section
            id="storyline"
            className="h-[40vh] w-64 bg-primary rounded-lg relative overflow-hidden tracking-[2.8px]"
        >

            {/* Header */}
            <div
                id="header"
                className="storyline-header absolute top-0 left-0 flex justify-start items-center p-[15px] w-full z-50">
                <h6 className="my-0 text-[1.1rem] uppercase text-white">storyline</h6>
            </div>
            {/* Slider */}
            <div
                id="slider"
                className="relative h-full overflow-hidden"
            >
                {/* Slide */}
                { $storyLine.map(({ title, body }, index) => (
                    <div
                        key={index} 
                        className="slide before:absolute before:content-none before:block before:top-0 before:left-0 before:h-full before:w-full hidden"
                    >
                        <img
                            src="https://images.pexels.com/photos/2272854/pexels-photo-2272854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt=""
                            className="w-full h-[40vh] object-cover"
                        />

                        <div className="absolute w-full px-[30px] py-[15px] font-semibold leading-6 text-md tracking-normal text-white text-center left-0 bottom-[50px]">
                            {body}
                        </div>
                    </div>
                ))}
            </div>
            {/* Footer */}
            <div className="absolute bottom-0 left-0 flex justify-start items-center p-[15px] w-full z-50">
                <img
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt=""
                    className="flex-none w-6 h-6 rounded-full mr-2"
                />

                <span className="w-full text-white text-xs tracking-normal whitespace-nowrap overflow-hidden text-ellipsis">author Unknown</span>
                <a href="#" className="relative inline-block bg-transparent border border-white border-opacity-45 rounded-[25px] text-white z-10 py-1.5 px-5 text-xs font-semibold uppercase no-underline tracking-normal disabled:pointer-events-none">Follow</a>
            </div>
        </section>
        ) :
        null
    );
}

export default Storyline;