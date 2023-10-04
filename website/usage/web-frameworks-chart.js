let chart;

function findClosestMatch(name, obj) {
  for (const key of Object.keys(obj)) {
    if (key.includes(name) || name.includes(key)) {
      return obj[key];
    }
  }
  return null;
}

fetch("../../Scraper/webframeworks-usage-professional.json")
  .then((res) => res.json())
  .then((data) => {
     console.log(data);
    const names = ['React', 'Node.js', 'jQuery', 'Angular', 'Express', 'ASP.NET CORE', 'Vue.js', 'Next.js', 'ASP.NET', 'Spring Boot', 'Flask','Django','Laravel','AngularJS','FastAPI','Ruby on Rails','Svelte','NestJS','Blazor'];
    const colors = ['red', 'blue', 'green', 'purple', 'pink', 'lime', 'orange', 'tan', 'violet','cyan','amber','brown','yellow','gold','black'];
    //const colors = ['red', 'blue', 'green', 'purple', 'pink', 'lime', 'orange', 'tan', 'violet'];
    const datasets = [];

    names.forEach((name, index) => {
      const usageData = [];
      for (let year = 2017; year <= 2023; year++) {
        const yearData = data[year.toString()];
        const value = findClosestMatch(name, yearData);
        usageData.push(value);
      }
      datasets.push({
        label: name,
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
            text: 'Web Framework Usage Over Time (Professionals)',
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
