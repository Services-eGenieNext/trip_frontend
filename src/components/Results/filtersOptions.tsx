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
  }, [filters]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = post.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div ref={ref} className="py-7 border-b border-[#E3E3E3]">
      <h1 className="text-[18px] font-bold">{title}</h1>
      {currentPost.length &&
        currentPost.map((options: any, index: number) => {
          return (
            <>
              <ul key={index} className="mt-5">
                <li className="flex items-start">
                  <input
                    className="mt-1"
                    type={inputType}
                    id={options.name}
                    name={inputType === "radio" ? "radio" : options.name}
                  />
                  <label htmlFor={options.name} className="ml-4">
                    {options.name}
                  </label>
                </li>
              </ul>
            </>
          );
        })}
      {post.length > postPerPage && (
        <button className="border-none outline-none text-[#009DE2] underline mt-5" onClick={() => {
          console.log(post,"post")
          setPostPerPage(postPerPage + 3) 
        }}>
          Show more
        </button>
      )}
    </div>
  );
}
