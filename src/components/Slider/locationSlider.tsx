import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CSS from "./location.module.css";
import ComponentTitle from "../UIComponents/ComponentTitle";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

const locationSlider = [
  {
    images: "/images/location_Slider_images/location_1.png",
    location: "Bali, Indonesia",
  },
  { images: "/images/location_Slider_images/location_2.png", location: "Morocco" },
  { images: "/images/location_Slider_images/location_3.png", location: "Spain" },
  { images: "/images/location_Slider_images/location_4.png", location: "Italy" },
  {
    images: "/images/location_Slider_images/location_1.png",
    location: "Bali, Indonesia",
  },
  { images: "/images/location_Slider_images/location_2.png", location: "Morocco" },
  { images: "/images/location_Slider_images/location_3.png", location: "Spain" },
  { images: "/images/location_Slider_images/location_4.png", location: "Italy" },
];

export default function LocationSlider() {

  const { locationsState } = useAppSelector((state) => state.locationReducer)

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={CSS["slick-next"]}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={CSS["slick-prev"]}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  return (
    <div className="w-full flex justify-center mt-20  relative">
      <div className="sm-width">
        <div className="lg:w-[45%] md:w-[60%] w-[95%] flex flex-col sm:items-start items-center">
          <ComponentTitle title="Trending Locations" />
          <p className="text-[var(--gray)] sm:text-start text-center">
            We keep track of what cities are on the rise and which ones are
            falling so you can stress less and focus more on living your best
            vacation life!
          </p>
        </div>
        <div className="mt-10">
          <Slider {...settings}>
            {locationsState.length > 0 &&
              locationsState.map(
                (
                  location,
                  index
                ) => {
                  let image_path = location.images[0].images?.original?.url ?? location.images[0].images?.large?.url
                  return (
                    <div key={index} className="relative md:mt-0 mt-5 h-[350px] w-full px-3">
                      <div className="rounded-xl overflow-hidden block" style={{background: `url(${image_path})`}}>
                        <Image src={image_path} fill={true} alt={location.location.address_obj.address_string} style={{objectFit: "cover"}} />
                      </div>
                      <h1 className="absolute bottom-4 left-6 text-white font-bold text-[25px]">{location.location.address_obj.address_string}</h1>
                    </div>
                  );
                }
              )}
          </Slider>
        </div>
      </div>
    </div>
  );
}
