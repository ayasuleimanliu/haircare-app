import express from 'express';
import cors from 'cors';

const app = express();

// ✅ Configure CORS to allow your Vercel frontend
app.use(cors({
  origin: [
    "https://haircare-app.vercel.app", // your production domain
    "https://haircare-app-git-main-ayas-projects-74209d90.vercel.app" // optional: preview builds
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Server is healthy 🌿' });
});

let reviews = [
  { review_id: 1, product_id: 101, customer_name: 'Aya', rating: 5, comment: 'Amazing oil!' },
  { review_id: 2, product_id: 102, customer_name: 'Sam', rating: 4, comment: 'Good quality.' }
];

app.get('/api/reviews/:product_id', (req, res) => {
  const { product_id } = req.params;
  const productReviews = reviews.filter(r => r.product_id == product_id);
  res.json(productReviews);
});

app.post('/api/reviews', (req, res) => {
  const { product_id, customer_name, rating, comment } = req.body;
  const newReview = {
    review_id: reviews.length + 1,
    product_id,
    customer_name: customer_name || 'Anonymous',
    rating: rating ?? 5,
    comment: comment || ''
  };
  reviews.push(newReview);
  res.json({ review_id: newReview.review_id });
});

app.delete('/api/reviews/:review_id', (req, res) => {
  const { review_id } = req.params;
  const initialLength = reviews.length;
  reviews = reviews.filter(r => r.review_id != review_id);
  if (reviews.length === initialLength) {
    return res.status(404).json({ error: 'Review not found' });
  }
  res.json({ message: 'Review deleted successfully' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    return res.json({ success: true, user: { id: 1, username: 'admin', role: 'admin' } });
  }
  if (username) {
    return res.json({ success: true, user: { id: 2, username, role: 'user' } });
  }
  res.status(401).json({ success: false, error: 'Invalid credentials' });
});

app.post('/api/checkout', (req, res) => {
  const { name, phone, email, address, oils } = req.body;
  res.json({
    success: true,
    message: `Order placed successfully for ${name}`,
    order: { name, phone, email, address, oils }
  });
});

app.get('/api/dashboard', (_req, res) => {
  res.json({
    users: 10,
    orders: 5,
    reviews: reviews.length,
    topProducts: [
      { name: 'Coconut Oil', total_sold: 20 },
      { name: 'Argan Oil', total_sold: 15 }
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
