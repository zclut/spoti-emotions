import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { storyLine } from '@/store';
import { initStoryLine, handleGetImage } from '@/utils';


const Storyline = () => {
  const $storyLine = useStore(storyLine);

  useEffect(() => {
    if ($storyLine && $storyLine.length > 0) {
      initStoryLine();
    }
  }, [$storyLine]);

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
                        id={`slide-${index}`}
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

                <span 
                    onClick={handleGetImage}
                    className="w-full text-white text-xs tracking-normal whitespace-nowrap overflow-hidden text-ellipsis"
                >author Unknown</span>
                <a href="#" className="relative inline-block bg-transparent border border-white border-opacity-45 rounded-[25px] text-white z-10 py-1.5 px-5 text-xs font-semibold uppercase no-underline tracking-normal disabled:pointer-events-none">Follow</a>
            </div>
        </section>
        ) :
        null
    );
}

export default Storyline;
