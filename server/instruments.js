exports.List = async (req, res) => {
    try {
        const  r = await req.db.pool.query("SELECT * FROM instruments ORDER BY instr_name");
        res.json({err: '', instruments: r.rows });
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.Add = async (req, res) => {
    try {
        if (!req.body.instr_name || !req.body.instr_info) {
            res.status(400).send({err: 'Invalidate post data'});
            return;
        }
        let  r = await req.db.pool.query(`
            INSERT into instruments(uid, instr_name, instr_info)
            values ($1, $2, $3)
        `, [req.uid, req.body.instr_name, req.body.instr_info]);
        if (r.rowCount > 0) {
            r = await req.db.pool.query(`select * from instruments where uid = $1 order by instr_id desc limit 1`, [req.uid])
            if (r.rows.length > 0) {
                res.json({err: '', instrument: r.rows[0]});
                return;
            }
        }
        res.json({err: 'Error insert', instrument: {}});
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.Update = async (req, res) => {
    try {
        if (!req.body.instr_id || !req.body.instr_name || !req.body.instr_info) {
            res.status(400).send('Invalidate post data: {instr_id:..., instr_name:..., instr_info:...}');
            return;
        }
        let  r = await req.db.pool.query(`
            select instr_id from instruments            
            where instr_id=$1
        `, [req.body.instr_id]);
        if (r.rows.length > 0) {
            r = await req.db.pool.query(`
                update instruments
                set
                    instr_name = $1,
                    instr_info = $2
                where
                    instr_id = $3
            `, [req.body.instr_name, req.body.instr_info, req.body.instr_id]);
            if (r.rowCount > 0) {
                res.json({err: '', instrument: {
                    instr_id: req.body.instr_id,
                    uid: req.uid,
                    instr_name: req.body.instr_name,
                    instr_info: req.body.instr_info
                }});
                return
            }
        }
        res.json({err: 'Error update', instrument: {}});
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.Delete = async (req, res) => {
    try {
        if (!req.body.instr_id) {
            res.status(400).send({err: 'Invalidate post data'});
            return;
        }
        const  r = await req.db.pool.query(`
            delete from instruments
            where instr_id = $1
        `, [req.body.instr_id]);
        res.status(200).json({err: '', status: 'success' });
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}
