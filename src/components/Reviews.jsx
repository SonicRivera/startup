import React from 'react';

const reviews = [
    {
        rating: '★★★★★',
        text: '“Absolutely delicious! The sauce was heavenly!”',
        author: 'Sarah L.'
    },
    {
        rating: '★★★★☆',
        text: '“Quick and easy to make. Perfect for weeknight dinners!”',
        author: 'James R.'
    },
    {
        rating: '★★★★★',
        text: '“Good balance between pasta and meat, very delicious!”',
        author: 'Lauren R.'
    }
];

export function Reviews() {
    const recentReviews = reviews.slice(-3); // Get only the three most recent reviews


    return (
        <section className="container my-4">
            <h2 className="text-center mb-4">User Reviews</h2>
            {recentReviews.map((review, index) => (
                <blockquote key={index} className="blockquote text-center mb-4">
                    <p>
                        <span className="revstars">{review.rating}</span> {review.text} - {review.author}
                    </p>
                </blockquote>
            ))}
        </section>
    );
}

