const db = require('../db');

module.exports = {
  login: (req, res) => {
    const { correo, contrasena } = req.body;
    const query = 'SELECT * FROM administrador WHERE correo = $1 AND contrasena = $2';
    const values = [correo, contrasena];

    db.query(query, values)
      .then(response => {
        if (response.rows.length === 1) {
          res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
          res.status(401).json({ error: 'Credenciales incorrectas' });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error en el inicio de sesión' });
      });
  },
};