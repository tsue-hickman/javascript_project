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
]