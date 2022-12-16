'use strict';
function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
    propertyId = '312701939';
    const {BetaAnalyticsDataClient} = require('@google-analytics/data');
    const analyticsDataClient = new BetaAnalyticsDataClient();
    async function runReportWithMultipleDimensionFilters() {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dimensions: [
                {
                    name: 'date',
                },
                {
                    name: 'country',
                },
            ],
            metrics: [
                {
                    name: 'activeUsers',
                },
            ],
            dateRanges: [
                {
                    startDate: '2022-01-01',
                    endDate: 'today',
                },
            ],

        });
        printRunReportResponse(response);
    }

    runReportWithMultipleDimensionFilters();

    // Prints results of a runReport call.
    function printRunReportResponse(response) {
        //[START analyticsdata_print_run_report_response_header]
        console.log(`${response.rowCount} rows received`);
        response.dimensionHeaders.forEach(dimensionHeader => {
            console.log(`Dimension header name: ${dimensionHeader.name}`);
        });
        response.metricHeaders.forEach(metricHeader => {
            console.log(
                `Metric header name: ${metricHeader.name} (${metricHeader.type})`
            );
        });
        //[END analyticsdata_print_run_report_response_header]

        // [START analyticsdata_print_run_report_response_rows]

        console.log('\nReport result:');
        response.rows.forEach(row => {
            console.log(
                `${row.dimensionValues[1].value}, ${row.dimensionValues[0].value}, ${row.metricValues[0].value}`
            );

        });
        // [END analyticsdata_print_run_report_response_rows]
    }
    // [END analyticsdata_run_report_with_multiple_dimension_filters]
}

process.on('unhandledRejection', err => {
    console.error(err.message);
    process.exitCode = 1;
});
main(...process.argv.slice(2));