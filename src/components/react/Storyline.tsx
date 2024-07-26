import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { storyLine } from "@/store";
import { DEFAULT_AVATAR } from "@/utils/const";
import {
  initStoryLine,
  handleGetImage,
  handleMouseDown,
  handleMouseUp,
} from "@/utils";

const Storyline = ({ user }) => {
  let $storyLine = useStore(storyLine);

  useEffect(() => {
    if ($storyLine && $storyLine.length > 0) {
      initStoryLine();
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
      className="h-[60vh] w-64  rounded-lg relative overflow-hidden tracking-[2.8px]"
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
        {/* Slide */}
        {$storyLine.map(({ title, body }, index) => (
          <div
            key={index}
            id={`slide-${index}`}
            className="slide before:absolute before:content-none before:block before:top-0 before:left-0 before:h-full before:w-full hidden"
          >
            <img
              src="https://images.pexels.com/photos/2272854/pexels-photo-2272854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt=""
              className="w-full h-[60vh] object-cover"
            />

            <div className="absolute w-full px-[30px] py-[15px] font-semibold leading-6 text-md tracking-normal text-white text-center left-0 bottom-[50px]">
              {body.map((text, index) => {
                return (
                  <p key={index} className="mb-2">
                    {text}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 flex justify-start items-center p-[15px] w-full z-50">
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
