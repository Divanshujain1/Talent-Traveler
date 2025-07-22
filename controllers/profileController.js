const db = require('../db'); 
exports.createOrUpdateProfile = async (req, res) => {
  const { role, bio, skills, portfolio_links } = req.body;
  const userId = req.user.id;

  try {
    const [existing] = await db.query('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);

    if (existing.length > 0) {
      await db.query(
        'UPDATE user_profiles SET role=?, bio=?, skills=?, portfolio_links=? WHERE user_id=?',
        [role, bio, skills, portfolio_links, userId]
      );
      res.json({ message: 'Profile updated' });
    } else {
      await db.query(
        'INSERT INTO user_profiles (user_id, role, bio, skills, portfolio_links) VALUES (?, ?, ?, ?, ?)',
        [userId, role, bio, skills, portfolio_links]
      );
      res.json({ message: 'Profile created' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
