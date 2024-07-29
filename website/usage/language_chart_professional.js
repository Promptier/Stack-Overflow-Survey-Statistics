let chart // Declare chart variable outside the fetch so it can be accessed elsewhere

fetch("../../Scraper/language-usage-professional.json")
  .then((res) => res.json())
  .then((data) => {
  let pythonUsageData = [];
  let javascriptUsageData = [];
  let phpUsageData = [];
  let javaUsageData = [];
  let csUsageData = [];
  let cppUsageData = [];
  let cUsageData = [];
  let typescriptUsageData = [];
  let goUsageData = [];
  let rustUsageData = [];
  let sqlUsageData = [];

  for (let year = 2017; year <= 2024; year++) {
    pythonUsageData.push(data[year.toString()]['Python']);
    javascriptUsageData.push(data[year.toString()]['JavaScript']);
    typescriptUsageData.push(data[year.toString()]['TypeScript']);
    phpUsageData.push(data[year.toString()]['PHP']);
    javaUsageData.push(data[year.toString()]['Java']);
    csUsageData.push(data[year.toString()]['C#']);
    cppUsageData.push(data[year.toString()]['C++']);
    cUsageData.push(data[year.toString()]['C']);
    goUsageData.push(data[year.toString()]['Go']);
    rustUsageData.push(data[year.toString()]['Rust']);
    sqlUsageData.push(data[year.toString()]['SQL']);
  }


  let myChart =  document.getElementById('chartProfessionals').getContext('2d');
    
  chart = new Chart(myChart, {
    type:'line',
    data:{
      labels:['2017','2018','2019','2020','2021','2022','2023','2024'],
      datasets: 
      [{
        label: 'Python',
        data: pythonUsageData,
        borderColor: 'red',
        fill: false,
        hidden: true,
      },
      {
        label: 'Javascript',
        data: javascriptUsageData,
        borderColor: 'blue',
        fill: false,
        hidden: true,
      },
      {
        label: 'HTML/CSS',
        data: [null,67,63,62,56,55,53,53],
        borderColor: 'brown',
        fill: false,
        hidden: true,
      },
      {
        label: 'SQL',
        data: sqlUsageData,
        borderColor: 'green',
        fill: false,
        hidden: true,
      },
      {
        label: 'Java',
        data: javaUsageData,
        borderColor: 'purple',
        fill: false,
        hidden: true,
      },
      {
        label: 'C#',
        data: csUsageData,
        borderColor: 'pink',
        fill: false,
        hidden: true,
      },
      {
        label: 'C',
        data: cUsageData,
        borderColor: 'lime',
        fill: false,
        hidden: true,
      },
      {
        label: 'C++',
        data: cppUsageData,
        borderColor: 'orange',
        fill: false,
        hidden: true,
      },
      {
        label: 'Typescript',
        data: typescriptUsageData,
        borderColor: 'tan',
        fill: false,
        hidden: true,
      },
      {
        label: 'Go',
        data: goUsageData,
        borderColor: 'violet',
        fill: false,
        hidden: true,
      },
      {
        label: 'Rust',
        data: rustUsageData,
        borderColor: 'brown',
        fill: false,
        hidden: true,
      },
      {
        label: 'PHP',
        data: phpUsageData,
        borderColor: 'yellow',
        fill: false,
        hidden: true,
      }
    ]
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: 'Language Usage Over Time (Professionals)',
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
});
