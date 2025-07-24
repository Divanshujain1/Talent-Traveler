const db = require('../db');

// ✅ Freelancer Dashboard
exports.getFreelancerBids = async (req, res) => {
  const freelancerId = parseInt(req.params.id);
  const tokenUserId = req.user.id;

  if (freelancerId !== tokenUserId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const [bids] = await db.query(
      `SELECT b.id, b.job_id, j.title AS job_title, b.proposal, b.expected_cost, b.created_at
       FROM bids b
       JOIN jobs j ON b.job_id = j.id
       WHERE b.freelancer_id = ?
       ORDER BY b.created_at DESC`,
      [freelancerId]
    );

    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
};

// ✅ Client Dashboard
exports.getClientJobs = async (req, res) => {
  const clientId = parseInt(req.params.id);
  const tokenUserId = req.user.id;

  if (clientId !== tokenUserId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const [jobs] = await db.query(
      `SELECT j.*, u.name AS hired_freelancer_name
       FROM jobs j
       LEFT JOIN users u ON j.hired_freelancer_id = u.id
       WHERE j.client_id = ?
       ORDER BY j.created_at DESC`,
      [clientId]
    );

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};
