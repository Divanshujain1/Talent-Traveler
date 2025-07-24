const db = require('../db');

exports.submitReview = async (req, res) => {
  const { job_id, freelancer_id, rating, comment } = req.body;
  const clientId = req.user.id; // From JWT

  try {
    // Validate role (must be client)
    const [roleCheck] = await db.query('SELECT role FROM user_profiles WHERE user_id = ?', [clientId]);
    if (roleCheck[0].role !== 'client') {
      return res.status(403).json({ error: 'Only clients can submit reviews' });
    }

    // Check if the client actually hired this freelancer
    const [job] = await db.query('SELECT * FROM jobs WHERE id = ? AND client_id = ? AND hired_freelancer_id = ?', [job_id, clientId, freelancer_id]);
    if (job.length === 0) {
      return res.status(403).json({ error: 'You can only review your hired freelancer' });
    }

    // Insert review
    await db.query(
      'INSERT INTO reviews (job_id, client_id, freelancer_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [job_id, clientId, freelancer_id, rating, comment]
    );

    res.status(201).json({ message: 'Review submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error submitting review' });
  }
};
exports.getFreelancerReviews = async (req, res) => {
  const freelancerId = req.params.freelancer_id;

  try {
    const [reviews] = await db.query(
      `SELECT r.rating, r.comment, r.created_at, u.name AS client_name
       FROM reviews r
       JOIN users u ON r.client_id = u.id
       WHERE r.freelancer_id = ?`,
      [freelancerId]
    );

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

