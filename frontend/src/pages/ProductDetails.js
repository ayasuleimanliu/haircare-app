import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Review.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ customer_name: '', rating: 5, comment: '' });

  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.product_id === Number(id));
        setProduct(found);
      });

    fetch(`${API_BASE}/api/reviews/${id}`)
      .then(res => res.json())
      .then(setReviews)
      .catch(console.error);
  }, [id, API_BASE]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer_name.trim() || !form.comment.trim()) return toast.warn("Please fill all fields");

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
      {/* ...rest of your component unchanged */}
    </div>
  );
}

export default ProductDetails;
