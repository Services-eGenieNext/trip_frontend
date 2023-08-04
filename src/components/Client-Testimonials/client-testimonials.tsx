import React, { useEffect, useState } from "react";
import ComponentTitle from "../UIComponents/ComponentTitle";
import { BlankStar, FilledStar } from "../icons/Stars";
import BlueButton from "../UIComponents/Buttons/BlueButton";
import styles from "./client-testimonials.module.css";
import Modal from "../Modal/index";
import { ReviewsCall } from "@/api-calls";
import { useAppSelector } from "@/redux/hooks";

const ClientTestimonials = () => {
  const skelton = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [loading, setLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState([]);
  const { reviewsState }: any = useAppSelector((state) => state.reviewsReducer);
  const [openModal, setOpenModal] = useState(false);
  const [showReviews, setShowReviews] = useState(true)

  useEffect(() => {
    setReviewsData(reviewsState);
  }, [reviewsState]);

  useEffect(() => {
    if (reviewsData.length > 0) {
      setLoading(false);
    }
  }, [reviewsData]);

  const reviewArr = new Array(5).fill(1);

  return (
    <div className="sm-width px-4">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <ComponentTitle title="Clients testimonials" />
          <span className="flex flex-wrap gap-2 items-center mt-3">
            <FilledStar />
            <FilledStar />
            <FilledStar />
            <FilledStar />
            <BlankStar />
            {reviewsState.length > 0 ? reviewsState?.length : "0"} Reviews
          </span>
        </div>
        <div
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <BlueButton title={"Write Your review"} />
        </div>
      </div>
{showReviews === true ? (
      <div className="my-10 md:my-20">
        {loading === true
          ? skelton.map((show: any, index: number) => {
              return (
                <div
                key={index}
                  role="status"
                  className="w-full animate-pulse p-8 my-10 shadow rounded-xl"
                >
                    <div className="flex flex-wrap justify-between items-center mb-4">
                    <div className="h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 w-[300px] mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  </div>
                  <div className="flex items-center mt-4 space-x-3">
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
                    <div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              );
            })
          : reviewsData.map((client: any, index: number) => {
              let date_arr = client.createdAt.split('T')[0].split('-')
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-8 my-10 ${styles.testimonialCard}`}
                >
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <h3 className="text-[#333333] italic text-[23px] leading-[52px]">
                      {" "}
                      &ldquo;{client.review}&rdquo;
                    </h3>
                    <span className="text-black font-semibold text-[15px] leading-[18px]">
                      {`${date_arr[2]}/${date_arr[1]}/${date_arr[0]}`}
                    </span>
                  </div>
                  {/* <p className="text-[#5C5B5B] italic text-[17px] leading-[27px] mb-4">{client.desc}</p> */}

                  <div className="flex flex-wrap gap-8 items-center">
                    <div className="gilroy italic font-bold text-xl">Logo</div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-[22px] leading-[52px] text-[var(--green)] mr-2">{`${client.first_name} ${client.second_name}`}</span>
                      {reviewArr &&
                        reviewArr.map((review, index) => {
                          if (index < client.rating) {
                            return <FilledStar key={index} />;
                          } else {
                            return <BlankStar key={index} />;
                          }
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
):(
  ""
)}
      <div className="mt-20 flex justify-center">
        <button className="w-[150px] border-[var(--blue)] bg-[var(--blue)] text-white py-2 rounded-md" onClick={()=>{setShowReviews(!showReviews)}}>{showReviews == true ? "Hide" : "Read"}</button>
      </div>
      {openModal == true ? (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalFor="review"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ClientTestimonials;
