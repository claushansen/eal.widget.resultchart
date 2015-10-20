var args = arguments[0] || {};
 
 
 /*
 * Building default options for chart
 * 
 */
var options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Your calculated results'
        },
        subtitle: {
            text: 'date: '
        },
        xAxis: {
            categories: ['250 mhz', '500mhz', '1000mhz', '2000mhz', '3000mhz', '4000mhz', '6000mhz', '8000mhz']
        },
        yAxis: {
            title: {
                text: 'Sound pressure (db)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Left ear',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 45]
        }, {
            name: 'Right ear',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6]
        }]
    };
    
/*
 * Overriding title in our options object if it is present in our alloy markup
 * <Widget src="eal.widget.resultchart" id="chart" title="My result of the test">
 */
if(args.title){
	options.title.text = args.title;
}

/*
 * Overriding subtitle in our options object if it is present in our alloy markup
 * <Widget src="eal.widget.resultchart" id="chart" subtitle="My subtitle">
 */
if(args.title){
	options.subtitle.text = args.subtitle;
}
    
/*
 * Setting url for our webview
 */
$.chartWebview.url= WPATH('html/chart.html');
/*
 * adding an eventlistener to fire our plotChart function on load
 */
$.chartWebview.addEventListener('load', function() {
	Ti.API.info('chartWebView ready');
	$.chartWebview.evalJS('plotChart('+JSON.stringify(options)+')');
});

/*
 * Function setSeries to update chart series
 * @param array series, needs data in format like
 * [{
 *           name: 'Left ear',
 *           data: [10, 20, 30, 40, 50, 60, 70, 80]
 *       }, {
 *           name: 'Right ear',
 *           data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6]
 * }]
 */
exports.setSeries = function(series){
	options.series = series;
	$.chartWebview.evalJS('plotChart('+JSON.stringify(options)+')');
};

/*
 * Function setTitle to update chart title
 * @param string title
 * 
 */
exports.setTitle = function(title){
	options.title.text = title;
	$.chartWebview.evalJS('plotChart('+JSON.stringify(options)+')');
};

/*
 * Function setSubtitle to update chart subtitle
 * @param string subtitle
 * 
 */
exports.setSubtitle = function(subtitle){
	options.subtitle.text = subtitle;
	$.chartWebview.evalJS('plotChart('+JSON.stringify(options)+')');
};

