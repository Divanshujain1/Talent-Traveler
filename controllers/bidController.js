const db = require('../db');

exports.submitBid = async (req, res) => {
  const { job_id, proposal, expected_cost } = req.body;
  const freelancerId = req.user.id; // from JWT

  try {
    // Check if user is a freelancer
    const [roleCheck] = await db.query('SELECT role FROM user_profiles WHERE user_id = ?', [freelancerId]);
    if (roleCheck[0].role !== 'freelancer') {
      return res.status(403).json({ error: 'Only freelancers can submit bids' });
    }

    // Insert bid into table
    await db.query(
      'INSERT INTO bids (job_id, freelancer_id, proposal, expected_cost) VALUES (?, ?, ?, ?)',
      [job_id, freelancerId, proposal, expected_cost]
    );

    res.status(201).json({ message: 'Bid submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while submitting bid' });
  }
};
exports.getBidsForJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const [bids] = await db.query(
      `SELECT b.*, u.name AS freelancer_name
       FROM bids b
       JOIN users u ON b.freelancer_id = u.id
       WHERE b.job_id = ?`, 
      [jobId]
    );

    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching bids' });
  }
};
