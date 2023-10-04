// Declare chart variable outside the fetch so it can be accessed elsewhere

/* fetch("../../Scraper/database-usage-professional.json")
  .then((res) => res.json())
  .then((data) => {
  let postgreSQLUsageData = [];
  let mySQLUsageData = [];
  let sqliteUsageData = [];
  let microsoftSQLServerUsageData = [];
  let mongoDBUsageData = [];
  let redisUsageData = [];
  let mariaDBUsageData = [];
  let elasticsearchUsageData = [];
  let dynamodDBUsageData = [];
  let oracleUsageData = [];

  for (let year = 2017; year <= 2023; year++) {
    postgreSQLUsageData.push(data[year.toString()]['PostgreSQL']);
    mySQLUsageData.push(data[year.toString()]['MySQL']);
    sqliteUsageData.push(data[year.toString()]['SQLite']);
    microsoftSQLServerUsageData.push(data[year.toString()]['Microsoft SQL Server']);
    mongoDBUsageData.push(data[year.toString()]['MongoDB']);
    redisUsageData.push(data[year.toString()]['Redis']);
    mariaDBUsageData.push(data[year.toString()]['MariaDB']);
    elasticsearchUsageData.push(data[year.toString()]['Elasticsearch']);
    dynamodDBUsageData.push(data[year.toString()]['Dynamodb']);
    oracleUsageData.push(data[year.toString()]['Oracle']);
  }


  let myChart =  document.getElementById('chart').getContext('2d');
    
  chart = new Chart(myChart, {
    type:'line',
    data:{
      labels:['2017','2018','2019','2020','2021','2022','2023'],
      datasets: 
      [{
        label: 'PostgreSQL',
        data: postgreSQLUsageData,
        borderColor: 'red',
        fill: false,
        hidden: true,
      },
      {
        label: 'MySQL',
        data: mySQLUsageData,
        borderColor: 'blue',
        fill: false,
        hidden: true,
      },
      {
        label: 'SQlite',
        data: sqliteUsageData,
        borderColor: 'green',
        fill: false,
        hidden: true,
      },
      {
        label: 'Microsoft SQL Server',
        data: microsoftSQLServerUsageData,
        borderColor: 'purple',
        fill: false,
        hidden: true,
      },
      {
        label: 'Mongo DB',
        data: mongoDBUsageData,
        borderColor: 'pink',
        fill: false,
        hidden: true,
      },
      {
        label: 'Redis',
        data: redisUsageData,
        borderColor: 'lime',
        fill: false,
        hidden: true,
      },
      {
        label: 'Maria DB',
        data: mariaDBUsageData,
        borderColor: 'orange',
        fill: false,
        hidden: true,
      },
      {
        label: 'Elasticsearch',
        data: elasticsearchUsageData,
        borderColor: 'tan',
        fill: false,
        hidden: true,
      },
      {
        label: 'Oracle',
        data: oracleUsageData,
        borderColor: 'violet',
        fill: false,
        hidden: true,
      },
    ]
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: 'Database Usage Over Time (Professionals)',
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
*/
let chart;

fetch("../../Scraper/database-usage-professional.json")
  .then((res) => res.json())
  .then((data) => {
    const dbNames = ['PostgreSQL', 'MySQL', 'SQLite', 'Microsoft SQL Server', 'MongoDB', 'Redis', 'MariaDB', 'Elasticsearch', 'Dynamodb', 'Oracle'];
    const colors = ['red', 'blue', 'green', 'purple', 'pink', 'lime', 'orange', 'tan', 'violet'];
    const datasets = [];

    dbNames.forEach((dbName, index) => {
      const usageData = [];
      for (let year = 2017; year <= 2023; year++) {
        usageData.push(data[year.toString()][dbName]);
      }
      datasets.push({
        label: dbName,
        data: usageData,
        borderColor: colors[index],
        fill: false,
        hidden: true,
      });
    });

    const myChart = document.getElementById('chart').getContext('2d');
    new Chart(myChart, {
      type: 'line',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets,
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Database Usage Over Time (Professionals)',
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
