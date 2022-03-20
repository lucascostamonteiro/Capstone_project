import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import EditReviewModal from '../EditReviewModal'
import { deleteReview } from '../../store/review'


const SingleReview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const reviewObj = useSelector(state => state.reviews);
  const reviews = Object.values(reviewObj);
  const listingReview = reviews.filter(({ listing_id }) => listing_id === +id);
  console.log('REVIEW', listingReview.id);


  const handleDelete = async (review, e) => {
    e.preventDefault();
    await dispatch(deleteReview(review))
  }


  return (
    <div>
      {listingReview.map(review => (
        <div key={review.id}>
          <div>{review.user.username}</div>
          <div>{dayjs(review.createdAt).format("MMMM YYYY")}</div>
          <div>{review.rating}</div>
          <div>
            {[...Array(review.rating)].map((star, idx) => (
              <i className="fa-solid fa-star" key={idx}></i>
            ))}
          </div>
          <div>{review.content}</div>
          <div>
            {sessionUser?.id === review?.user?.id &&
              <>
                <EditReviewModal review={review} />
                <button onClick={(e) => handleDelete(review, e)}>Delete</button>
              </>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default SingleReview;