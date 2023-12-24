const express = require('express');
const router=require("express").Router()
const path = require('path');
const {login,register}=require("../controllers/controller")
const Validation=require("../middlewares/validation")
router.post("/login",login)
router.post("/register",register)




// Diğer sayfa yönlendirmelerini ekle
router.get('/panel', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
// İstasyonlar sayfasını render et
router.get('/istasyonlar', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/istasyonlar.html'));
});

// Diğer sayfa yönlendirmelerini ekle
router.get('/grafikler', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/grafikler.html'));
});

// Diğer sayfa yönlendirmelerini ekle
router.get('/uniteler', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/uniteler.html'));
});

// Diğer sayfa yönlendirmelerini ekle
router.get('/analiz', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/analiz.html'));
});







router.get("/", (req, res) => {
    // index.html dosyasını gönder
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  


module.exports=router