import React from 'react'
import CSS from "./Slider.module.css"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css"

interface ISliderComponent {
    children: React.ReactNode
    slidesToShow?: number
}

const SliderComponent = ({children, slidesToShow=4}: ISliderComponent) => {

    function SampleNextArrow(props: any) {
        const { style, onClick } = props;
        return (
        <div
            className={`cursor-pointer select-none ${CSS["slick-next"]}`}
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
        const { style, onClick } = props;
        return (
        <div
            className={`cursor-pointer select-none ${CSS["slick-prev"]}`}
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
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
        {
            breakpoint: 1200,
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
            breakpoint: 800,
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
            breakpoint: 550,
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
        <Slider {...settings}>
            {children}
        </Slider>
    )
}

export default SliderComponent