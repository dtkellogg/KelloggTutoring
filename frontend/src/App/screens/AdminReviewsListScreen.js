import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheckSquare, FaTrash, FaTimes } from 'react-icons/fa'

// actions
import { listReviews, deleteReview, updateReview } from "../actions/reviewActions";
import { subheader } from "../actions/subheader";

// components
import Sidebar from "../components/Sidebar";

// hooks
import { useSortMultiple } from "../hooks/useSort";

// data
const adminList = ["Users", "Appts", "Reviews", "Requests", "Stats"]


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
            // dispatch(updateReview({_id: id, approved: !approved}))
        }
        // console.log(review)
        // e.preventDefault()
        // dispatch(updateReview({ _id: review.id, name: review.name, relation: review.relation, msg: review.msg }))
    }

    React.useEffect(() => {
        dispatch(listReviews())
    }, [dispatch, loadingDelete, errorDelete, successDelete, successUpdate])

    React.useEffect(() => {
        if (loadingDelete) {
            dispatch(subheader("Loading..."));
        } else {
            dispatch(subheader(""));
        }

    }, [dispatch, loadingDelete, errorDelete])

    // console.log(sortedReviews[0])
    // console.log(`reviews: ${reviews[0]}`)


    return (
        <div className="pg__meetToshi">
            <Sidebar title="Toshi" list={adminList} />
            <div className="reviewsAdmin">
                <div className="text-size-2 reviewsAdmin__header">
                    All reviews:
                </div>
                
                <div className="admin__table--container">
                    <table className="text-size-3 reviewsAdmin__list--all">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th__reviews-list reviewsAdmin__th--posted">date</th>
                                <th className="th__reviews-list reviewsAdmin__th--by">by</th>
                                <th className="th__reviews-list reviewsAdmin__th--msg">message</th>
                                <th className="th__reviews-list reviewsAdmin__th--approved">ok?</th>
                                <th className="th__reviews-list reviewsAdmin__th--delete"></th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {sortedReviews.map((review) => {
                                const date = review.date.split("T")[0].split("-");
                                return (
                                    <tr key={review._id} className="reviewsAdmin__list--item">
                                        <td className="text-size-3 reviewsAdmin__item--posted">{`${date[1]}-${date[2]}`}</td>
                                        <td className="text-size-3 reviewsAdmin__item--by"> {review.name}</td>
                                        <td className="text-size-3 reviewsAdmin__item--msg">{review.msg}</td>
                                        <td className="text-size-3 reviewsAdmin__item--approved">
                                            {review.approved ? (
                                            <FaCheckSquare
                                                size={20}
                                                color="var(--green-dark)"
                                                fill="var(--green)"
                                                className="social-media-icon grey-light-7"
                                                type="button"
                                                onClick={() => approvedHandler(review._id)}
                                            />
                                            ) : (
                                                    <FaTimes
                                                        size={20}
                                                        color="var(--green-dark)"
                                                        fill="var(--grey-light-5)"
                                                        className="social-media-icon"
                                                        type="button"
                                                        onClick={() => approvedHandler(review._id)}
                                                    />
                                                )
                                            }
                                        </td>


                                        <td className="text-size-3 reviewsAdmin__item--delete">
                                            <FaTrash
                                                size={20}
                                                color="var(--green-dark)"
                                                fill="var(--red)"
                                                className="social-media-icon__trash grey-light-7"
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
