document.addEventListener("DOMContentLoaded", function () {
    const dashboardContent = document.getElementById("dashboard-content");
    const stationsContent = document.getElementById("stations-content");
    const chartContent = document.getElementById("chart-content");
    const unitsContent = document.getElementById("units-content"); // Yeni eklendi
    const analysisContent = document.getElementById("analysis-content"); // Yeni eklendi

    const dashboardMenu = document.querySelector('#sidebar .side-menu.top li:nth-child(1) a');
    const stationsMenu = document.querySelector('#sidebar .side-menu.top li:nth-child(2) a');
    const chartMenu = document.querySelector('#sidebar .side-menu.top li:nth-child(3) a');
    const unitsMenu = document.querySelector('#sidebar .side-menu.top li:nth-child(4) a'); // Yeni eklendi
    const analysisMenu = document.querySelector('#sidebar .side-menu.top li:nth-child(5) a'); // Yeni eklendi

    // Fonksiyon: İlgili menüye göre içeriği göster/gizle
    function showContent(content) {
        dashboardContent.style.display = 'none';
        stationsContent.style.display = 'none';
        chartContent.style.display = 'none';
        unitsContent.style.display = 'none'; // Yeni eklendi
        analysisContent.style.display = 'none'; // Yeni eklendi

        content.style.display = 'block';
    }

    // Sayfa yüklendiğinde kontrol et
    const currentPage = window.location.hash.replace('#', '');
    if (currentPage === 'istasyonlar') {
        showContent(stationsContent);
    } else if (currentPage === 'grafikler') {
        showContent(chartContent);
    } else if (currentPage === 'unites') { // Yeni eklendi
        showContent(unitsContent);
    } else if (currentPage === 'analiz') { // Yeni eklendi
        showContent(analysisContent);
    } else {
        showContent(dashboardContent);
    }

    // Menüye tıklama olayları
    dashboardMenu.addEventListener('click', function (e) {
        e.preventDefault();
        showContent(dashboardContent);
    });

    stationsMenu.addEventListener('click', function (e) {
        e.preventDefault();
        showContent(stationsContent);
    });

    chartMenu.addEventListener('click', function (e) {
        e.preventDefault();
        showContent(chartContent);
    });

    unitsMenu.addEventListener('click', function (e) { // Yeni eklendi
        e.preventDefault();
        showContent(unitsContent);
    });

    analysisMenu.addEventListener('click', function (e) { // Yeni eklendi
        e.preventDefault();
        showContent(analysisContent);
    });

    // Yeni eklenen kısım: Google Charts'ı yükle
    google.charts.load('current', {'packages':['corechart']});

    // Yeni eklenen kısım: Grafik sayfasını göster
    function showGraphPage() {
        // Önce tüm menüleri temizle
        document.querySelectorAll('#sidebar .side-menu.top li a').forEach(item => {
            item.parentElement.classList.remove('active');
        });

        // Ardından sadece "Grafikler" menüsünü aktifleştir
        chartMenu.parentElement.classList.add('active');

        // Main içeriğini gizle
        document.querySelector('#content main').style.display = 'none';

        // URL'yi güncelle
        window.location.hash = 'grafikler';

        // Google Charts'ı yükle
        google.charts.setOnLoadCallback(drawChart);
    }

    // Yeni eklenen kısım: Google Charts'ı yükledikten sonra çalıştır
    function drawChart() {
        const data = google.visualization.arrayToDataTable([
            ['Kategori', 'Değer'],
            ['Kategori1', 20],
            ['Kategori2', 30],
            // ... Diğer kategoriler ve değerleri
        ]);

        const options = {
            title: 'Veri Analizi',
            is3D: true,
        };

        const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if(window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if(searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if(window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if(this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if(this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});
