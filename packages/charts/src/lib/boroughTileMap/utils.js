export const LDNSqrBoroughsGrid = {
    gridProperties: { GRID_X: 8, GRID_Y: 7 },
    gridItems: [
        { NAME: 'City of London', SHORT_NAME: 'Cty', GSS_CODE: 'E09000001', GRID_X: 4, GRID_Y: 3 },
        {
            NAME: 'Barking and Dagenham',
            SHORT_NAME: 'Bar',
            GSS_CODE: 'E09000002',
            GRID_X: 7,
            GRID_Y: 3
        },
        { NAME: 'Barnet', SHORT_NAME: 'Brn', GSS_CODE: 'E09000003', GRID_X: 3, GRID_Y: 1 },
        { NAME: 'Bexley', SHORT_NAME: 'Bxl', GSS_CODE: 'E09000004', GRID_X: 7, GRID_Y: 4 },
        { NAME: 'Brent', SHORT_NAME: 'Brt', GSS_CODE: 'E09000005', GRID_X: 2, GRID_Y: 2 },
        { NAME: 'Bromley', SHORT_NAME: 'Brm', GSS_CODE: 'E09000006', GRID_X: 5, GRID_Y: 5 },
        { NAME: 'Camden', SHORT_NAME: 'Cmd', GSS_CODE: 'E09000007', GRID_X: 3, GRID_Y: 2 },
        { NAME: 'Croydon', SHORT_NAME: 'Crd', GSS_CODE: 'E09000008', GRID_X: 4, GRID_Y: 5 },
        { NAME: 'Ealing', SHORT_NAME: 'Elg', GSS_CODE: 'E09000009', GRID_X: 1, GRID_Y: 2 },
        { NAME: 'Enfield', SHORT_NAME: 'Enf', GSS_CODE: 'E09000010', GRID_X: 4, GRID_Y: 0 },
        { NAME: 'Greenwich', SHORT_NAME: 'Grn', GSS_CODE: 'E09000011', GRID_X: 6, GRID_Y: 4 },
        { NAME: 'Hackney', SHORT_NAME: 'Hck', GSS_CODE: 'E09000012', GRID_X: 5, GRID_Y: 2 },
        {
            NAME: 'Hammersmith and Fulham',
            SHORT_NAME: 'Hms',
            GSS_CODE: 'E09000013',
            GRID_X: 1,
            GRID_Y: 3
        },
        { NAME: 'Haringey', SHORT_NAME: 'Hgy', GSS_CODE: 'E09000014', GRID_X: 4, GRID_Y: 1 },
        { NAME: 'Harrow', SHORT_NAME: 'Hrw', GSS_CODE: 'E09000015', GRID_X: 2, GRID_Y: 1 },
        { NAME: 'Havering', SHORT_NAME: 'Hvg', GSS_CODE: 'E09000016', GRID_X: 7, GRID_Y: 2 },
        { NAME: 'Hillingdon', SHORT_NAME: 'Hdn', GSS_CODE: 'E09000017', GRID_X: 0, GRID_Y: 2 },
        { NAME: 'Hounslow', SHORT_NAME: 'Hns', GSS_CODE: 'E09000018', GRID_X: 0, GRID_Y: 3 },
        { NAME: 'Islington', SHORT_NAME: 'Isl', GSS_CODE: 'E09000019', GRID_X: 4, GRID_Y: 2 },
        {
            NAME: 'Kensington and Chelsea',
            SHORT_NAME: 'Kns',
            GSS_CODE: 'E09000020',
            GRID_X: 2,
            GRID_Y: 3
        },
        {
            NAME: 'Kingston upon Thames',
            SHORT_NAME: 'Kng',
            GSS_CODE: 'E09000021',
            GRID_X: 2,
            GRID_Y: 5
        },
        { NAME: 'Lambeth', SHORT_NAME: 'Lam', GSS_CODE: 'E09000022', GRID_X: 3, GRID_Y: 4 },
        { NAME: 'Lewisham', SHORT_NAME: 'Lsh', GSS_CODE: 'E09000023', GRID_X: 5, GRID_Y: 4 },
        { NAME: 'Merton', SHORT_NAME: 'Mrt', GSS_CODE: 'E09000024', GRID_X: 3, GRID_Y: 5 },
        { NAME: 'Newham', SHORT_NAME: 'Nwm', GSS_CODE: 'E09000025', GRID_X: 6, GRID_Y: 3 },
        { NAME: 'Redbridge', SHORT_NAME: 'Rdb', GSS_CODE: 'E09000026', GRID_X: 6, GRID_Y: 2 },
        {
            NAME: 'Richmond upon Thames',
            SHORT_NAME: 'Rch',
            GSS_CODE: 'E09000027',
            GRID_X: 1,
            GRID_Y: 4
        },
        { NAME: 'Southwark', SHORT_NAME: 'Swr', GSS_CODE: 'E09000028', GRID_X: 4, GRID_Y: 4 },
        { NAME: 'Sutton', SHORT_NAME: 'Stn', GSS_CODE: 'E09000029', GRID_X: 3, GRID_Y: 6 },
        { NAME: 'Tower Hamlets', SHORT_NAME: 'Tow', GSS_CODE: 'E09000030', GRID_X: 5, GRID_Y: 3 },
        { NAME: 'Waltham Forest', SHORT_NAME: 'Wth', GSS_CODE: 'E09000031', GRID_X: 5, GRID_Y: 1 },
        { NAME: 'Wandsworth', SHORT_NAME: 'Wns', GSS_CODE: 'E09000032', GRID_X: 2, GRID_Y: 4 },
        { NAME: 'Westminster', SHORT_NAME: 'Wst', GSS_CODE: 'E09000033', GRID_X: 3, GRID_Y: 3 }
    ]
};
export const joinDataWithGrid = (data, gssCodeField, shortNameField, nameField) => {
    const joinedData = [];
    for (const d of data) {
        let grid;
        if (gssCodeField) {
            grid = LDNSqrBoroughsGrid.gridItems.find((g) => g.GSS_CODE === d[gssCodeField]);
        }
        else if (shortNameField) {
            grid = LDNSqrBoroughsGrid.gridItems.find((g) => g.SHORT_NAME === d[shortNameField]);
        }
        else {
            grid = LDNSqrBoroughsGrid.gridItems.find((g) => g.NAME === d[nameField]);
        }
        if (grid) {
            joinedData.push({ ...d, grid });
        }
    }
    return joinedData;
};
export const calcGridDimensions = (containerWidth, containerHeight) => {
    const margin = { top: 70, right: 10, bottom: 50, left: 10 }; // default
    const w = containerWidth - margin.left - margin.right;
    const h = containerHeight - margin.top - margin.bottom;
    // layout grid X & Y counts
    const gridCountX = LDNSqrBoroughsGrid.gridProperties.GRID_X;
    const gridCountY = LDNSqrBoroughsGrid.gridProperties.GRID_Y;
    const gridRatio = gridCountX / gridCountY;
    const screenRatio = w / h;
    let criticalDimension;
    let criticalGridCount;
    // calc critical dimension
    if (gridRatio < screenRatio) {
        // grid is "more" portrait than screen
        criticalDimension = h;
        criticalGridCount = gridCountY;
    }
    else {
        criticalDimension = w;
        criticalGridCount = gridCountX;
    }
    const gridSqrW = criticalDimension / criticalGridCount;
    // spacing as % of available width/height, rather than fixed (for responsiveness)
    const gridSqrSpacing = gridSqrW / 10;
    return {
        innerSize: gridSqrW - gridSqrSpacing,
        outerSize: gridSqrW
    };
};
export const exampleData = [
    {
        GSS_CODE: 'E09000001',
        ValueA: 19992,
        ValueB: 1
    },
    {
        GSS_CODE: 'E09000002',
        ValueA: 25925,
        ValueB: 60001
    },
    {
        GSS_CODE: 'E09000003',
        ValueA: 10582,
        ValueB: 25934
    },
    {
        GSS_CODE: 'E09000004',
        ValueA: 17330,
        ValueB: 33540
    },
    {
        GSS_CODE: 'E09000005',
        ValueA: 37921,
        ValueB: 5613
    },
    {
        GSS_CODE: 'E09000006',
        ValueA: 5314,
        ValueB: 15118
    },
    {
        GSS_CODE: 'E09000007',
        ValueA: 3632,
        ValueB: 27088
    },
    {
        GSS_CODE: 'E09000008',
        ValueA: 21120,
        ValueB: 19423
    },
    {
        GSS_CODE: 'E09000009',
        ValueA: 14048,
        ValueB: 59659
    },
    {
        GSS_CODE: 'E09000010',
        ValueA: 45943,
        ValueB: 15721
    },
    {
        GSS_CODE: 'E09000011',
        ValueA: 33777,
        ValueB: 30161
    },
    {
        GSS_CODE: 'E09000012',
        ValueA: 48129,
        ValueB: 32871
    },
    {
        GSS_CODE: 'E09000013',
        ValueA: 36036,
        ValueB: 24103
    },
    {
        GSS_CODE: 'E09000014',
        ValueA: 52526,
        ValueB: 24755
    },
    {
        GSS_CODE: 'E09000015',
        ValueA: 19953,
        ValueB: 48787
    },
    {
        GSS_CODE: 'E09000016',
        ValueA: 53211,
        ValueB: 47463
    },
    {
        GSS_CODE: 'E09000017',
        ValueA: 36040,
        ValueB: 18622
    },
    {
        GSS_CODE: 'E09000018',
        ValueA: 38628,
        ValueB: 14235
    },
    {
        GSS_CODE: 'E09000019',
        ValueA: 38740,
        ValueB: 20562
    },
    {
        GSS_CODE: 'E09000020',
        ValueA: 14163,
        ValueB: 15442
    },
    {
        GSS_CODE: 'E09000021',
        ValueA: 45324,
        ValueB: 36443
    },
    {
        GSS_CODE: 'E09000022',
        ValueA: 53109,
        ValueB: 30060
    },
    {
        GSS_CODE: 'E09000023',
        ValueA: 43499,
        ValueB: 30773
    },
    {
        GSS_CODE: 'E09000024',
        ValueA: 43695,
        ValueB: 6289
    },
    {
        GSS_CODE: 'E09000025',
        ValueA: 2179,
        ValueB: 9070
    },
    {
        GSS_CODE: 'E09000026',
        ValueA: 7667,
        ValueB: 11745
    },
    {
        GSS_CODE: 'E09000027',
        ValueA: 14165,
        ValueB: 20077
    },
    {
        GSS_CODE: 'E09000028',
        ValueA: 35819,
        ValueB: 46497
    },
    {
        GSS_CODE: 'E09000029',
        ValueA: 36027,
        ValueB: 14337
    },
    {
        GSS_CODE: 'E09000030',
        ValueA: 2659,
        ValueB: 45078
    },
    {
        GSS_CODE: 'E09000031',
        ValueA: 20514,
        ValueB: 29346
    },
    {
        GSS_CODE: 'E09000032',
        ValueA: 6991,
        ValueB: 26556
    },
    {
        GSS_CODE: 'E09000033',
        ValueA: 27577,
        ValueB: 31378
    }
];
//# sourceMappingURL=utils.js.map