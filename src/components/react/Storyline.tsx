import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { storyLine, favoriteTracks } from "@/store";
import {
  initStoryLine,
  handleGetImage,
  handleMouseDown,
  handleMouseUp,
} from "@/utils/storyline";
import { createBackground } from "@/utils/common";
import { DEFAULT_AVATAR, ANIMATION_TEXT_DURATION } from "@/utils/const";

const Storyline = ({ user }) => {
  let $storyLine = useStore(storyLine);
  let $favoriteTracks = useStore(favoriteTracks);

  useEffect(() => {
    if ($storyLine && $storyLine.length > 0) {
      initStoryLine();
      createBackground(`#bg-slider`);
    }
  }, [$storyLine]);

  return $storyLine && $storyLine.length > 0 ? (
    <section
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      id="storyline"
      className="h-[60vh] w-[19rem] rounded-lg relative overflow-hidden tracking-[2.8px] animate-expand-horizontally animate-iteration-count-once animate-duration-500 animate-delay-none"
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
        <div id="bg-slider" className="absolute w-full h-[60vh]" />

        {/* Slide */}
        {$storyLine.map(({ title, body }, indexStory) => (
          <div
            key={indexStory}
            id={`slide-${indexStory}`}
            className="slide before:absolute before:content-none before:block before:top-0 before:left-0 before:h-full before:w-full hidden"
          >

            <div className="absolute w-full px-[30px] py-[15px] font-semibold leading-6 text-md tracking-normal text-white text-center left-0 bottom-[30px]">
              {body.map((text, indexBody) => {
                return (
                  <p
                    key={indexBody}
                    className={
                      `${indexBody % 2 == 0 ? "text-right" : "text-left"} mb-5 ${indexBody % 2 == 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'} animate-duration-slower`
                    }
                    style={{ animationDelay: `${(indexBody + 1) * ANIMATION_TEXT_DURATION}ms` }}
                  >
                    {text}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
        <div
          key={"slide-favorite"}
          id={`slide--favorite`}
          className="slide before:absolute before:content-none before:block before:top-0 before:left-0 before:h-full before:w-full hidden"
        >
          <div className="absolute w-full px-[5px] py-[5px] font-semibold leading-6 text-md tracking-normal text-white text-center left-0 bottom-[30px]">
            <p className="mb-5 text-2xl animate-rubber-band animate-duration-1000">
              Tus 5 <span className="text-gradient">canciones favoritas</span>
            </p>
            <div className=" py-[5px] my-auto">
              {$favoriteTracks.map(({ artist, image, name }, index) => (
                <div
                  key={index + "-favoritetrack"}
                  className="flex items-center  p-2 mb-2 rounded-lg"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-10 h-10 rounded-full mx-2 animate-fade-in-left animate-duration-1000"
                    style={{ animationDelay: `${(++index) * ANIMATION_TEXT_DURATION}ms` }}
                  />
                  <div 
                    className="text-left animate-fade-in-left animate-duration-1000"
                    style={{ animationDelay: `${((++index) * ANIMATION_TEXT_DURATION) + ANIMATION_TEXT_DURATION}ms` }}
                  >
                    <p className="mb-1 text-sm font-bold">{name}</p>
                    <p className="text-xs text-gray-300 truncate">{artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
