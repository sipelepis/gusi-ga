// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
    propertyId = '312701939';
    const {BetaAnalyticsDataClient} = require('@google-analytics/data');
    const analyticsDataClient = new BetaAnalyticsDataClient();
    async function runReportWithPagination() {
        // [START analyticsdata_run_report_with_pagination_page1]
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '350daysAgo',
                    endDate: 'yesterday',
                },
            ],
            dimensions: [
                {
                    name: 'firstUserSource',
                },
                {
                    name: 'firstUserMedium',
                },
                {
                    name: 'firstUserCampaignName',
                },
            ],
            metrics: [
                {
                    name: 'sessions',
                },
                {
                    name: 'conversions',
                },
                {
                    name: 'totalRevenue',
                },
            ],
            limit: 100000,
            offset: 0,
        });
        printRunReportResponse(response);
        const [secondResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '350daysAgo',
                    endDate: 'yesterday',
                },
            ],
            dimensions: [
                {
                    name: 'firstUserSource',
                },
                {
                    name: 'firstUserMedium',
                },
                {
                    name: 'firstUserCampaignName',
                },
            ],
            metrics: [
                {
                    name: 'sessions',
                },
                {
                    name: 'conversions',
                },
                {
                    name: 'totalRevenue',
                },
            ],
            limit: 100000,
            offset: 100000,
        });
        printRunReportResponse(secondResponse);
    }
    runReportWithPagination();
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