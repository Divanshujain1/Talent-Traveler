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

