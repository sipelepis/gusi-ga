/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
    propertyId = '312701939';

    // Imports the Google Analytics Data API client library.
const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dimensions: [{ name: "cohort" }, { name: "cohortNthDay" }],
        metrics: [{ name: "cohortActiveUsers" }],
        cohortSpec: {
            cohorts: [
                {
                    dimension: "firstSessionDate",
                    dateRange: { startDate: "2022-11-27", endDate: "2022-11-27" }
                }
            ],
            cohortsRange: {
                endOffset: 5,
                granularity: "DAILY"
            }
        },
    });

    console.log('Report result:');
    if (response.rows) {
        response.rows.forEach(row => {
            console.log(row)
            // if (row.dimensionValues && row.metricValues) {
            //     console.log(row.dimensionValues[0], row.metricValues[0]);
            // }
        });
    }
}

runReport();
