new Chart(
    document.getElementById("test"),
    {
        type: "line",
        data: {
            labels: ['2021','2022','2023'],
            datasets: [
                {
                    label: 'Bash/Shell (All Shells)',
                    data: [27.13,29.47,32.74,],
                    borderColor: 'red',
                    fill: false,
                    hidden: true,
                },
                {
                    label: 'Powershell',
                    data: [10.75,12.07,13.61],
                    borderColor: 'red',
                    fill: false,
                    hidden: true,
                }
            ]
        }
    }
);
