export type ChartOptions = {

    /********************************************/
    /* Definitions of the structure of the data */
    /********************************************/
    /**
     * Type of the `xd` variable.
     */
    type: 'character' | 'date' | 'integer';

    /**
     * Label to use on the x-axis for charts whose x variable is not time.
     */
    xAxisLabel?: string | null;

    /**
     * Specific type of date that `xd` is (if it is a date).
     */
    timeperiod_type:
        'Monthly' | /* e.g., 2019-06-30  - all last day of a month*/
        'monthly' | /* e.g. 2024-09-09 - these all have a day of week = month of year */
        'Quarter' | /* e.g. 2024-07-01 - all first day of a quarter (the month is 01/04/07/10)*/

        'Annual' | /* e.g., 2011-01-01 - first of jan*/

        'Bi-annual' | /* e.g., 2002-07-01 1st of Jan or July */
        'Academic Year' | /* e.g. 2021-09-01  all 1st September*/
        'Financial Year' | /* e.g. 2020-04-01 - 1st of April */
        'Three Year Average' | /* e.g. 2019-01-01 - all 1st of Jan*/
        '12-month period' | /* assorted dates, depending on dataset */
        'TfL Period' | /* monthly, but on irregular dates? */

        'year' | /* e.g., 2014  */

        'Multi-year period' | /* xd is not actually a date */
        null

    ;


    /*************************************************/
    /* Definitions of how the data should be plotted */
    /*************************************************/
    /**
     * Plot type.
     */
    chartType: 'line' |  'lineChartWithForecast' | 'lineChartWithLineStyles' |
        'barChartVertical' | 'barChartVerticalGrouped' | 'barChartHorizontal' | 'barChartHorizontalGrouped' | 'barChartStacked' | 'barChartStackedTimeseries' |
        'stackedHistogram' |
        'incomeSlope' |
        'boroughChoropleth' | 'wardChoropleth';

    /**
     * If `true`, force 0 to be included in the domain of the y-axis.
     */
    includeZero?: boolean;

    /**
     * Indicates that scale doesn't start at 0, but crosses 0, so that we need to draw a rule at y=0.
     * In principle, we could determine this automatically.
     */
    includeZeroLine?: boolean;


    /**
     * Value of insetRight to override default (e.g., to increase space for line labels to the right of the chart).
     */
    insetRight?: number;

    /**
     * Format string used for labelling ticks on the y-axis.
     */
    ytickformat: string | null;

    /**
	 * Overrides for the extent of the y-axis as [min, max].
	 */
	yDomain?: [number | undefined, number | undefined];

    /**
     * Overrides for the ordering of bars.
     */
    x_order: string | null;

    /**
     * List values of `b` for which rows of data should be hidden.
     */
    hide?: string[];

    /**
     * Specify what horizontal reference lines/rules should be drawn.
     */
    reference_lines?: { label: string, y: number }[];

    /**
     * If `true`, then chart is faceted.
     */
     faceted?: boolean;

     facetOrder?: string[];

     /**
      * Sets the `type` of the x scale. Can be set to `'band'` to silence warnings when ObservablePlot thinks a date or numeric scale should be applied to the x-axis.
      */
     xScaleType?: string;


     /**
      * Time interval of bars in `barChartStackedTimeseries` plot
      */
     xInterval?: string;

     /**
      * This is not the number of ticks that *should* be drawn, but rather an indication of how many ObservablePlot chooses to draw, used to determine the y-axis overhangs.
      */
     numTicks?: number;

    /**
     * If provided for date-based line charts, shades the chart area from this date onward.
     */
    projectedStart?: string;

    /**
     * Optional explicit domain for the x-axis. Useful for tightening crowded time-series comparisons.
     */
    xDomain?: [string | number | Date, string | number | Date];

     /**
      * Can be used to override threshold color scale for a choropleth map.
      * TODO: may need to generalise to allow customization of colors on other map types too,
      */
     colorScale?: {
        domain: number[];
        range: string[];
     },

    colorScaleLight?: {
        domain: number[];
        range: string[];
     },

    colorScaleDark: {
        domain: number[];
        range: string[];
     }

}

export type ChartDataRow = {
    dataset?: string;
    xd: string | number | Date;
    b: string;
    y: number;
    z2?: string;
    [key: string]: unknown;
};

export type ColorChoice = {
    type?: string;
    domain?: string[];
    range?: string[];
};

