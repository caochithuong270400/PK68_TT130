var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors())
var { conn, sql } = require('./connect');

app.get('/getData', async function(req, res){
    try {
        var pool = await conn;
        const { TuNgay, DenNgay } = req.query;
        
        var sqlString = `SELECT TiepNhan_Id FROM dbo.XacNhanChiPhi WHERE NgayXacNhan BETWEEN '${TuNgay}' AND '${DenNgay}'`;
        const data = await pool.request().query(sqlString);

        if (data.recordset.length > 0) {
            const resultArray = data.recordset.map(record => record.TiepNhan_Id);
            
            const promises = [];

            resultArray.forEach(tiepNhanId => {
                const spQueryString = `EXEC dbo.sp_BangKe01_NgoaiTru_eClaim_TT130 @TiepNhan_Id = ${tiepNhanId}`;
                const promise = pool.request().query(spQueryString, { multiple: true });
                promises.push(promise);
            });
            Promise.all(promises)
                .then(results => {
                    res.send({ result: results }); // Gửi kết quả từ tất cả các truy vấn EXEC về client
            console.log(results);

                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send('Lỗi khi thực hiện stored procedure');
                });
        } else {
            res.status(404).send('Không có dữ liệu phù hợp');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
});

app.listen(3130, function(){
    console.log("http://Localhost:3130");
});
