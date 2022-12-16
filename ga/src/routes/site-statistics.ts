import express from "express";
import config from "config";
import {BetaAnalyticsDataClient} from "@google-analytics/data";
import cors from "cors";
import {google} from "@google-analytics/data/build/protos/protos";
import data = google.analytics.data;
const dimensions = [];
const metrics = [];
let dataIndiv;
const propertyId = '312701939';
const router= express.Router();
router.use(cors());
const analyticsDataClient = new BetaAnalyticsDataClient();
router.get('/ga1/7daysago', async function(req, res, next) {
    try{
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '7daysAgo',endDate: 'today'}],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response.rows) {
            response.rows.forEach((row: any) => {
                if (row.metricValues){
                    res.send(row.metricValues);
                }
            });
        }
    }catch (e) {
        console.log(e)
    }

});
router.get('/ga1/28daysago', async function(req, res, next) {
    try{
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '28daysAgo',endDate: 'today'}],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response.rows) {
            response.rows.forEach((row: any) => {
                if (row.metricValues){
                    res.send(row.metricValues);
                }
            });
        }
    }catch (e) {
        console.log(e)
    }

});
router.get('/ga1/lastmonth', async function(req, res, next) {
    try{
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '2022-10-1',endDate: '2022-10-31'}],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response.rows) {
            response.rows.forEach((row: any) => {
                if (row.metricValues){
                    res.send(row.metricValues);
                }
            });
        }
    }catch (e) {
        console.log(e);
    }

});
router.get('/ga1/country-pie', async function(req, res, next) {
    try{
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '2022-1-1',endDate: 'today'}],
            dimensions:[
                {name: 'country'},
                {name: 'countryId'}
            ],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response) {
            res.send(response.rows);

        }
    }catch (e) {
        console.log(e);
    }

});
router.get('/ga1/ActiveUsers-city', async function(req, res, next) {
    try{
        let ActiveUserscity: any[] = [];
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '2022-1-1',endDate: 'today'}],
            dimensions:[
                {name: 'country'},
                {name: 'city'},
                {name: 'countryId'}
            ],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response){
            if (response.rows) {
                response.rows.forEach((row: any) => {
                    dataIndiv = {name: row.dimensionValues[1].value, value: row.metricValues[0].value};
                    ActiveUserscity.push(dataIndiv);
                });
                res.send(ActiveUserscity);
            }
        }
    }catch (e) {
        console.log(e)
    }

});
router.get('/ga1/ScreenPageViews-city', async function(req, res, next) {
    try{
        let PageViewscity: any[] = [];
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '2022-1-1',endDate: 'today'}],
            dimensions:[
                {name: 'country'},
                {name: 'city'},
                {name: 'countryId'}
            ],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response){
            if (response.rows) {
                response.rows.forEach((row: any) => {
                    dataIndiv = {name: row.dimensionValues[1].value, value: row.metricValues[1].value};
                    PageViewscity.push(dataIndiv);
                });
                res.send(PageViewscity);
            }
        }
    }catch (e) {
        console.log(e)
    }

});
router.get('/ga1/Sessions-city', async function(req, res, next) {
    try{
        let Sessionscity: any[] = [];
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '2022-1-1',endDate: 'today'}],
            dimensions:[
                {name: 'country'},
                {name: 'city'},
                {name: 'countryId'}
            ],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response){
            if (response.rows) {
                response.rows.forEach((row: any) => {
                    dataIndiv = {name: row.dimensionValues[1].value, value: parseInt(row.metricValues[2].value)};
                    Sessionscity.push(dataIndiv);
                });
                res.send(Sessionscity);
            }
        }
    }catch (e) {
        console.log(e)
    }

});
router.get('/ga1/city-pie', async function(req, res, next) {
    try{
        const [response]: any = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{startDate: '2022-1-1',endDate: 'today'}],
            dimensions:[
                {name: 'country'},
                {name: 'city'},
                {name: 'countryId'}
            ],
            metrics: [
                {name: 'activeUsers'},
                {name: 'screenPageViews'},
                {name: 'sessions'}
            ]
        });
        if (response && response.rows) {
            res.send(response.rows)
        }
    }catch (e) {
        console.log(e);
    }

});
router.get('/ga1/techchart/browsers', async function(req, res, next) {
    try{
        let browserFormats: any[] = [];
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '2022-01-01',
                    endDate: 'today',
                },
            ],
            dimensions: [
                {
                    name: 'browser',
                },
            ],
            metrics: [
                {
                    name: 'activeUsers',
                },
            ],

        });
        if (response && response.rows) {
            response.rows.forEach((row: any) =>{
                dataIndiv = {name: row.dimensionValues[0].value, value: parseInt(row.metricValues[0].value)};
                browserFormats.push(dataIndiv);
            });
            res.send(browserFormats);
        }
    }catch (e) {
        console.log(e);
    }
});
router.get('/ga1/techchart/os', async function(req, res, next) {
    try{
        let browserFormats: any[] = [];
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '2022-01-01',
                    endDate: 'today',
                },
            ],
            dimensions: [
                {
                    name: 'operatingSystemWithVersion',
                },
            ],
            metrics: [
                {
                    name: 'activeUsers',
                },
            ],

        });
        if (response && response.rows) {
            response.rows.forEach((row: any) =>{
                dataIndiv = {name: row.dimensionValues[0].value, value: parseInt(row.metricValues[0].value)};
                browserFormats.push(dataIndiv);
            });
            res.send(browserFormats);
        }
    }catch (e) {
        console.log(e);
    }
});
router.get('/ga1/linechart/activeUsers', async function(req, res, next) {
    try{
        let AULineChartData: any[] = [];
        let dataBody;
        const [response1] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dimensions: [
                {
                    name: 'month',
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
        const [response2] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dimensions: [
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
        if (response1 && response1.rows) {
            if (response2.rows) {
                response2.rows.forEach((countryrow: any) => {
                    let dataSeries: any[] = [];
                    if (response1.rows) {
                        response1.rows.forEach((daterow: any) => {
                            let dataSeriesBody;
                            if (countryrow.dimensionValues[0].value === daterow.dimensionValues[1].value) {

                                dataSeriesBody = {
                                    value: daterow.metricValues[0].value,
                                    name: daterow.dimensionValues[0].value
                                }
                                dataSeries.push(dataSeriesBody);
                            }
                        });
                        // res.send(dataSeries);
                        dataBody = {name: countryrow.dimensionValues[0].value, series: dataSeries}
                        AULineChartData.push(dataBody);
                    }
                })
            }
            res.send(AULineChartData);
        }
    }catch (e) {
        console.log(e);
    }
});
router.get('/realtime/activeusers', async function(req, res, next) {
    try{
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
        if (response){
            if (response.rows) {
                response.rows.forEach((row: any) => {
                    res.send(response);
                });
            }
        }
    }catch (e) {
        console.log(e)
    }
});
module.exports = router;