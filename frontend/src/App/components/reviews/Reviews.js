import React from "react";
import { Link } from "react-router-dom"

// components
import {Sidebar} from "../navigation/Sidebar";
import ReviewsList from "./ReviewsList";

// data
import { toshiList } from '../../data/lists'



export default function Reviews({history, type}) {
  return (
    <>
      <div
        className={
          type === "meetToshi" ? "container__screen--sidebar" : "container__home--reviews-3"
        }
      >
        {/* {type === "meetToshi" && <Sidebar title="Toshi" list={toshiList} />} */}
        <div
          className={
            type === "meetToshi"
              ? "toshi--card__meetToshi"
              : "container__home--reviews-2"
          }
        >
          <div
            className="reviews"
            style={
              type === "meetToshi" ? { display: "block" } : { display: "flex" }
            }
          >
            {type === "meetToshi" && (
              <Link to={`/review/create-review`} className="btn__reviews">
                <span className="font-size-6" style={{ textAlign: "center" }}>
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
