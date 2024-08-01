import { useStore } from "@nanostores/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { storyLine, favoriteTracks, favoriteArtists, favoriteGenres } from "@/store";
import {
  initStoryLine,
  handleGetImage,
  handleMouseDown,
  handleMouseUp,
} from "@/utils/storyline";
import { createBackground } from "@/utils/common";
import { DEFAULT_AVATAR, ANIMATION_TEXT_DURATION } from "@/utils/const";
import CustomSlide from "./CustomSlide";

const Storyline = ({ user }) => {
  let $storyLine = useStore(storyLine);
  let $favoriteTracks = useStore(favoriteTracks);
  let $favoriteArtists = useStore(favoriteArtists);
  let $favoriteGenres = useStore(favoriteGenres);
  const storyLineRef = useRef(null);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const [slidesShuflle, setSlidesShuffle] = useState([]);

  const checkScreenHeight = () => {
    const windowHeight = window.innerHeight;
    setIsShortScreen(windowHeight < 824);
  };

  const shufleSlides = () => {
    const customSlides = [
      { type: 'custom', component: <CustomSlide items={$favoriteArtists} title="artistas favoritos" attribute="artists"/> },
      { type: 'custom', component: <CustomSlide items={$favoriteGenres} title="géneros favoritos" attribute="genres"/> },
      { type: 'custom', component: <CustomSlide items={$favoriteTracks} title="canciones favoritas" attribute="tracks"/> },
    ]
    const slidesShuffle = customSlides.flatMap((slide, index) => [slide, $storyLine[index]]).reverse();
    setSlidesShuffle(slidesShuffle);
  }

  useEffect(() => {
    if ($storyLine && $storyLine.length > 0) {
      shufleSlides();
      const offset = -55;
      const elementPosition = storyLineRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  }, [$storyLine]);

  useEffect(() => {
    if (slidesShuflle.length > 0) {
      createBackground(`#bg-slider`);
      initStoryLine();
    }
  }, [slidesShuflle]);

  useEffect(() => {
    checkScreenHeight();
    window.addEventListener('resize', checkScreenHeight);
    return () => {
      window.removeEventListener('resize', checkScreenHeight);
    };
  }, []);

  return $storyLine && $storyLine.length > 0 ? (
    <section
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      id="storyline"
      ref={storyLineRef}
      className={`${isShortScreen ? 'h-[45rem] sm:h-[60vh]' : 'h-[90vh] sm:h-[60vh]' } w-screen sm:w-[19rem] rounded-lg relative overflow-hidden tracking-[2.8px] animate-expand-horizontally animate-iteration-count-once animate-duration-500 animate-delay-none`}
    >
      {/* Header */}
      <div
        id="header"
        className="storyline-header absolute top-0 left-0 flex justify-start items-center p-[15px] w-full z-50"
      >
        <h6 className="my-0 text-[0.8rem] uppercase text-white">
          Spoti<span className="text-gradient">Emotions</span>
        </h6>
      </div>
      {/* Slider */}
      <div id="slider" className="relative h-full overflow-hidden">
        <div id="bg-slider" className={`absolute w-screen sm:w-full ${isShortScreen ? 'h-[45rem] sm:h-[60vh]' : 'h-[90vh] sm:h-[60vh]'}`} />
        {/* Slide */}
        {slidesShuflle.map(({ type, body, component }, indexStory) => (
          type === 'custom' 
            ? <Fragment key={indexStory}>{component}</Fragment> 
            : (
              <div
                key={indexStory}
                id={`slide-${indexStory}`}
                className="slide before:absolute before:content-none before:block before:top-0 before:left-0 before:h-full before:w-full hidden"
              >
                <div className="absolute w-full px-[30px] py-[15px] font-semibold text-white left-0 top-[10%]">
                  {body.map((text, indexBody) => (
                    <p
                      key={indexBody}
                      className={
                        `${indexBody % 2 == 0 ? "text-right" : "text-left"} mb-8 ${indexBody % 2 == 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'} animate-duration-slower ${isShortScreen ? 'text-xl leading-8 tracking-wide' : 'text-2xl leading-9 tracking-normal'} sm:text-base sm:leading-7 sm:tracking-normal`
                      }
                      style={{ animationDelay: `${(indexBody + 1) * ANIMATION_TEXT_DURATION}ms` }}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            )))}

      </div>
      {/* Footer */}
      <div className="z-[10000] absolute bottom-0 left-0 flex justify-start items-center p-[15px] w-full">
        <img
          src={user.image ?? DEFAULT_AVATAR}
          alt=""
          className="flex-none w-6 h-6 rounded-full mr-2"
        />

        <span className="w-full text-white text-xs tracking-normal whitespace-nowrap overflow-hidden text-ellipsis truncate">
          {user.name}
        </span>

        <button id="btn-download" onClick={handleGetImage} className="bg-none">
          <img
            src="/images/icons/Download.svg"
            className="w-6 h-6 cursor-pointer text-white"
            alt="Icono de una nube con una flecha"
          />
        </button>
      </div>
    </section>
  ) : null;
};

export default Storyline;
