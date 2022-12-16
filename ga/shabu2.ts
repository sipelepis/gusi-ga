
'use strict';
function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
    propertyId = '312701939';
    const {BetaAnalyticsDataClient} = require('@google-analytics/data');
    const analyticsDataClient = new BetaAnalyticsDataClient();
    async function runRealtimeReportWithMultipleDimensions() {
        const [response] = await analyticsDataClient.runRealtimeReport({
            property: `properties/${propertyId}`,
            dimensions: [
                {
                    name: 'country',
                },
                {
                    name: 'city',
                },
            ],
            metrics: [
                {
                    name: 'activeUsers',
                },
            ],
        });
        console.log(response)
        printRunReportResponse(response);
    }
    runRealtimeReportWithMultipleDimensions();
    function printRunReportResponse(response) {
        console.log(`${response.rowCount} rows received`);
        response.dimensionHeaders.forEach(dimensionHeader => {
            console.log(`Dimension header name: ${dimensionHeader.name}`);
        });
        response.metricHeaders.forEach(metricHeader => {
            console.log(
                `Metric header name: ${metricHeader.name} (${metricHeader.type})`
            );
        });
        console.log('Report result:');
        response.rows.forEach(row => {
            console.log(
                `${row.dimensionValues[0].value}, ${row.metricValues[0].value}`
            );
        });
    }
}

process.on('unhandledRejection', err => {
    console.error(err.message);
    process.exitCode = 1;
});
main(...process.argv.slice(2));