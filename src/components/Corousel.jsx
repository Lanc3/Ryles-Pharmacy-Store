import { MediaFile, useProduct } from '@shopify/hydrogen';
import { useEffect, useRef, useState } from 'react';

const Carousel = ({data,title}) => {
    const {media, selectedVariant} = useProduct();
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);
    const movePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevState) => prevState - 1);
      }
    };
    const moveNext = () => {
      if (
        carousel.current !== null &&
        carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
      ) {
        setCurrentIndex((prevState) => prevState + 1);
      }
    };
    const isDisabled = (direction) => {
      if (direction === 'prev') {
        return currentIndex <= 0;
      }
      if (direction === 'next' && carousel.current !== null) {
        return (
          carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
        );
      }
      return false;
    };
    useEffect(() => {
      if (carousel !== null && carousel.current !== null) {
        carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
      }
    }, [currentIndex]);
    useEffect(() => {
      maxScrollWidth.current = carousel.current
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : 0;
    }, []);
    return (
      <div className="flex w-full">

        <div className="relative">
          <div className="flex justify-between absolute top left w-full h-full">
            <button
              onClick={movePrev}
              className="hover:bg-blue-900/75 text-ryles-blue w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled('prev')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-20 -ml-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="sr-only">Prev</span>
            </button>
            <button
              onClick={moveNext}
              className="hover:bg-blue-900/75 text-ryles-blue w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled('next')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-20 -ml-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="sr-only">Next</span>
            </button>
          </div>
          <div
            ref={carousel}
            className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
          >
            {data.map((med,index) => {
                let extraProps = {};

if (med.mediaContentType === MODEL_3D_TYPE) {
  extraProps = MODEL_3D_PROPS;
}

return (
  <MediaFile
    tabIndex="0"
    key={med.id || med.image.id}
    className="w-full h-full md:h-auto object-cover  transition-all snap-start border border-gray-200 flex-shrink-0 rounded-lg"
    data={med}
    fetchpriority="low"
    options={{
      height: '485',
      width:'485',
      crop: 'center',
    }}
    {...extraProps}
  />
);
            })}
          </div>
        </div>
      </div>
    );
  };
  const MODEL_3D_TYPE = 'MODEL_3D';
const MODEL_3D_PROPS = {
  interactionPromptThreshold: '0',
};
const VIDEO_TYPE = 'VIDEO';
const IMAGE_TYPE =  'IMAGE';
const EXTERNAL_VIDEO_TYPE = 'EXTERNAL_VIDEO';
export default Carousel;