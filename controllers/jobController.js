const db = require('../db'); 


exports.postJob = async (req, res) => {
  const { title, description, budget, skills_required } = req.body;
  const clientId = req.user.id;

  const [roleCheck] = await db.query('SELECT role FROM user_profiles WHERE user_id = ?', [clientId]);
  if (roleCheck[0].role !== 'client') {
    return res.status(403).json({ error: 'Only clients can post jobs' });
  }

  await db.query(
    'INSERT INTO jobs (client_id, title, description, budget, skills_required) VALUES (?, ?, ?, ?, ?)',
    [clientId, title, description, budget, skills_required]
  );

  res.json({ message: 'Job posted' });
};
exports.getJobs = async (req, res) => {
  const jobs = await db.query('SELECT * FROM jobs WHERE is_open = TRUE ORDER BY created_at DESC');
  res.json(jobs);
};

exports.searchJobs = async (req, res) => {
  const skill = req.query.skill || '';
  const jobs = await db.query('SELECT * FROM jobs WHERE skills_required LIKE ?', [`%${skill}%`]);
  res.json(jobs);
};
exports.hireFreelancer = async (req, res) => {
  const { job_id, freelancer_id } = req.body;
  const clientId = req.user.id;

  try {
    // Check if this job belongs to this client
    const [job] = await db.query('SELECT * FROM jobs WHERE id = ? AND client_id = ?', [job_id, clientId]);
    if (job.length === 0) {
      return res.status(403).json({ error: 'Unauthorized or job not found' });
    }

    // Update job with hired freelancer
    await db.query(
      'UPDATE jobs SET hired_freelancer_id = ?, is_open = FALSE WHERE id = ?',
      [freelancer_id, job_id]
    );

    res.json({ message: 'Freelancer hired successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during hiring' });
  }
};

