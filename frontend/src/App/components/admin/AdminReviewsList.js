import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheckSquare, FaTrash, FaTimes } from 'react-icons/fa'

// actions
import { listReviews, deleteReview, updateReview } from "../../actions/reviewActions";
import { subheader } from "../../actions/subheader";

// hooks
import { useSortMultiple } from "../../hooks/useSort";


export default function AdminReviewsList({ location, history }) {
    const dispatch = useDispatch()

    const reviewList = useSelector((state) => state.reviewList);
    const { loading, error, reviews } = reviewList; // eslint-disable-line no-unused-vars

    const reviewDelete = useSelector((state) => state.reviewDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = reviewDelete;

    const reviewUpdate = useSelector((state) => state.reviewUpdate);
    const {
        loading: loadingUpdate, // eslint-disable-line no-unused-vars
        error: errorUpdate, // eslint-disable-line no-unused-vars
        success: successUpdate
    } = reviewUpdate;

    const sortedReviews = useSortMultiple(reviews, "date", "name");


    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            dispatch(deleteReview(id))
        }
    }

    const approvedHandler = (id) => {
        const selectedReview = reviews.find(x => x._id === id)
        const { approved, name, relation, msg } = selectedReview

        console.log(approved)
        if (window.confirm("Are you sure you want to approve this review?")) {
            dispatch(updateReview({ _id: id, approved: !approved, name, relation, msg }))
        }
    }

    useEffect(() => {
        dispatch(listReviews())
    }, [dispatch, loadingDelete, errorDelete, successDelete, successUpdate])

    useEffect(() => {
        if (loadingDelete) {
            dispatch(subheader("Loading..."));
        } else {
            dispatch(subheader(""));
        }
    }, [dispatch, loadingDelete, errorDelete])


    return (
        <div className="container__screen--sidebar">
            <div className="container__admin-reviews">
                <div className="header__admin-reviews">
                    All reviews
                </div>
                
                <div className="container__admin--table">
                    <table className="admin-reviews__list--all">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th__reviews-list admin-reviews__th--posted">date</th>
                                <th className="th__reviews-list admin-reviews__th--by">by</th>
                                <th className="th__reviews-list admin-reviews__th--msg">message</th>
                                <th className="th__reviews-list admin-reviews__th--approved">ok?</th>
                                <th className="th__reviews-list admin-reviews__th--delete"></th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {sortedReviews.map((review) => {
                                const date = review.date.split("T")[0].split("-");
                                return (
                                    <tr key={review._id} className="admin-reviews__list--item">
                                        <td className="admin-reviews__item--posted">{`${date[1]}-${date[2]}`}</td>
                                        <td className="admin-reviews__item--by"> {review.name}</td>
                                        <td className="admin-reviews__item--msg">{review.msg}</td>
                                        <td className="admin-reviews__item--approved">
                                            {review.approved ? (
                                            <FaCheckSquare
                                                size={20}
                                                color="var(--green-2"
                                                fill="var(--green-1)"
                                                className="icon grey-7"
                                                type="button"
                                                onClick={() => approvedHandler(review._id)}
                                            />
                                            ) : (
                                                    <FaTimes
                                                        size={20}
                                                        color="var(--green-2)"
                                                        fill="var(--grey-5)"
                                                        className="icon"
                                                        type="button"
                                                        onClick={() => approvedHandler(review._id)}
                                                    />
                                                )
                                            }
                                        </td>


                                        <td className="admin-reviews__item--delete">
                                            <FaTrash
                                                size={20}
                                                color="var(--green-2)"
                                                fill="var(--red-1)"
                                                className="icon__trash grey-7"
                                                type="button"
                                                onClick={() => deleteHandler(review._id)}
                                            />
                                        </td>

                                        {/* <button className="btn__cancel">Cancel</button> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
