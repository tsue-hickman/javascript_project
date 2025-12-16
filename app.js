// sample genomic data - variants and gene expression
let currentData = [];
let dataType = null;
let chart = null;

// sample variant data
const sampleVariants = [
    {
        gene: "BRCA1",
        chromosome: "chr17",
        position: 43044295,
        ref: "A",
        alt: "G",
        type: "SNP",
        significance: "pathogenic"
    },
    {
        gene: "TP53",
        chromosome: "chr17",
        position: 7676154,
        ref: "C",
        alt: "T",
        type: "SNP",
        significance: "pathogenic"
    },
    {
        gene: "APOE",
        chromosome: "chr19",
        position: 44908684,
        ref: "T",
        alt: "C",
        type: "SNP",
        significance: "risk factor"
    },
    {
        gene: "CFTR",
        chromosome: "chr7",
        position: 117559590,
        ref: "CTT",
        alt: "C",
        type: "deletion",
        significance: "pathogenic"
    },
    {
        gene: "HBB",
        chromosome: "chr11",
        position: 5227002,
        ref: "T",
        alt: "A",
        type: "SNP",
        significance: "pathogenic"
    },
    {
        gene: "MTHFR",
        chromosome: "chr1",
        position: 11856378,
        ref: "C",
        alt: "T",
        type: "SNP",
        significance: "benign"
    },
    {
        gene: "ACE",
        chromosome: "chr17",
        position: 63488529,
        ref: "A",
        alt: "G",
        type: "SNP",
        significance: "benign"
    },
    {
        gene: "EGFR",
        chromosome: "chr7",
        position: 55191822,
        ref: "T",
        alt: "G",
        type: "SNP",
        significance: "drug response"
    }
];

// sample gene expression data
const sampleExpression = [
    {
        gene: "GAPDH",
        chromosome: "chr12",
        expression: 8.5,
        tissue: "liver",
        condition: "control"
    },
    {
        gene: "ACTB",
        chromosome: "chr7",
        expression: 9.2,
        tissue: "muscle",
        condition: "control"
    },
    {
        gene: "TNF",
        chromosome: "chr6",
        expression: 3.4,
        tissue: "blood",
        condition: "inflammatory"
    },
    {
        gene: "IL6",
        chromosome: "chr7",
        expression: 5.8,
        tissue: "blood",
        condition: "inflammatory"
    },
    {
        gene: "INS",
        chromosome: "chr11",
        expression: 7.9,
        tissue: "pancreas",
        condition: "control"
    },
    {
        gene: "TP53",
        chromosome: "chr17",
        expression: 4.2,
        tissue: "tumor",
        condition: "cancer"
    },
    {
        gene: "MYC",
        chromosome: "chr8",
        expression: 6.7,
        tissue: "tumor",
        condition: "cancer"
    },
    {
        gene: "VEGF",
        chromosome: "chr6",
        expression: 5.1,
        tissue: "endothelial",
        condition: "hypoxia"
    }
];

// get DOM elements
const loadVariantsBtn = document.getElementById('loadVariants');
const loadExpressionBtn = document.getElementById('loadExpression');
const clearDataBtn = document.getElementById('clearData');
const exportDataBtn = document.getElementById('exportData');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const dataDisplay = document.getElementById('dataDisplay');
const totalCount = document.getElementById('totalCount');
const chromosomeCount = document.getElementById('chromosomeCount');
const geneCount = document.getElementById('geneCount');

// event listeners
loadVariantsBtn.addEventListener('click', () => loadData(sampleVariants, 'variants'));
loadExpressionBtn.addEventListener('click', () => loadData(sampleExpression, 'expression'));
clearDataBtn.addEventListener('click', clearData);
exportDataBtn.addEventListener('click', exportToJSON);
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

/**
 * loads data and displays it
 * @param {Array} data - array of genomic data objects
 * @param {string} type - type of data being loaded
 */
function loadData(data, type) {
    // show loading state
    dataDisplay.innerHTML = '<p class="loading">loading data</p>';
    
    // simulate async loading for better ux
    setTimeout(() => {
        currentData = data;
        dataType = type;
        displayData(data);
        updateStats(data);
        updateChart(data);
    }, 500);
}

/**
 * displays the data in the container
 * @param {Array} data - data to display
 */
function displayData(data) {
    dataDisplay.innerHTML = '';
    
    if (data.length === 0) {
        dataDisplay.innerHTML = '<p class="placeholder">no results found</p>';
        return;
    }

    // recursively render items
    renderItems(data, 0);
}

/**
 * recursively renders data items to avoid blocking
 * @param {Array} data - data array
 * @param {number} index - current index
 */
function renderItems(data, index) {
    if (index >= data.length) return;
    
    const item = data[index];
    const itemElement = createDataElement(item);
    dataDisplay.appendChild(itemElement);
    
    // recursively render next item
    setTimeout(() => renderItems(data, index + 1), 10);
}

