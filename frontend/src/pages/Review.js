import React, { useState, useEffect } from "react";
import "./Review.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE;

  // Fetch all reviews when page loads
  useEffect(() => {
    fetch(`${API_BASE}/api/reviews`)
      .then(res => res.json())
      .then(setReviews)
      .catch(err => console.error("Error fetching reviews:", err));
  }, [API_BASE]);

  const handleAddReview = async () => {
    if (!newReview.trim() || !newAuthor.trim()) {
      return alert("Please fill both fields!");
    }
    const review = { text: newReview.trim(), author: newAuthor.trim() };

    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const savedReview = await res.json();
      setReviews((prev) => [...prev, savedReview]);
      setNewReview("");
      setNewAuthor("");
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await fetch(`${API_BASE}/api/reviews/${id}`, { method: "DELETE" });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
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
