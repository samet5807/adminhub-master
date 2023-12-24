const express = require("express")
const app = express ()
const routes = require("./routers/routes");
const path = require("path");
const dbconn = require('./db/mysql_connect');
const router = require("./routers/routes");
app.use(express.urlencoded());

require("dotenv").config()
const port = process.env.PORT || 5001

app.get("/", (req,res) => {
    res.json({
        message: "Hoş geldiniz" })
})



app.get('/panel-data', (req, res) => {
    // Araç sayısı sorgusu
    const aracQuery = 'SELECT SUM(arac_sayisi) AS toplam_arac_sayisi FROM araclar WHERE yil = 2023';

    dbconn.query(aracQuery, (error, aracResults) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Araç verisi çekme hatası' });
        } else {
            // İstasyon sayısı sorgusu
            const istasyonQuery = 'SELECT COUNT(*) AS istasyon_sayisi FROM istasyonlar';

            dbconn.query(istasyonQuery, (error, istasyonResults) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'İstasyon verisi çekme hatası' });
                } else {
                    // Enerji tüketimi sorgusu
                    const enerjiTuketimiQuery = 'SELECT SUM(enerji_tuketimi) AS toplam_enerji_tuketimi FROM istasyonlar';

                    dbconn.query(enerjiTuketimiQuery, (error, enerjiResults) => {
                        if (error) {
                            console.error(error);
                            res.status(500).json({ error: 'Enerji tüketimi verisi çekme hatası' });
                        } else {
                            // İki sorgudan elde edilen sonuçları birleştirip JSON yanıtını gönder
                            const toplamAracSayisi = aracResults.length > 0 ? aracResults[0].toplam_arac_sayisi : 0;
                            const toplamİstasyonSayisi = istasyonResults.length > 0 ? istasyonResults[0].istasyon_sayisi : 0;
                            const toplamEnerjiTuketimi = enerjiResults.length > 0 ? enerjiResults[0].toplam_enerji_tuketimi : 0;

                            res.json({ arac_sayisi: toplamAracSayisi, istasyon_sayisi: toplamİstasyonSayisi, enerji_tuketimi: toplamEnerjiTuketimi });
                        }
                    });
                }
            });
        }


    });
});


app.get('/istasyon-enerji-verileri', (req, res) => {
    // Veritabanından istasyon ve enerji tüketimi verilerini çek
    // Bu kısmı kendi veritabanı bağlantınıza ve tablonuza uygun şekilde güncelleyin
    const query = 'SELECT istasyon_adi, enerji_tuketimi FROM istasyonlar ORDER BY enerji_tuketimi DESC LIMIT 4';
    
    dbconn.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Veri çekme hatası' });
        } else {
            res.json(results);
        }
    });
})



//Static files
app.use(express.static(path.join(__dirname,"/public")))
app.get('/panel',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
})
app.get('/istasyonlar',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/istasyonlar.html"))
})
app.get('/analizler',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/analiz.html"))
})
app.get('/grafikler',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/grafikler.html"))
})



app.use(express.json({limit:"50mb",extended:true,parameterLimit:500000}))
app.listen(port, () => {
    console.log(`Serve ${port} portunda çalışıyor`)
})