// chartUtils.js

function updatePieChart(containerId, label, labels, data) {
    var ctx = document.getElementById(containerId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: [
                    'rgba(64, 224, 208, 0.7)', // Turkuaz
                    'rgba(0, 255, 255, 0.7)',  // Cyan
                    'rgba(70, 130, 180, 0.7)', // SteelBlue
                    'rgba(0, 191, 255, 0.7)'   // DeepSkyBlue
                ],
                borderColor: [
                    'rgba(64, 224, 208, 1)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(70, 130, 180, 1)',
                    'rgba(0, 191, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
  }
  
 

  
  
  function updateBarHataChart(containerId, label, labels, data) {
    var ctx = document.getElementById(containerId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
              label: label,
              data: data,
              backgroundColor: [
                  'rgba(255, 0, 0, 0.2)',   // red1 tonu
                  'rgba(220, 20, 60, 0.2)'  // crimson tonu
              ],
              borderColor: [
                  'rgba(255, 0, 0, 1)',    // red1 tonu
                  'rgba(220, 20, 60, 1)'   // crimson tonu
              ],
              borderWidth: 1
          }]
          
        },
        options: {
          indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }
  