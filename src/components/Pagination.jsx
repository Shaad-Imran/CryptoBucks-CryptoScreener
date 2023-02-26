import React, { useState, useRef } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { useGlobalContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const inputRef = useRef(null);
  const { setPerPage } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form
      className="relative flex items-center font-nunito
  mr-12
  "
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center
  mr-2 font-bold
  "
      >
        perpage:
      </label>
      <input
        type="number"
        name="perpage"
        ref={inputRef}
        placeholder="10"
        min={1}
        max={250}
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100
pl-2 required outline-0 border border-transparent 
focus:border-cyan leading-4
"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination = () => {
  const { page, setPage, totalPages, perPage, cryptoData } = useGlobalContext();

  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center">
        <PerPage />
        <ul className="flex items-center justify-end textsm">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
              <img
                className="w-full h-auto rotate-180"
                src={paginationArrow}
                alt="left"
              />
            </button>
          </li>
          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              <button
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
                onClick={multiStepPrev}
              >
                {" "}
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                onClick={prev}
              >
                {" "}
                {page - 1}
              </button>
            </li>
          ) : null}

          <li>
            <button
              className="ouline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
              disabled
            >
              {" "}
              {page}
            </button>
          </li>
          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                onClick={next}
              >
                {" "}
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
                onClick={multiStepNext}
              >
                {" "}
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                onClick={() => setPage(TotalNumber)}
              >
                {" "}
                {TotalNumber}
              </button>
            </li>
          ) : null}

          <li>
            <button className="outline-0 hover:text-cyan w-8" onClick={next}>
              <img
                className="w-full h-auto"
                src={paginationArrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
