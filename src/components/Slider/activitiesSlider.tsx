import {useEffect,useState} from 'react'
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
  const { activitiesState }:any = useAppSelector((state) => state.popularActivities)
  const skelton = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([])

  useEffect(() => {
    setActivity(activitiesState)
  }, [activitiesState]);

  useEffect(()=>{
    if(activity.length > 0){
      setLoading(false)
    }
  },[activity])
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
          {loading === true
              ? skelton.map((limit: string, index: number) => {
                  return (
                    <div
                    key={index}
                      role="status"
                      className="max-w-sm rounded animate-pulse h-[133px] relative sm:px-0 px-4 flex flex-col items-center"
                    >
                      <div className="flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700 sm:h-[110px] sm:w-[133px]">
                        <svg
                          className="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                      </div>
                      <div className="h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 w-[60%] mb-4"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                })
              :(
                activity?.map(
                    (
                      activities: any,
                      index:number
                    ) => {
                      let image_path = activities.images === "" ? BlankLocation.src  : activities.images
                      return (
                        <div key={index} className='sm:px-0 px-4'>
                          <div className='flex flex-col items-center justify-center sm:w-[133px] w-full'>
                          <img
                          className='w-full h-[124px]'
                          src={image_path} alt={image_path}
                          />
                          <h1 className="text-[18px] mt-3 text-center">
                            {activities.name}
                          </h1>
                          </div>
                        </div>
                      );
                    }
                  )
              )}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesSlider;
