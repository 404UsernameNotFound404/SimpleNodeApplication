const assert = require('assert');

module.exports = function (app, db) {
    const collection = db.db('404UsernameNotFound404').collection("notes");
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title }
        collection.insertOne(note, (err, results) => {
            if (err) {
                console.log(err);
                res.send({ err: 'an error has occured' });
            } else {
                res.send(results.ops[0]);
            }
        });
    });
    app.get('/api', async (req, res) => {
        let dataArray = [];
        let cursor = await collection.find().toArray((err, results) => {
            if (err) throw err;
            console.log('in here');
            res.send(results);
        });
        // res.send({ err: "error happened" });
    })
}

test = async (cursor, dataArray) => {
    console.log('start test');
    let test = await cursor.forEach((err, doc) => {
        console.log('in cursor');
        if (doc !== null) {
            console.log(doc);
            dataArray.push(doc);
        }
    });
    console.log('end of test');
}