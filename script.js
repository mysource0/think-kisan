function calculate() {
    // Read inputs from the form
    const nitrogen = parseFloat(document.getElementById("nitrogen").value) || 0;
    const phosphorus = parseFloat(document.getElementById("phosphorus").value) || 0;
    const potassium = parseFloat(document.getElementById("potassium").value) || 0;
    const ph = parseFloat(document.getElementById("ph").value) || 0;

    // Validate input values
    if (ph < 0 || ph > 14) {
        alert("Please enter a valid pH value between 0 and 14.");
        return;
    }

    // Perform calculations
    const organicCarbonResult = organic_Carbon(nitrogen);
    const zincResult = zinc(ph);
    const magnesiumResult = magnesium(ph);
    const calciumResult = calcium(ph);
    const copperResult = copper(ph);
    const ironResult = iron(ph);
    const siliconResult = silicon(ph);
    const boronResult = boron(ph);
    const molybdenumResult = molybdenum(ph);

    // Display results in a clean table format with group headings and bar charts
    document.getElementById("result").innerHTML = `
        <h3>Results</h3>
        
        <!-- Macro Nutrients Table and Bar Chart -->
        <div>
            <h4>Macro Nutrients</h4>
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                    <tr>
                        <th colspan="2">Macro Nutrients</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><b>Nitrogen (N):</b></td><td>${nitrogen.toFixed(2)}</td></tr>
                    <tr><td><b>Phosphorus (P):</b></td><td>${phosphorus.toFixed(2)}</td></tr>
                    <tr><td><b>Potassium (K):</b></td><td>${potassium.toFixed(2)}</td></tr>
                </tbody>
            </table>
            <canvas id="macroNutrientsChart"></canvas>
        </div>

        <!-- Primary & Secondary Nutrients Table and Bar Chart -->
        <div>
            <h4>Primary & Secondary Nutrients</h4>
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                    <tr>
                        <th colspan="2">Primary & Secondary Nutrients</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><b>Magnesium:</b></td><td>${magnesiumResult.toFixed(2)}</td></tr>
                    <tr><td><b>Calcium:</b></td><td>${calciumResult.toFixed(2)}</td></tr>
                </tbody>
            </table>
            <canvas id="primarySecondaryNutrientsChart"></canvas>
        </div>

        <!-- Micronutrients Table and Bar Chart -->
        <div>
            <h4>Micronutrients</h4>
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                    <tr>
                        <th colspan="2">Micronutrients</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><b>Zinc:</b></td><td>${zincResult.toFixed(2)}</td></tr>
                    <tr><td><b>Copper:</b></td><td>${copperResult.toFixed(2)}</td></tr>
                    <tr><td><b>Iron:</b></td><td>${ironResult.toFixed(2)}</td></tr>
                    <tr><td><b>Boron:</b></td><td>${boronResult.toFixed(2)}</td></tr>
                    <tr><td><b>Molybdenum:</b></td><td>${molybdenumResult.toFixed(2)}</td></tr>
                </tbody>
            </table>
            <canvas id="micronutrientsChart"></canvas>
        </div>

        <!-- Others Table and Bar Chart -->
        <div>
            <h4>Others</h4>
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                    <tr>
                        <th colspan="2">Others</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><b>Silicon:</b></td><td>${siliconResult.toFixed(2)}</td></tr>
                    <tr><td><b>Organic Carbon:</b></td><td>${organicCarbonResult.toFixed(2)}</td></tr>
                </tbody>
            </table>
            <canvas id="othersChart"></canvas>
        </div>
    `;

    // Create bar charts for each group
    createBarChart('macroNutrientsChart', 'Macro Nutrients', ['Nitrogen', 'Phosphorus', 'Potassium'], [nitrogen, phosphorus, potassium]);
    createBarChart('primarySecondaryNutrientsChart', 'Primary & Secondary Nutrients', ['Magnesium', 'Calcium'], [magnesiumResult, calciumResult]);
    createBarChart('micronutrientsChart', 'Micronutrients', ['Zinc', 'Copper', 'Iron', 'Boron', 'Molybdenum'], [zincResult, copperResult, ironResult, boronResult, molybdenumResult]);
    createBarChart('othersChart', 'Others', ['Silicon', 'Organic Carbon'], [siliconResult, organicCarbonResult]);
}

// Function to create a bar chart
function createBarChart(chartId, label, labels, data) {
    new Chart(document.getElementById(chartId), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: getChartColor(label),
                borderColor: '#1E88E5', // Border color remains the same for consistency
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { beginAtZero: true }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

// Function to assign colors based on nutrient group
function getChartColor(label) {
    switch (label) {
        case 'Macro Nutrients':
            return '#66BB6A'; // Green for Macro Nutrients
        case 'Primary & Secondary Nutrients':
            return '#42A5F5'; // Blue for Primary & Secondary Nutrients
        case 'Micronutrients':
            return '#AB47BC'; // Purple for Micronutrients
        case 'Others':
            return '#FF7043'; // Orange for Others
        default:
            return '#42A5F5'; // Default blue if the label doesn't match
    }
}


// Functions for nutrient calculations
function organic_Carbon(nitrogen) {
    return nitrogen === 0 ? 0 : 0.77 * nitrogen;
}
function zinc(ph) {
    return ph === 0 ? 0 : 10 - (1.7 * ph);
}
function magnesium(ph) {
    return ph === 0 ? 0 : 70 + (17 * ph);
}
function calcium(ph) {
    return ph === 0 ? 0 : 700 + (70 * ph);
}
function copper(ph) {
    return ph === 0 ? 0 : 7 - (0.4 * ph);
}
function iron(ph) {
    return ph === 0 ? 0 : 77 - (7.7 * ph);
}
function silicon(ph) {
    return ph === 0 ? 0 : 70 + (10 * ph);
}
function boron(ph) {
    return ph === 0 ? 0 : 1.7 - (0.7 * ph);
}
function molybdenum(ph) {
    return ph === 0 ? 0 : 0.01 + (0.007 * ph);
}
