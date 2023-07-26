import {useEffect} from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CSS from "./location.module.css";
import Ballon from "/public/images/baloon-transparent.png"
import Image from 'next/image';
import { useAppSelector } from "@/redux/hooks";
import BlankLocation from "public/images/blank-location.jpg"

const locationSlider = [
  {
    images: "/images/activities_slider_images/activity_1.png",
    location: "Bali, Indonesia",
  },
  { images: "/images/activities_slider_images/activity_2.png", location: "Morocco" },
  { images: "/images/activities_slider_images/activity_3.png", location: "Spain" },
  { images: "/images/activities_slider_images/activity_4.png", location: "Italy" },
  {
    images: "/images/activities_slider_images/activity_5.png",
    location: "Bali, Indonesia",
  },
  { images: "/images/activities_slider_images/activity_6.png", location: "Morocco" },
  { images: "/images/activities_slider_images/activity_7.png", location: "Spain" },
  {
    images: "/images/activities_slider_images/activity_1.png",
    location: "Bali, Indonesia",
  },
  { images: "/images/activities_slider_images/activity_2.png", location: "Morocco" },
  { images: "/images/activities_slider_images/activity_3.png", location: "Spain" },
  { images: "/images/activities_slider_images/activity_4.png", location: "Italy" },
  {
    images: "/images/activities_slider_images/activity_5.png",
    location: "Bali, Indonesia",
  },
  { images: "/images/activities_slider_images/activity_6.png", location: "Morocco" },
  { images: "/images/activities_slider_images/activity_7.png", location: "Spain" },
];

function ActivitiesSlider() {
  const { activitiesState } = useAppSelector((state) => state.popularActivities)
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={CSS["activity_arrow_next"]}
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
        className={CSS["activity_arrow_prev"]}
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: false,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 1330,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 800,
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
        breakpoint: 600,
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
        breakpoint: 380,
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

  useEffect(()=>{
console.log(activitiesState,"activitiesState")
  },[activitiesState])
  return (
    <div className="w-full flex justify-center relative mt-20 bg-[#F9FDFF] py-12 px-10">
      <Image src={Ballon} alt='Baloon 1' className={`absolute left-12 top-[-10%] select-none ${CSS["image_opacity"]}`} />
      <Image src={Ballon} alt='Baloon 1' className={`absolute lg:right-24 lg:flex hidden right-18 bottom-[12%] select-none ${CSS["image_opacity"]}`} />
      <Image src={Ballon} alt='Baloon 1' className={`absolute right-[13%] md:flex hidden bottom-[-14%] select-none w-[70px]`} />
      <div className="sm-width flex flex-col items-center relative">
        <div className="flex flex-col items-center">
          <p className="text-2xl md:text-4xl font-bold">
            Popular Activities For You
          </p>
          <p className="text-[var(--gray)] text-center">
            Explore some of the most exciting and trending activities across the
            globe!
          </p>
        </div>
        <div className="mt-10 w-[90%] arrow_remove">
          <Slider {...settings}>
            {activitiesState.length > 0 &&
              activitiesState.map(
                (
                  activities: any,
                  index
                ) => {
                  let image_path = activities.images.length == 0 ? BlankLocation.src  : activities.images[0]?.images?.original?.url ?? (activities.images[0]?.images?.large?.url ?? activities.images[0]?.images?.medium?.url)
                  return (
                    <div key={index}>
                      <div className='flex flex-col items-center w-[133px]'>
                      <img
                      className='w-full h-[110px]'
                        src={image_path}
                       alt={activities.address_obj.address_string}
                      />
                      <h1 className="text-[18px] mt-3 text-center">
                        {activities.name}
                      </h1>
                      </div>
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

export default ActivitiesSlider;
