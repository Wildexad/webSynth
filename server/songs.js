exports.List = async (req, res) => {
    try {
        const  r = await req.db.pool.query("SELECT * FROM songs ORDER BY song_name");
        res.json({err: '', songs: r.rows });
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.Add = async (req, res) => {
    try {
        if (!req.body.song_name || !req.body.song_info) {
            res.status(400).send({err: 'Invalidate post data'});
            return;
        }
        let  r = await req.db.pool.query(`
            INSERT into songs(uid, song_name, song_info)
            values ($1, $2, $3)
        `, [req.uid, req.body.song_name, req.body.song_info]);
        if (r.rowCount > 0) {
            r = await req.db.pool.query(`select * from songs where uid = $1 order by song_id desc limit 1`, [req.uid])
            if (r.rows.length > 0) {
                res.json({err: '', song: r.rows[0]});
                return;
            }
        }
        res.json({err: 'Error insert', song: {}});
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.Update = async (req, res) => {
    try {
        if (!req.body.song_id || !req.body.song_name || !req.body.song_info) {
            res.status(400).send('Invalidate post data: {song_id:..., song_name:..., song_info:...}');
            return;
        }
        let  r = await req.db.pool.query(`
            select song_id from songs            
            where song_id=$1
        `, [req.body.song_id]);
        if (r.rows.length > 0) {
            r = await req.db.pool.query(`
                update songs
                set
                    song_name = $1,
                    song_info = $2
                where
                    song_id = $3
            `, [req.body.song_name, req.body.song_info, req.body.song_id]);
            if (r.rowCount > 0) {
                res.json({err: '', song: {
                    song_id: req.body.song_id,
                    uid: req.uid,
                    song_name: req.body.song_name,
                    song_info: req.body.song_info
                }});
                return
            }
        }
        res.json({err: 'Error update', song: {}});
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.Delete = async (req, res) => {
    try {
        if (!req.body.song_id) {
            res.status(400).send({err: 'Invalidate post data'});
            return;
        }
        const  r = await req.db.pool.query(`
            delete from songs
            where song_id = $1
        `, [req.body.song_id]);
        res.status(200).json({err: '', status: 'success' });
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}
