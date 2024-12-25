var downloadPDFButton = document.getElementById("pdfDownload");
downloadPDFButton.style.display = "none";
function calculate() {
    const nitrogen = parseFloat(document.getElementById("nitrogen").value) || 0;
    const phosphorus = parseFloat(document.getElementById("phosphorus").value) || 0;
    const potassium = parseFloat(document.getElementById("potassium").value) || 0;
    const ph = parseFloat(document.getElementById("ph").value) || 0;
    const nameResult = document.getElementById("nameResult").value;


    // Validate input values
    if (ph < 0 || ph > 14) {
        alert("Please enter a valid pH value between 0 and 14.");
        return;
    }
    if (!nameResult || !nitrogen || !phosphorus || !potassium || !ph) {
        alert("Please fill in all fields.");
        return;
    }
    // Read inputs from the form
    downloadPDFButton.style.display = "block";



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
        <h3 style="text-align:center">${nameResult} - Results</h3>
        
        <!-- Macro Nutrients Table and Bar Chart -->
        <div>
            <h4 style="font-size:16px;" >Macro Nutrients</h4>
            <table border="1"  cellspacing="0">
               <!--- <thead>
                    <tr>
                        <th colspan="0">Macro Nutrients</th>
                    </tr>
                </thead> --->
                <tbody>
                    <tr><td><b>Nitrogen (N):</b></td><td>${nitrogen.toFixed(6)}</td></tr>
                    <tr><td><b>Phosphorus (P):</b></td><td>${phosphorus.toFixed(6)}</td></tr>
                    <tr><td><b>Potassium (K):</b></td><td>${potassium.toFixed(6)}</td></tr>
                </tbody>
            </table>
            <canvas id="macroNutrientsChart"></canvas>
        </div>

        <!-- Primary & Secondary Nutrients Table and Bar Chart -->
        <div>
            <h4 style="font-size:16px">Primary & Secondary Nutrients</h4>
            <table border="1"  cellspacing="0">
               <!--- <thead>
                    <tr>
                        <th colspan="0">Primary & Secondary Nutrients</th>
                    </tr>
                </thead> --->
                <tbody>
                    <tr><td><b>Magnesium:</b></td><td>${magnesiumResult.toFixed(6)}</td></tr>
                    <tr><td><b>Calcium:</b></td><td>${calciumResult.toFixed(6)}</td></tr>
                </tbody>
            </table>
            <canvas id="primarySecondaryNutrientsChart"></canvas>
        </div>

        <!-- Micronutrients Table and Bar Chart -->
        <div>
            <h4 style="font-size:16px">Micronutrients</h4>
            <table border="1"  cellspacing="0">
               <!--- <thead>
                    <tr>
                        <th colspan="0">Micronutrients</th>
                    </tr>
                </thead> --->
                <tbody>
                    <tr><td><b>Zinc:</b></td><td>${zincResult.toFixed(6)}</td></tr>
                    <tr><td><b>Copper:</b></td><td>${copperResult.toFixed(6)}</td></tr>
                    <tr><td><b>Iron:</b></td><td>${ironResult.toFixed(6)}</td></tr>
                    <tr><td><b>Boron:</b></td><td>${boronResult.toFixed(6)}</td></tr>
                    <tr><td><b>Molybdenum:</b></td><td>${molybdenumResult.toFixed(6)}</td></tr>
                </tbody>
            </table>
            <canvas id="micronutrientsChart"></canvas>
        </div>

        <!-- Others Table and Bar Chart -->
        <div>
            <h4 style="font-size:16px">Others</h4>
            <table border="1"  cellspacing="0">
               <!--- <thead>
                    <tr>
                        <th colspan="0">Others</th>
                    </tr>
                </thead> --->
                <tbody>
                    <tr><td><b>Silicon:</b></td><td>${siliconResult.toFixed(6)}</td></tr>
                    <tr><td><b>Organic Carbon:</b></td><td>${organicCarbonResult.toFixed(6)}</td></tr>
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
                            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(6)}`;
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


// download as pdf







function downloadPdf() {
    const resultContent = document.getElementById("result");
    const sampleName = document.getElementById("nameResult").value; // Get the sample name from input

    if (!sampleName) {
        alert("Please enter a sample name.");
        return; // Prevent download if the name is not entered
    }

    // Use the callback-style API for html2canvas
    html2canvas(resultContent, {
        onrendered: function (canvas) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Get the width and height of the content
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;

            // Define the PDF dimensions (A4 size: 210mm x 297mm)
            const pdfWidth = 300;  // Custom width for PDF
            const pdfHeight = 260; // Custom height for PDF

            // Calculate the scale to fit content
            const scaleX = pdfWidth / contentWidth;
            const scaleY = pdfHeight / contentHeight;
            const scale = Math.min(scaleX, scaleY); // Scale to maintain aspect ratio

            // Calculate the final width and height of the content on the PDF
            const finalWidth = contentWidth * scale;
            const finalHeight = contentHeight * scale;

            // Add the canvas image to the PDF with the calculated width and height
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 8, 8, finalWidth, finalHeight);

            // Get current date and time for filename
            const now = new Date();
            const dateStr = now.toISOString().replace(/[-T:.Z]/g, "_"); // Format: YYYYMMDDHHMMSS

            // Create the filename based on user input and current date/time
            const fileName = `${sampleName}_result_at-Time_${dateStr}.pdf`;

            // Save the generated PDF with dynamic filename
            doc.save(fileName);
        }
    });
}










/*
function downloadPdf() {
    const resultContent = document.getElementById("result");
    const nameResult = document.getElementById("nameResult").value;


    // Use the callback-style API for html2canvas
    html2canvas(resultContent, {
        onrendered: function (canvas) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Get the width and height of the content
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;

            // Define the PDF dimensions (A4 size: 210mm x 297mm)
            const pdfWidth = 300;  // A4 width in mm
            const pdfHeight = 260; // A4 height in mm

            // Calculate the scale to fit content
            const scaleX = pdfWidth / contentWidth;
            const scaleY = pdfHeight / contentHeight;
            const scale = Math.min(scaleX, scaleY); // Scale to maintain aspect ratio

            // Calculate the final width and height of the content on the PDF
            const finalWidth = contentWidth * scale;
            const finalHeight = contentHeight * scale;

            // Add the canvas image to the PDF with the calculated width and height
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 8, 8, finalWidth, finalHeight);

            // Save the generated PDF
            // Get current date and time for filename
            const now = new Date();
            const dateStr = now.toISOString().replace(/[-T:.Z]/g, ""); // Format: YYYYMMDDHHMMSS

            // Create the filename based on user input and current date/time
            const fileName = `${sampleName}_result_${dateStr}.pdf`;

            // Save the generated PDF with dynamic filename
            doc.save(fileName);
        }
    });
}*/
