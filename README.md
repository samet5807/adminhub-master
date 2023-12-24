# adminhub
Website ini merupakan hasil slicing dari Figma ke responsive website menggunakan HTML, CSS, dan JavaScript



document.addEventListener("DOMContentLoaded", function () {
    // AJAX kullanarak Node.js endpoint'inden verileri çek
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            updateAracSayisi(data);
        }
    };
    xhr.open("GET", "http://localhost:5000/panel-data", true);
    xhr.send();
});

function updateAracSayisi(data) {
    // Panel sayfasındaki araç sayısı alanındaki HTML elemanını güncelle
    document.querySelector('#dashboard-content .box-info li:first-child h3').innerText = data.arac_sayisi;
}


    const query = 'SELECT SUM(arac_sayisi) AS toplam_arac_sayisi FROM araclar WHERE yil = 2023';
