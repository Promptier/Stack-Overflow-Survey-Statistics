const myChart = document.getElementById('chart').getContext('2d');
new Chart(myChart, {
  type: 'line',
  data: {
    labels: ['2019','2020', '2021', '2022', '2023'],
    datasets:[
    {
    label: 'Docker',
    data: [34.9,39.2,55.06,68.57,56.61],
    borderColor: 'red',
    fill: false,
    hidden: true,
    },
    /*
    { 
    label: 'Yarn',
    data: [null,null,20.19,29.82,24.48],
    borderColor: 'blue',
    fill: false,
    hidden: true,
    },
    */
    { 
    label: 'Kubernetes',
    data: [9.6,12.9,19.53,25.45,21.67],
    borderColor: 'green',
    fill: false,
    hidden: true,
    },
    { 
    label: 'Ansible',
    data: [10.4,8.1,8.29,9.64,8.28],
    borderColor: 'purple',
    fill: false,
    hidden: true,
    }
  ],
  },
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Other Tools Usage Over Time (Professionals)',
        font: {
          size: 20
        },
      },
      legend: {
        position: 'right',
        padding: 30,
        labels:{
          padding: 20,
          font:{
            size: 20,

          }
        },

      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Define a callback to append '%' to the tick labels
          callback: function(value, index, values) {
            return value + '%';
          }
        }
      }
    }
  }
});