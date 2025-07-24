const db = require('../db'); // SQL DB connection

// GET /api/profile/:id
exports.getUserProfile = (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT id, name, email, role, bio, skills, github, linkedin FROM users WHERE id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error: " + err.message });

    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(results[0]);
  });
};
exports.updateUserProfile = (req, res) => {
  const userId = req.params.id;
  const { bio, skills, github, linkedin } = req.body;

  const sql = `
    UPDATE users
    SET bio = ?, skills = ?, github = ?, linkedin = ?
    WHERE id = ?
  `;

  db.query(sql, [bio, skills, github, linkedin, userId], (err, result) => {
    if (err) return res.status(500).json({ error: "DB Error: " + err.message });

    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully" });
  });
};
// const db = require('../db'); 
// exports.createOrUpdateProfile = async (req, res) => {
//   const { role, bio, skills, portfolio_links } = req.body;
//   const userId = req.user.id;

//   try {
//     const [existing] = await db.query('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);

//     if (existing.length > 0) {
//       await db.query(
//         'UPDATE user_profiles SET role=?, bio=?, skills=?, portfolio_links=? WHERE user_id=?',
//         [role, bio, skills, portfolio_links, userId]
//       );
//       res.json({ message: 'Profile updated' });
//     } else {
//       await db.query(
//         'INSERT INTO user_profiles (user_id, role, bio, skills, portfolio_links) VALUES (?, ?, ?, ?, ?)',
//         [userId, role, bio, skills, portfolio_links]
//       );
//       res.json({ message: 'Profile created' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
