import React, { useState, useEffect } from 'react';

const initialReviews = [
    { rating: 5, text: '“Absolutely delicious! The sauce was heavenly!”', author: 'Sarah L.' },
    { rating: 4, text: '“Quick and easy to make. Perfect for weeknight dinners!”', author: 'James R.' },
    { rating: 5, text: '“Good balance between pasta and meat, very delicious!”', author: 'Lauren R.' }
];

export function Reviews({ setAverageRating, username }) {
    const [reviews, setReviews] = useState(initialReviews);
    const [newReview, setNewReview] = useState({ rating: '', text: '', author: username });

    useEffect(() => {
        const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        setAverageRating(average);
    }, [reviews, setAverageRating]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.rating && newReview.text && newReview.author) {
            setReviews((prev) => [...prev, { ...newReview, rating: parseInt(newReview.rating) }]);
            setNewReview({ rating: '', text: '', author: username });
        }
    };

    const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const recentReviews = reviews.slice(-3);

    return (
        <section className="container my-4">
            <h2 className="text-center mb-4">User Reviews</h2>
            {recentReviews.map((review, index) => (
                <blockquote key={index} className="blockquote text-center mb-4">
                    <p>
                        <span className="revstars">{renderStars(review.rating)}</span> {review.text} - {review.author}
                    </p>
                </blockquote>
            ))}

            {username && (
                <>
                    <h3 className="text-center mt-5">Add a Review</h3>
                    <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="rating" className="form-label">Rating (1 to 5):</label>
                            <input
                                type="number"
                                className="form-control"
                                id="rating"
                                name="rating"
                                value={newReview.rating}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">Your Review:</label>
                            <textarea
                                className="form-control"
                                id="text"
                                name="text"
                                rows="3"
                                value={newReview.text}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Review</button>
                    </form>
                </>
            )}
        </section>
    );
}

export default Reviews;