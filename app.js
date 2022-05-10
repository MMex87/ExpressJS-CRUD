const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mysql = require('mysql');
const app = express();
const port = 2000;


// use ejs
app.set('view engine', 'ejs');



// use third- party middleware
app.use(expressLayout);
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Koneksi ke database
const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_praktikum'
})

koneksi.connect((err) => {
    if (err) throw err;
    console.log('Data base berhasil Connect');
});


// controler
app.get('/', (req, res) => {
    koneksi.query('SELECT * from data_gaming', (err, results) => {
        if (err) throw err
        res.render('index',
            {
                title: "Gaming Gear List",
                layout: 'layouts/main-layout',
                gaming: results
            })
    })
})

app.post('/save', (req, res) => {
    let data = {
        nama: req.body.nama_gear,
        harga: req.body.harga_gear
    };
    let sql = "INSERT INTO data_gaming SET ?";
    koneksi.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    })
})

app.post('/update', (req, res) => {
    let sql = `UPDATE data_gaming SET nama='${req.body.nama_gear}', harga='${req.body.harga_gear}' WHERE id=${req.body.id}`;
    koneksi.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    })
})

app.post('/delete', (req, res) => {
    let sql = `DELETE FROM data_gaming WHERE id=${req.body.id}`;
    koneksi.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    })
})


app.listen(port, () => {
    console.log(`Web server berhasil berjalan dengan port ${port}`);
})
