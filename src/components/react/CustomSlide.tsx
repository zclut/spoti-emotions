import { ANIMATION_TEXT_DURATION } from "@/utils/const";

const CustomSlide = ({ items, title, attribute }) => {

    const CLASSES = {
      tracks: "text-xl sm:text-sm mb-4 sm:mb-2",
      artists: "text-xl sm:text-sm mb-4 sm:mb-2",
      genres: "justify-center text-2xl sm:text-base uppercase text-center mb-12"
    }

    return (
        <div
          key={`slide-${attribute}`}
          id={`slide-${attribute}`}
          className="slide before:absolute before:content-none before:block before:top-0 before:left-0 before:h-full before:w-full hidden"
        >
          <div className="absolute w-full px-[5px] py-[5px] font-semibold tracking-normal text-white left-0 top-[10%]">
            {/* Title */}
            <p className="mb-5 text-2xl text-center animate-rubber-band animate-duration-1000">
              Tus 5 <span className="text-gradient">{title}</span>
            </p>

            {/* Items */}
            <div className="py-[5px] my-auto">
              {items.map(({ artist, image, name }, index) => (
                <div
                  key={`${index}${attribute}`}
                  className={`flex ${index % 2 == 1 && 'flex-row-reverse'} items-center p-2 rounded-lg ${CLASSES[attribute]}`}
                >
                  {
                    image && <img
                      src={image}
                      alt={name}
                      className={`w-20 h-20 sm:w-12 sm:h-12 rounded-2xl mx-2 ${index % 2 == 1 ? 'animate-fade-in-left' : 'animate-fade-in-right' } animate-duration-1000`}
                      style={{ animationDelay: `${(++index) * ANIMATION_TEXT_DURATION}ms` }}
                    />
                  }

                  <div 
                    className={`${index % 2 == 1 ? 'animate-fade-in-left' : 'animate-fade-in-right' } animate-duration-1000`}
                    style={{ animationDelay: `${((++index) * ANIMATION_TEXT_DURATION) + ANIMATION_TEXT_DURATION}ms` }}
                  >
                    <p className="font-bold">{name}</p>
                    {
                        artist && <p className="text-base sm:text-xs text-gray-300 truncate">{artist}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
}
 
export default CustomSlide;