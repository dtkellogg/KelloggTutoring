import React from "react";
import { Link } from "react-router-dom"

// components
import Sidebar from "./Sidebar";
import ReviewsList from "./ReviewsList";

// data
import { toshiList } from '../data/lists'



export default function Reviews({history, type}) {
  return (
    <>
      <div
        className={
          type === "meetToshi" ? "pg__meetToshi" : "pg__home--container"
        }
      >
        {type === "meetToshi" && <Sidebar title="Toshi" list={toshiList} />}
        <div
          className={
            type === "meetToshi"
              ? "pg__meetToshi--card__meetToshi"
              : "pg__home--review-container"
          }
        >
          <div
            className="reviews"
            style={
              type === "meetToshi" ? { display: "block" } : { display: "flex" }
            }
          >
            {type === "meetToshi" && (
              <Link
                to={`/review/create-review`}
                className="btn__reviews"
              >
                <span className="text-size-6" style={{ textAlign: "center" }}>
                  Create Review
                </span>
              </Link>
            )}

            <ReviewsList type={type} />
          </div>
        </div>
      </div>
    </>
  );
}
