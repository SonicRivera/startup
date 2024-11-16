import React, { useState, useEffect } from 'react';

export function Reviews({ reviews, setAverageRating, username, recipeId }) {
    const [newReview, setNewReview] = useState({ rating: '', text: '', author: username });

    useEffect(() => {
        const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        setAverageRating(average);
    }, [reviews, setAverageRating]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newReview.rating && newReview.text && newReview.author) {
            try {
                const response = await fetch(`http://localhost:4000/api/recipes/${recipeId}/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newReview),
                });

                if (response.ok) {
                    const review = await response.json();
                    reviews.push(review);
                    setNewReview({ rating: '', text: '', author: username });
                } else {
                    console.error('Failed to submit review');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const renderStars = (rating) => {
        if (isNaN(rating) || rating < 0) {
            rating = 0;
        } else if (rating > 5) {
            rating = 5;
        }
        return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
    };

    // Get the three most recent reviews
    const recentReviews = reviews.slice(-3);

    return (
        <section className="container my-4">
            <h2 className="text-center mb-4">Recent User Reviews</h2>
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