export const chartOptions: Record<string, ChartOptions> = {

    /** Borough choropleth **/
    "borough_population": {
        "chartType": "boroughChoropleth",
        "type": "character",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [-5, -1, 1, 5, 10, 15, 20],
            "range": ["#ef8a62", "#ef8a62", "#d9d9d9", "#67a9cf", "#4393c3", "#2166ac", "#08519c", "#08306b"]
        },
    },

    "housing_led_vs_trend_central_borough_difference": {
        "chartType": "boroughChoropleth",
        "type": "character",
        "ytickformat": ".1f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [-20, -10, -5, -1, 1, 5, 10, 20],
            "range": ["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac"]
        }
    },

      "ward_population": {
        "chartType": "wardChoropleth",
        "type": "character",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [-5, -1, 1, 5, 10, 15, 20],
            "range": ["#ef8a62", "#ef8a62", "#d9d9d9", "#67a9cf", "#4393c3", "#2166ac", "#08519c", "#08306b"]
        }
    },

    "housing_led_ward_population": {
        "chartType": "wardChoropleth",
        "type": "character",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [-5, -1, 1, 5, 10, 15, 20],
            "range": ["#ef8a62", "#ef8a62", "#d9d9d9", "#67a9cf", "#4393c3", "#2166ac", "#08519c", "#08306b"]
        }
    },

    "large_sites_lsoa": {
        "chartType": "boroughChoropleth",
        "type": "character",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
            "range": ["#9ca3af", "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"]
        }
    },

    "lsoa_industrial_additionalrelease10y": {
        "chartType": "boroughChoropleth",
        "type": "character",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
            "range": ["#9ca3af", "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"]
        }
    },

    "phased_lsoa_longertermgb": {
        "chartType": "boroughChoropleth",
        "type": "character",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
            "range": ["#9ca3af", "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"]
        }
    },

    "small_sites_lsoa": {
        "chartType": "boroughChoropleth",
        "type": "character",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": null,
        "colorScale": {
            "domain": [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
            "range": ["#9ca3af", "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"]
        }
    },

    "development_capacity_cumulative_london": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ",.0f",
        "x_order": null,
        "timeperiod_type": "Annual",
        "insetLeft": 30,
        "insetRight": 180
    },

    /** Demography **/
    "total_population_year": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".2s",
        "x_order": null,
        "timeperiod_type": "Annual"
    },

    "proj_total_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "housing_led_projected_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "housing_led_total_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "housing_led_annual_population_change": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        numTicks: 4,
        projectedStart: "2024-01-01"
    },

    "housing_led_age_structure_median_age": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "year",
        projectedStart: "2024-01-01"
    },

    "housing_led_working_age_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "housing_led_primary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "housing_led_secondary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "housing_led_population_age_65_plus": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "housing_led_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "housing_led_births": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_deaths": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_natural_change": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_in_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_out_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_net_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_tfr": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1f",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_tfr_age": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".1f",
        "x_order": null,
        "timeperiod_type": "year",
        "xAxisLabel": "Age",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_asfr": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".2f",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_asfr_age": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".2f",
        "x_order": null,
        "timeperiod_type": "year",
        "xAxisLabel": "Age",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_births_by_mothers_age": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_births_by_mothers_age_age": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "year",
        "xAxisLabel": "Age",
        "colorScale": {
            "domain": ["Low", "Central", "High"],
            "range": ["#1d4ed8", "#f59e0b", "#d97706"]
        }
    },

    "housing_led_vs_trend_total_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        "xDomain": ["2021-01-01", "2051-01-01"],
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": [
                "Housing-led - Central",
                "Housing-led - High",
                "Housing-led - Low",
                "Trend - Central",
                "Trend - High",
                "Trend - Low"
            ],
            "range": [
                "#f59e0b",
                "#d97706",
                "#b45309",
                "#60a5fa",
                "#3b82f6",
                "#1d4ed8"
            ]
        }
    },

    "housing_led_vs_trend_annual_population_change": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        numTicks: 4,
        "xDomain": ["2021-01-01", "2051-01-01"],
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": [
                "Housing-led - Central",
                "Housing-led - High",
                "Housing-led - Low",
                "Trend - Central",
                "Trend - High",
                "Trend - Low"
            ],
            "range": [
                "#f59e0b",
                "#d97706",
                "#b45309",
                "#60a5fa",
                "#3b82f6",
                "#1d4ed8"
            ]
        }
    },

    "housing_led_vs_trend_age_structure": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "year",
        "colorScale": {
            "domain": [
                "Housing-led - Central",
                "Housing-led - High",
                "Housing-led - Low",
                "Trend - Central",
                "Trend - High",
                "Trend - Low",
                "Trend - 2024 structure"
            ],
            "range": [
                "#f59e0b",
                "#d97706",
                "#b45309",
                "#60a5fa",
                "#3b82f6",
                "#1d4ed8",
                "#d1d5db"
            ]
        }
    },

    "housing_led_vs_trend_working_age_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        "xDomain": ["2021-01-01", "2051-01-01"],
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": [
                "Housing-led - Central",
                "Housing-led - High",
                "Housing-led - Low",
                "Trend - Central",
                "Trend - High",
                "Trend - Low"
            ],
            "range": [
                "#f59e0b",
                "#d97706",
                "#b45309",
                "#60a5fa",
                "#3b82f6",
                "#1d4ed8"
            ]
        }
    },

    "housing_led_vs_trend_primary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        "xDomain": ["2021-01-01", "2051-01-01"],
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": [
                "Housing-led - Central",
                "Housing-led - High",
                "Housing-led - Low",
                "Trend - Central",
                "Trend - High",
                "Trend - Low"
            ],
            "range": [
                "#f59e0b",
                "#d97706",
                "#b45309",
                "#60a5fa",
                "#3b82f6",
                "#1d4ed8"
            ]
        }
    },

    "housing_led_vs_trend_secondary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        "xDomain": ["2021-01-01", "2051-01-01"],
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": [
                "Housing-led - Central",
                "Housing-led - High",
                "Housing-led - Low",
                "Trend - Central",
                "Trend - High",
                "Trend - Low"
            ],
            "range": [
                "#f59e0b",
                "#d97706",
                "#b45309",
                "#60a5fa",
                "#3b82f6",
                "#1d4ed8"
            ]
        }
    },

    "housing_led_vs_trend_population_age_65_plus": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        "xDomain": ["2021-01-01", "2051-01-01"],
        projectedStart: "2024-01-01",
        "colorScale": {
            "domain": [
                "Housing-led - Central",
                "Housing-led - High",
                "Housing-led - Low",
                "Trend - Central",
                "Trend - High",
                "Trend - Low"
            ],
            "range": [
                "#f59e0b",
                "#d97706",
                "#b45309",
                "#60a5fa",
                "#3b82f6",
                "#1d4ed8"
            ]
        }
    },

    "proj_annual_population_change": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        numTicks: 4,
        projectedStart: "2025-01-01"
    },

    "proj_age_structure_median_age": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "year",
        includeZero: true
    },

    "proj_working_age_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj_primary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj_secondary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj_population_age_65_plus": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj2_total_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj2_annual_population_change": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        numTicks: 4,
        projectedStart: "2025-01-01"
    },

    "proj2_age_structure_median_age": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "year",
        includeZero: true
    },

    "proj2_working_age_population": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj2_primary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj2_secondary_school_age_children": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "proj2_population_age_65_plus": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2025-01-01"
    },

    "population_age_structure": {
        "chartType": "lineChartWithForecast",
        "type": "integer",
        "ytickformat": ".0f",
        "x_order": null,
        "timeperiod_type": "Annual",
        insetRight: 160,
        includeZero: true
    },

    "annual_change_component": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        numTicks: 3,
    },

    "annual_births": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Bi-annual",
        includeZero: true,
        numTicks: 3,
    },

    "births_age_mother": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        numTicks: 4
    },

    "births_mothers_cob": {
        "chartType": "lineChartWithForecast",
        "type": "date",

        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "total_fertility_rate": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".1f",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true
    },


    // Components of Change datasets
    "births": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".2s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "deaths": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "natural_change": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        projectedStart: "2024-01-01"
    },

    "international_net_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        projectedStart: "2024-01-01"
    },

    "domestic_net_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        projectedStart: "2024-01-01"
    },

    "domestic_in_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0f",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "domestic_out_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0f",
        "x_order": null,
        "timeperiod_type": "Annual",
        projectedStart: "2024-01-01"
    },

    "total_net_migration": {
        "chartType": "lineChartWithForecast",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true,
        projectedStart: "2024-01-01"
    },

}