import React, { useState, useEffect, useRef } from "react";

interface IFilters {
  filters?: any;
  inputType?: string;
  title?: string;
}

export default function FiltersOptions({
  filters,
  inputType,
  title,
}: IFilters) {
  const [post, setpost] = useState([]);
  const [postPerPage, setPostPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null)

  useEffect(() => {
    setpost(filters);
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = post.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div ref={ref} className="py-7 border-b border-[#E3E3E3]">
      <h1 className="text-[18px] font-bold">{title}</h1>
      {currentPost.length &&
        currentPost.map((filters: any, index: number) => {
          return (
            <>
              <ul key={index} className="mt-5">
                <li className="flex items-start">
                  <input
                    className="mt-1"
                    type={inputType}
                    id={filters.label}
                    name={inputType === "radio" ? "radio" : filters.label}
                  />
                  <label htmlFor={filters.label} className="ml-4">
                    {filters.label}
                  </label>
                </li>
              </ul>
            </>
          );
        })}
      {filters.length > postPerPage && (
        <button className="border-none outline-none text-[#009DE2] underline mt-5" onClick={() => setPostPerPage(postPerPage + 3)}>
          Show more
        </button>
      )}
    </div>
  );
}
