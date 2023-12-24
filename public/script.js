const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
const mainContent = document.querySelector('#content main');

document.addEventListener("DOMContentLoaded", function () {
    // Navigasyon için öğeleri al
    const dashboardLink = document.querySelector('.nav-link.dashboard');
    const istasyonlarLink = document.querySelector('.nav-link.istasyonlar');

    // İçerik bölümlerini al
    const dashboardContent = document.getElementById('dashboard-content');
    const istasyonlarContent = document.getElementById('stations-content');

    // Başlangıç durumu
    dashboardContent.style.display = 'block';
    istasyonlarContent.style.display = 'none';

    // Navigasyon linkleri için olay dinleyicileri
    dashboardLink.addEventListener('click', function (event) {
        event.preventDefault();
        dashboardContent.style.display = 'block';
        istasyonlarContent.style.display = 'none';
    });

    istasyonlarLink.addEventListener('click', function (event) {
        event.preventDefault();
        dashboardContent.style.display = 'none';
        istasyonlarContent.style.display = 'block';
    });
});

















document.addEventListener("DOMContentLoaded", function () {
    // AJAX kullanarak Node.js endpoint'inden verileri çek
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
			updatePanelInfo(data);
        }
    };
    xhr.open("GET", "http://localhost:5000/panel-data", true);
    xhr.send();
});

function updatePanelInfo(data) {
    // Panel sayfasındaki araç sayısı alanındaki HTML elemanını güncelle
    document.querySelector('#dashboard-content .box-info li:first-child h3').innerText = data.arac_sayisi;
	document.querySelector('#dashboard-content .box-info li:nth-child(2) h3').innerText = data.istasyon_sayisi;
	document.getElementById('enerji-tuketimi').innerText = data.enerji_tuketimi;
}







function loadStations() {
    // İstasyonları getiren bir istek yap
    fetch('http://localhost:5000/istasyonlar')
        .then(response => response.json())
        .then(data => {
            // Gelen veriyi işle ve ekranda göster
            displayStations(data);
        })
        .catch(error => console.error('İstasyonları getirme hatası:', error));
}

function displayStations(stations) {
    // İstasyonları ekranda göstermek için gerekli işlemleri yap
    const stationList = document.getElementById('stationList');
    stationList.innerHTML = ''; // İçeriği temizle

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.istasyon_adi;
        stationList.appendChild(li);
    });

    // İstasyonlar sayfasını görünür yap
    document.getElementById('dashboard-content').style.display = 'none';
    document.getElementById('chart-content').style.display = 'none';
    document.getElementById('stations-content').style.display = 'block';
}




























// Fonksiyon: İlgili menü elemanına göre main içeriğini göster/gizle
function showContent(menuItem) {
    allSideMenu.forEach(item => {
        item.parentElement.classList.remove('active');
    });

    mainContent.style.display = 'none';

    if (menuItem) {
        menuItem.parentElement.classList.add('active');
        mainContent.style.display = 'block';

        // URL'yi güncelle
        const pageName = menuItem.innerText.toLowerCase().replace(' ', '-');
        window.location.hash = pageName;
    }
}

// Sayfa yüklendiğinde kontrol et
window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.hash.replace('#', '');
    const menuItem = Array.from(allSideMenu).find(item => item.innerText.toLowerCase().replace(' ', '-') === currentPage);
    showContent(menuItem);
});

allSideMenu.forEach(item => {
    item.addEventListener('click', function () {
        showContent(item);
    });
});
































// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})


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
})





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
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})