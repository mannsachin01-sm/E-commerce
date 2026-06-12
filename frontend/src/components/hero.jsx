/* eslint-disable react/prop-types */
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

const HeroBanner = ({ images }) => {
    return (
        <div className="relative text-white text-[20px] w-full my-auto mx-auto">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                renderArrowPrev={(clickHandler) => (
                    <div
                        onClick={clickHandler}
                        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none"
                        aria-label="Previous Slide"
                    >
                        <BiArrowBack className="text-lg" />
                    </div>
                )}
                renderArrowNext={(clickHandler) => (
                    <div
                        onClick={clickHandler}
                        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none"
                        aria-label="Next Slide"
                    >
                        <BiArrowBack className="rotate-180 text-lg" />
                    </div>
                )}
            >
                {images?.map((img, i) => (
                    <div key={i}>
                        <img src={img.url} alt={`Slide ${i}`} className="rounded-lg w-full object-cover h-[50vh] md:h-[625px]" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroBanner;
