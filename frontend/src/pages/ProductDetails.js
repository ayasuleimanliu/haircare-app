import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Review.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ customer_name: '', rating: 5, comment: '' });

  // Use environment variable for backend
  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    // Fetch product details
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.product_id === Number(id));
        setProduct(found);
      })
      .catch(err => console.error("Product fetch error:", err));

    // Fetch reviews for this product
    fetch(`${API_BASE}/api/reviews/${id}`)
      .then(res => res.json())
      .then(setReviews)
      .catch(err => console.error("Reviews fetch error:", err));
  }, [id, API_BASE]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer_name.trim() || !form.comment.trim()) {
      return toast.warn("Please fill all fields");
    }

    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: id, ...form })
      });
      const data = await res.json();

      const newReview = {
        ...form,
        review_id: data.review_id,
        created_at: new Date().toISOString()
      };
      setReviews([newReview, ...reviews]);
      setForm({ customer_name: '', rating: 5, comment: '' });
      toast.success("Review posted!");
    } catch (err) {
      toast.error("Error posting review");
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await fetch(`${API_BASE}/api/reviews/${reviewId}`, { method: 'DELETE' });
      setReviews(reviews.filter(r => r.review_id !== reviewId));
      toast.info("Review removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (!product) return <div className="reviews">Loading Product...</div>;

  return (
    <div className="reviews">
      <section className="product-info-section">
        <h1>{product.name}</h1>
        <p className="product-desc">{product.description}</p>
        <p className="product-price">Price: <span>${product.price}</span></p>
      </section>

      <hr className="divider" />

      <h2>Customer Reviews</h2>

      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />
        <input
          type="text"
          placeholder="Your name"
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
        />
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        >
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
        </select>
        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div className="review-card" key={review.review_id}>
            <div className="review-header">
              <div className="user-meta">
                <strong>{review.customer_name}</strong>
                <span className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <span className="rating-tag">{review.rating} ★</span>
            </div>
            <p className="comment-body">"{review.comment}"</p>
            <button className="delete-btn" onClick={() => handleDelete(review.review_id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
