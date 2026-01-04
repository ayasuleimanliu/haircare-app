import React, { useState } from "react";
import "./Review.css";

function Reviews() {
  const [reviews, setReviews] = useState([
    { id: 1, text: "Coconut oil made my hair so soft and shiny!", author: "Layla S." },
    { id: 2, text: "Argan oil reduced my frizz instantly. Highly recommend!", author: "Karim A." },
    { id: 3, text: "Castor oil really helped with my hair growth.", author: "Maya R." },
    { id: 4, text: "Almond oil nourished my ends and reduced breakage.", author: "Nour H." },
    { id: 5, text: "Rosemary oil boosted circulation and made my scalp feel fresh.", author: "Omar D." },
  ]);

  const [newReview, setNewReview] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const handleAddReview = () => {
    if (!newReview.trim() || !newAuthor.trim()) {
      return alert("Please fill both fields!");
    }
    const review = { id: Date.now(), text: newReview.trim(), author: newAuthor.trim() };
    setReviews((prev) => [...prev, review]);
    setNewReview("");
    setNewAuthor("");
  };

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="reviews">
      <h2>Customer Reviews on Our Hair Oils</h2>

      <div className="add-review">
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your name"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button onClick={handleAddReview}>Add Review</button>
      </div>

      {reviews.map((review) => (
        <div className="review" key={review.id}>
          <p>"{review.text}"</p>
          <span>- {review.author}</span>
          <button className="delete-btn" onClick={() => handleDeleteReview(review.id)}>
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

export default Reviews;