/**
 * creates a DOM element for a data item
 * @param {Object} item - data item object
 * @returns {HTMLElement} the created element
 */
function createDataElement(item) {
    const div = document.createElement('div');
    div.className = 'data-item';
    
    if (dataType === 'variants') {
        div.innerHTML = `
            <h3>${item.gene}</h3>
            <p><strong>Location:</strong> ${item.chromosome}:${item.position}</p>
            <p><strong>Variant:</strong> ${item.ref} → ${item.alt}</p>
            <p><span class="variant-tag">${item.type}</span>
               <span class="variant-tag">${item.significance}</span></p>
        `;
    } else if (dataType === 'expression') {
        const expressionClass = getExpressionClass(item.expression);
        div.innerHTML = `
            <h3>${item.gene}</h3>
            <p><strong>Chromosome:</strong> ${item.chromosome}</p>
            <p><strong>Expression Level:</strong> 
               <span class="expression-value ${expressionClass}">${item.expression}</span></p>
            <p><strong>Tissue:</strong> ${item.tissue} | <strong>Condition:</strong> ${item.condition}</p>
        `;
    }
    
    return div;
}

/**
 * determines expression level class based on value
 * @param {number} value - expression value
 * @returns {string} css class name
 */
function getExpressionClass(value) {
    if (value >= 7) return 'high-expression';
    if (value >= 5) return 'medium-expression';
    return 'low-expression';
}

/**
 * updates statistics display
 * @param {Array} data - current data array
 */
function updateStats(data) {
    totalCount.textContent = data.length;
    
    // get unique chromosomes using native array methods
    const chromosomes = [...new Set(data.map(item => item.chromosome))];
    chromosomeCount.textContent = chromosomes.length;
    
    // get unique genes
    const genes = [...new Set(data.map(item => item.gene))];
    geneCount.textContent = genes.length;
}

/**
 * clears all data and resets display
 */
function clearData() {
    currentData = [];
    dataType = null;
    dataDisplay.innerHTML = '<p class="placeholder">load some data to get started</p>';
    totalCount.textContent = '0';
    chromosomeCount.textContent = '0';
    geneCount.textContent = '0';
    searchInput.value = '';
    
    // hide and destroy chart
    if (chart) {
        chart.destroy();
        chart = null;
    }
    document.getElementById('chartContainer').style.display = 'none';
}

/**
 * performs search on current data
 */
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '' || currentData.length === 0) {
        displayData(currentData);
        updateChart(currentData);
        return;
    }
    
    // filter data using native array methods
    const filtered = currentData.filter(item => {
        return item.gene.toLowerCase().includes(query) ||
               item.chromosome.toLowerCase().includes(query);
    });
    
    displayData(filtered);
    updateStats(filtered);
    updateChart(filtered);
}

/**
 * creates or updates chart visualization
 * @param {Array} data - data to visualize
 */
function updateChart(data) {
    const chartContainer = document.getElementById('chartContainer');
    const ctx = document.getElementById('dataChart');
    
    if (data.length === 0) {
        chartContainer.style.display = 'none';
        return;
    }
    
    chartContainer.style.display = 'block';
    
    // destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }
    
    let chartData;
    let chartLabel;
    
    try {
        if (dataType === 'variants') {
            // count variants by chromosome
            const chromCounts = data.reduce((acc, item) => {
                acc[item.chromosome] = (acc[item.chromosome] || 0) + 1;
                return acc;
            }, {});
            
            chartData = {
                labels: Object.keys(chromCounts),
                datasets: [{
                    label: 'Variants per Chromosome',
                    data: Object.values(chromCounts),
                    backgroundColor: 'rgba(102, 126, 234, 0.6)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2
                }]
            };
        } else if (dataType === 'expression') {
            // show expression levels
            chartData = {
                labels: data.map(item => item.gene),
                datasets: [{
                    label: 'Gene Expression Level',
                    data: data.map(item => item.expression),
                    backgroundColor: data.map(item => {
                        const val = item.expression;
                        if (val >= 7) return 'rgba(231, 76, 60, 0.6)';
                        if (val >= 5) return 'rgba(243, 156, 18, 0.6)';
                        return 'rgba(39, 174, 96, 0.6)';
                    }),
                    borderColor: 'rgba(118, 75, 162, 1)',
                    borderWidth: 2
                }]
            };
        }
        
        chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    } catch (error) {
        console.error('error creating chart:', error);
        chartContainer.style.display = 'none';
    }
}

/**
 * exports current data to json file
 */
function exportToJSON() {
    if (currentData.length === 0) {
        alert('no data to export! load some data first');
        return;
    }
    
    try {
        const dataStr = JSON.stringify(currentData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `genome-data-${dataType}-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('data exported successfully');
    } catch (error) {
        console.error('error exporting data:', error);
        alert('failed to export data');
    }
}