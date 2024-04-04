const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

exports.getAllUsers = async (req, res) => {
  try {
    const r = await req.db.pool.query("SELECT * FROM users ORDER BY uid")
    res.json({err: '', users: r.rows});
  } catch(e) {
    res.status(500).send(e.message);
  }
}

exports.getUserById = async (req, res) => {
    if (!req.uid) {
      res.status(401).send('Авторизуйтесь');
      return
    }
    
    try {
      const r = await req.db.pool.query("SELECT * FROM users WHERE uid = $1", [req.uid])
      if (r.rows?.length) {
        res.json({err: '', user: r.rows[0]});
        return;
      }
      res.status(404).send('Не найден');
    } catch(e) {
      res.status(500).send(e.message);
    }
}

exports.login = async (req, res) => {
  if (!req.body.login?.length || !req.body.password?.length) {
    res.status(400).send('Not_founded_login_or_password_on_post_request');
    return;
  }

  let user = { uid: 0, name: '', email: '', token: '' };

  if (req.token) {
    res.json({err: 'User already logined', user});
    return;
  }

  try {
    let r = await req.db.pool.query(`
      SELECT
        uid, name, email
      FROM
        users
      WHERE
        trim(login) = $1 and trim(password) = $2
    `, [req.body.login.trim(), req.body.password.trim()]);

    if (!r.rows?.length) {
      res.status(204).send('User not founded');
      return;
    }

    user = { ...r.rows[0], uuid: uuid() }    
    r = await req.db.pool.query('update users set uuid = $1 where uid = $2', [user.uuid, user.uid]);

    user.token = jwt.sign(user, process.env.JWT_SIGN, { expiresIn: '25m'});
    const { exp } = await jwt.decode(user.token);

    res.json({ err: '', user: {...user, token_expires: exp } });
  } catch(e) {
    console.error(e);
    res.status(500).send(e.message);
  }
}

exports.logout = async (req, res) => {
  try {
    let r = await req.db.pool.query(`select * from users where uid = $1 limit 1`, [req.uid])
    if (r.rows.length > 0) {
        r = await req.db.pool.query('update users set uuid = $1 where uid = $2', ['', req.uid]);
        res.json({err: '', status: 'success'});
        return;
    }
    res.status(404).send('user not founded')
  } catch(e) {
    res.status(500).send(e.message);
  }
}

exports.checkAuth = async (req, res, next) => {  
  if (req.token?.length) {    
    try {
      const user = jwt.verify(req.token, process.env.JWT_SIGN);  
      req.uid = user.uid
      next();
      return;
    } catch (e) {
      console.error(e);
    }              
  }
  
  res.status(401).send('Access denied');
  return;  
}


exports.refreshToken = async (req, res) => {
  if (!req.body.uuid?.length) {
    res.status(400).send('Not_founded_uuid');
    return;
  }

  try {
    let r = await req.db.pool.query(`SELECT * FROM users WHERE uuid = $1`, [req.body.uuid.trim()]);

    if (!r.rows?.length) {
      res.status(401).send('Access denied');
      return;
    }

    user = { ...r.rows[0], uuid: uuid() }    
    r = await req.db.pool.query('update users set uuid = $1 where uid = $2', [user.uuid, user.uid]);

    user.token = jwt.sign(user, process.env.JWT_SIGN, { expiresIn: '25m'});
    const { exp } = await jwt.decode(user.token);

    res.json({ err: '', user: {...user, token_expires: exp } });
  } catch(e) {
    console.error(e);
    res.status(500).send(e.message);
  }
}