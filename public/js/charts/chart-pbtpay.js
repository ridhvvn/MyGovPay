!(function (NioApp, $) {
    "use strict";

    // Vector Map
    var Mymap = {
        map: 'malaysia',
        data: {
            "png": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "kdh": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "pls": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "jhr": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "ktn": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "mlk": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "nsn": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "phg": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "sgr": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "trg": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "sbh": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "swk": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "ptj": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "lbn": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "prk": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
            "kul": [
                { "category": "Jumlah Pembayar", "value": "16.63" },
                { "category": "Jumlah Transaksi", "value": "25.47" },
                { "category": "Jumlah Bil", "value": "25.47" },
                { "category": "Jumlah Kutipan", "value": "25.47" }],
        }
    };

    function jqvmap_init() {
        var elm = '.vector-map';

        if ($(elm).exists() && typeof ($.fn.vectorMap) === 'function') {
            $(elm).each(function () {
                var $self = $(this),
                    _self_id = $self.attr('id'),
                    map_data = eval(_self_id);
                $self.vectorMap({
                    map: map_data.map,
                    backgroundColor: 'transparent',
                    borderColor: '#dee6ed',
                    borderOpacity: 1,
                    borderWidth: 1,
                    color: '#ccd7e2',
                    enableZoom: false,
                    hoverColor: '#b695ff',
                    hoverOpacity: null,
                    normalizeFunction: 'linear',
                    scaleColors: ['#ccd7e2', '#9d72ff'],
                    selectedColor: '#854fff',
                    showTooltip: true,
                    values: map_data.data,                    
                    onLabelShow: function (event, label, code) {
                        var regionData = map_data.data[code] || [];
                        var labelText = '';
                        regionData.forEach(function (dataPoint) {
                            labelText += dataPoint.category + ': ' + dataPoint.value + '<br>';
                        });
                        var mapData = JQVMap.maps,
                            what = Object.keys(mapData)[0],
                            name = mapData[what].paths[code]['name'];
                        label.html(name + '<br>' + labelText);
                    }
                });
            });
        }
    };
    NioApp.coms.docReady.push(jqvmap_init);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Bar Chart
    var grafBulanan01 = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
        ],
        dataUnit: 'People',
        datasets: [{
            label: "join",
            color: "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75,
                90, 110, 80, 125, 55, 95, 75, 90, 75, 90
            ]
        }]
    };

    var grafBulanan02 = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
        ],
        dataUnit: 'People',
        datasets: [{
            label: "join",
            color: "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75,
                90, 110, 80, 125, 55, 95, 75, 90, 75, 90
            ]
        }]
    };

    var grafbulanan03 = {
        labels: ["01 Nov", "02 Nov", "03 Nov", "04 Nov", "05 Nov", "06 Nov", "07 Nov", "08 Nov", "09 Nov",
            "10 Nov", "11 Nov", "12 Nov", "13 Nov", "14 Nov", "15 Nov", "16 Nov", "17 Nov", "18 Nov",
            "19 Nov", "20 Nov", "21 Nov"
        ],
        dataUnit: 'USD',
        stacked: true,
        legend: true,
        datasets: [{
            label: "Direct Join",
            color: "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75,
                90
            ]
        }, {
            label: "Referral Join",
            color: "#ccd4ff",
            data: [125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 75,
                90
            ]
        }, {
            label: "Referral Join",
            color: "#ccd4ff",
            data: [125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 75,
                90
            ]
        }]
    };

    var grafBulanan04 = {
        labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dataUnit : 'USD',
        legend: true,
        datasets : [{
            label : "Income",
            color : "#b695ff",
            data: [100, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95]
        },{
            label : "Expense",
            color : "#f4aaa4",
            data: [75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125]
        },{
            label : "Expense",
            color : "#f4aaa4",
            data: [75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125]
        }]
    };

    var grafTahunan01 = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
        ],
        dataUnit: 'People',
        datasets: [{
            label: "join",
            color: "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75,
                90, 110, 80, 125, 55, 95, 75, 90, 75, 90
            ]
        }]
    };

    var grafTahunan02 = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
        ],
        dataUnit: 'People',
        datasets: [{
            label: "join",
            color: "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75,
                90, 110, 80, 125, 55, 95, 75, 90, 75, 90
            ]
        }]
    };

    var grafUser = {
        labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dataUnit : 'USD',
        datasets : [{
            label : "Income",
            color : "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95]
        },{
            label : "Expense",
            color : "#f4aaa4",
            data: [75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125]
        }]
    };

    var grafPBT = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
        ],
        dataUnit: 'People',
        datasets: [{
            label: "join",
            color: "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75,
                90, 110, 80, 125, 55, 95, 75, 90, 75, 90
            ]
        }]
    };

    var grafTrans = {
        labels: ["01 Nov", "02 Nov", "03 Nov", "04 Nov", "05 Nov", "06 Nov", "07 Nov", "08 Nov", "09 Nov",
            "10 Nov", "11 Nov", "12 Nov", "13 Nov", "14 Nov", "15 Nov", "16 Nov", "17 Nov", "18 Nov",
            "19 Nov", "20 Nov", "21 Nov"
        ],
        dataUnit: 'USD',
        stacked: true,
        datasets: [{
            label: "Direct Join",
            color: "#b695ff",
            data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75,
                90
            ]
        }, {
            label: "Referral Join",
            color: "#ccd4ff",
            data: [125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95, 75, 90, 75,
                90
            ]
        }]
    };

    function barChart(selector, set_data) {
        var $selector = selector ? $(selector) : $('.bar-chart');
        $selector.each(function () {
            var $self = $(this),
                _self_id = $self.attr('id'),
                _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data,
                _d_legend = typeof _get_data.legend === 'undefined' ? false : _get_data.legend;
            var selectCanvas = document.getElementById(_self_id).getContext("2d");
            var chart_data = [];
            for (var i = 0; i < _get_data.datasets.length; i++) {
                chart_data.push({
                    label: _get_data.datasets[i].label,
                    data: _get_data.datasets[i].data,
                    // Styles
                    backgroundColor: _get_data.datasets[i].color,
                    borderWidth: 2,
                    borderColor: 'transparent',
                    hoverBorderColor: 'transparent',
                    borderSkipped: 'bottom',
                    barPercentage: NioApp.State.asMobile ? .95 : .75,
                    categoryPercentage: NioApp.State.asMobile ? .95 : .75
                });
            }
            var chart = new Chart(selectCanvas, {
                type: 'bar',
                data: {
                    labels: _get_data.labels,
                    datasets: chart_data
                },
                options: {
                    plugins: {
                        legend: {
                            display: _get_data.legend ? _get_data.legend : false,
                            rtl: NioApp.State.isRTL,
                            labels: {
                                boxWidth: 30,
                                padding: 20,
                                color: '#6783b8'
                            }
                        },
                        tooltip: {
                            enabled: true,
                            rtl: NioApp.State.isRTL,
                            callbacks: {
                                label: function label(context) {
                                    return "".concat(context.parsed.y, " ").concat(_get_data
                                        .dataUnit);
                                }
                            },
                            backgroundColor: '#eff6ff',
                            titleFont: {
                                size: 13
                            },
                            titleColor: '#6783b8',
                            titleMarginBottom: 6,
                            bodyColor: '#9eaecf',
                            bodyFont: {
                                size: 12
                            },
                            bodySpacing: 4,
                            padding: 10,
                            footerMarginTop: 0,
                            displayColors: false
                        }
                    },
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            display: true,
                            stacked: _get_data.stacked ? _get_data.stacked : false,
                            position: NioApp.State.isRTL ? "right" : "left",
                            ticks: {
                                beginAtZero: true,
                                font: {
                                    size: 12
                                },
                                color: '#9eaecf'
                            },
                            grid: {
                                color: NioApp.hexRGB("#526484", .2),
                                tickLength: 0,
                                zeroLineColor: NioApp.hexRGB("#526484", .2),
                                drawTicks: false
                            }
                        },
                        x: {
                            display: true,
                            stacked: _get_data.stacked ? _get_data.stacked : false,
                            ticks: {
                                font: {
                                    size: 12
                                },
                                color: '#9eaecf',
                                source: 'auto',
                                reverse: NioApp.State.isRTL
                            },
                            grid: {
                                color: "transparent",
                                tickLength: 10,
                                zeroLineColor: 'transparent',
                                drawTicks: false
                            }
                        }
                    }
                }
            });
        });
    }
    // init bar chart
    barChart();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Line Chart
    var grafHarian = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
        ],
        dataUnit: 'BTC',
        lineTension: 0.1,
        datasets: [{
            label: "Sales Overview",
            color: "#9d72ff",
            background: NioApp.hexRGB('#9d72ff', .3),
            data: [8200, 7800, 9500, 5500, 9200, 9690, 8200, 7800, 9500, 5500, 9200, 9690, 8200, 7800,
                9500, 5500, 9200, 9690, 8200, 7800, 9500, 5500, 9200, 9690, 8200, 7800, 9500, 5500,
                9200, 9690
            ]
        }]
    };

    function lineSalesOverview(selector, set_data) {
        var $selector = (selector) ? $(selector) : $('.sales-overview-chart');
        $selector.each(function () {
            var $self = $(this),
                _self_id = $self.attr('id'),
                _get_data = (typeof set_data === 'undefined') ? eval(_self_id) : set_data;
            var selectCanvas = document.getElementById(_self_id).getContext("2d");

            var chart_data = [];
            for (var i = 0; i < _get_data.datasets.length; i++) {
                chart_data.push({
                    label: _get_data.datasets[i].label,
                    tension: _get_data.lineTension,
                    backgroundColor: _get_data.datasets[i].background,
                    fill: true,
                    borderWidth: 2,
                    borderColor: _get_data.datasets[i].color,
                    pointBorderColor: "transparent",
                    pointBackgroundColor: "transparent",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: _get_data.datasets[i].color,
                    pointBorderWidth: 2,
                    pointHoverRadius: 3,
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 3,
                    data: _get_data.datasets[i].data,
                });
            }
            var chart = new Chart(selectCanvas, {
                type: 'line',
                data: {
                    labels: _get_data.labels,
                    datasets: chart_data,
                },
                options: {
                    plugins: {
                        legend: {
                            display: (_get_data.legend) ? _get_data.legend : false,
                            rtl: NioApp.State.isRTL,
                            labels: {
                                boxWidth: 30,
                                padding: 20,
                                color: '#6783b8',
                            }
                        },
                        tooltip: {
                            enabled: true,
                            rtl: NioApp.State.isRTL,
                            callbacks: {
                                label: function (context) {
                                    return `${context.parsed.y} ${_get_data.dataUnit}`;
                                },
                            },
                            backgroundColor: '#1c2b46',
                            titleFont: {
                                size: 13,
                            },
                            titleColor: '#fff',
                            titleMarginBottom: 6,
                            bodyColor: '#fff',
                            bodyFont: {
                                size: 12
                            },
                            bodySpacing: 4,
                            padding: 10,
                            footerMarginTop: 0,
                            displayColors: false
                        },
                    },
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            display: true,
                            stacked: (_get_data.stacked) ? _get_data.stacked : false,
                            position: NioApp.State.isRTL ? "right" : "left",
                            ticks: {
                                beginAtZero: true,
                                font: {
                                    size: 11,
                                },
                                color: '#9eaecf',
                                padding: 10,
                                callback: function (value, index, values) {
                                    return '$ ' + value;
                                },
                                min: 100,
                                stepSize: 3000
                            },
                            grid: {
                                color: NioApp.hexRGB("#526484", .2),
                                tickLength: 0,
                                zeroLineColor: NioApp.hexRGB("#526484", .2),
                                drawTicks: false,
                            },

                        },
                        x: {
                            display: true,
                            stacked: (_get_data.stacked) ? _get_data.stacked : false,
                            ticks: {
                                font: {
                                    size: 9,
                                },
                                color: '#9eaecf',
                                source: 'auto',
                                padding: 10,
                                reverse: NioApp.State.isRTL
                            },
                            grid: {
                                color: "transparent",
                                tickLength: 0,
                                zeroLineColor: 'transparent',
                                drawTicks: false,
                            },
                        }
                    }
                }
            });
        })
    }

    // init chart
    NioApp.coms.docReady.push(function () {
        lineSalesOverview();
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).ready(function () {
        // Function to load data for selected year
        function loadDataForYear(year) {
            // Example: You can use AJAX to fetch data from the server based on the selected year
            // For now, let's assume you have the data for each year already available

            // Example data for demonstration
            var dataForYear = {
                "2020": {
                    "Jumlah Pembayar": "5.93K",
                    "Jumlah Transaksi": "11.53K",
                    "Jumlah Bil": "10.58k",
                    "Jumlah Kutipan": "RM 5,024,435"
                },
                "2021": {
                    "Jumlah Pembayar": "38.15K",
                    "Jumlah Transaksi": "87.25K",
                    "Jumlah Bil": "78.98k",
                    "Jumlah Kutipan": "RM 59,962,000"
                },
                "2022": {
                  "Jumlah Pembayar": "88.15K",
                  "Jumlah Transaksi": "219.2K",
                  "Jumlah Bil": "191.19k",
                  "Jumlah Kutipan": "RM 176,566,364"
                },
                "2023": {
                  "Jumlah Pembayar": "165.56K",
                  "Jumlah Transaksi": "389.48K",
                  "Jumlah Bil": "329.65k",
                  "Jumlah Kutipan": "RM 334,017,000"
                },
                "2024": {
                  "Jumlah Pembayar": "121.15K",
                  "Jumlah Transaksi": "233.65K",
                  "Jumlah Bil": "195.87k",
                  "Jumlah Kutipan": "RM 161,880,000"
                },
            };

            // Update analytic-ov div with data for the selected year
            var analyticOvGroup = $('.analytic-ov-group');
            analyticOvGroup.empty(); // Clear existing data

            $.each(dataForYear[year], function (title, amount) {
                var analyticData = $('<div class="analytic-data analytic-ov-data">' +
                    '<div class="title">' + title + '</div>' +
                    '<div class="amount">' + amount + '</div>' +
                    '</div>');
                analyticOvGroup.append(analyticData);
            });
        }

        // Handle click event for year links
        $('.year-link').click(function (e) {
            e.preventDefault(); // Prevent default link behavior

            // Remove 'active' class from all year links
            $('.year-link').removeClass('active');

            // Add 'active' class to the clicked year link
            $(this).addClass('active');

            // Get the year from the data-year attribute
            var selectedYear = $(this).data('year');

            // Load data for the selected year
            loadDataForYear(selectedYear);
        });

        // Load data for the initial selected year (2021)
        loadDataForYear('2020');
    });//tab harian

})(NioApp, jQuery);