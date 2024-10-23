// Initialize a chart instance
let chart;
const ctx = document.getElementById('myChart').getContext('2d');

// Simulate getting data from an API (can be replaced with actual API calls)
const getData = (metric, timeRange) => {
    const data = {
        sales: [100, 120, 130, 150, 170, 180, 190],
        revenue: [500, 600, 750, 800, 900, 950, 1000],
        customers: [20, 30, 40, 50, 60, 70, 80]
    };
    const labels = (timeRange === '7days') 
        ? ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
        : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    return {
        labels: labels,
        data: data[metric]
    };
};

// Function to update the chart
const updateChart = () => {
    const metric = document.getElementById('metric').value;
    const timeRange = document.getElementById('timeRange').value;
    const { labels, data } = getData(metric, timeRange);

    if (chart) {
        chart.destroy();  // Destroy existing chart before re-rendering
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: metric.charAt(0).toUpperCase() + metric.slice(1),
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Function to export data as CSV
const exportData = () => {
    const metric = document.getElementById('metric').value;
    const timeRange = document.getElementById('timeRange').value;
    const { labels, data } = getData(metric, timeRange);

    const csvContent = "data:text/csv;charset=utf-8,"
        + ["Time,Value", ...labels.map((label, index) => `${label},${data[index]}`)].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${metric}_data_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Initialize chart with default values on page load
window.onload = () => {
    updateChart();
};
