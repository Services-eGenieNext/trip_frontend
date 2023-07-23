import React from 'react'
import ReactStars from "react-rating-stars-component";

export default function index() {
    const ratingChanged = (newRating:any) => {
        console.log(newRating);
      };
  return (
    <>
    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={35}
    activeColor="#ffd700"
  />
    </>
  )
}
