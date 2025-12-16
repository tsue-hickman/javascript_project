# Overview

this is a simple web-based genome viewer that lets you explore genomic variants and gene expression data in an interactive way. i built this to practice javascript and learn more about visualizing bioinformatics data. its pretty straightforward - you can load sample data, search through it, see some charts, and export everything to json.

the app shows you genomic variants (like SNPs and deletions) with their chromosome locations and clinical significance, plus gene expression levels from different tissues and conditions. everything updates in real-time as you search and filter.

[Software Demo Video](https://youtu.be/YOUR_VIDEO_LINK_HERE)

# Development Environment

i used just vanilla javascript, html, and css for this project. no fancy frameworks, just keeping it simple. for the charts i pulled in chart.js from a cdn which made the visualization part super easy.

development tools:

- vs code for writing everything
- git for version control
- any modern browser to run it (chrome, firefox, safari all work)

# Useful Websites

these helped me figure stuff out while building this:

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - basically my go-to for any javascript questions
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/) - super helpful for getting the charts working
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) - used map, filter, and reduce a lot
- [Claude Ai](https://claude.ai/new) - used for debugging

# Future Work

stuff i want to add later:

- upload your own genomic data files instead of just using the sample data
- more chart types like pie charts or scatter plots for different views
- filtering by chromosome or expression level with sliders
- maybe add some sort of detail modal when you click on a variant
- would be cool to integrate with real genomic databases eventually
