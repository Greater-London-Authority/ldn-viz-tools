import type { GeocoderAdapter, GeolocationNamed } from './GeocoderAdapter';

interface LocalCustodianCode {
	borough: string;
	code: number;
}

export const OS_LONDON_LOCAL_CUSTODIAN_CODES: LocalCustodianCode[] = [
	{
		borough: 'CITY OF LONDON',
		code: 5030
	},
	{
		borough: 'BARKING AND DAGENHAM',
		code: 5060
	},
	{
		borough: 'BARNET',
		code: 5090
	},
	{
		borough: 'BEXLEY',
		code: 5120
	},
	{
		borough: 'BRENT',
		code: 5150
	},
	{
		borough: 'LONDON BOROUGH OF BROMLEY',
		code: 5180
	},
	{
		borough: 'CAMDEN',
		code: 5210
	},
	{
		borough: 'CROYDON',
		code: 5240
	},
	{
		borough: 'EALING',
		code: 5270
	},
	{
		borough: 'ENFIELD',
		code: 5300
	},
	{
		borough: 'GREENWICH',
		code: 5330
	},
	{
		borough: 'HACKNEY',
		code: 5360
	},
	{
		borough: 'HAMMERSMITH AND FULHAM',
		code: 5390
	},
	{
		borough: 'LONDON BOROUGH OF HARINGEY',
		code: 5420
	},
	{
		borough: 'HARROW',
		code: 5450
	},
	{
		borough: 'HAVERING',
		code: 5480
	},
	{
		borough: 'HILLINGDO',
		code: 5510
	},
	{
		borough: 'LONDON BOROUGH OF HOUNSLOW',
		code: 5540
	},
	{
		borough: 'ISLINGTON',
		code: 5570
	},
	{
		borough: 'KENSINGTON AND CHELSEA',
		code: 5600
	},
	{
		borough: 'KINGSTON UPO',
		code: 5630
	},
	{
		borough: 'LAMBETH',
		code: 5660
	},
	{
		borough: 'LEWISHAM',
		code: 5690
	},
	{
		borough: 'MERTON',
		code: 5720
	},
	{
		borough: 'NEWHAM',
		code: 5750
	},
	{
		borough: 'REDBRIDGE',
		code: 5780
	},
	{
		borough: 'RICHMOND UPON THAMES',
		code: 5810
	},
	{
		borough: 'SOUTHWARK',
		code: 5840
	},
	{
		borough: 'SUTTON',
		code: 5870
	},
	{
		borough: 'TOWER HAMLETS',
		code: 5900
	},
	{
		borough: 'WALTHAM FOREST',
		code: 5930
	},
	{
		borough: 'WANDSWORTH',
		code: 5960
	},
	{
		borough: 'CITY OF WESTMINSTER',
		code: 5990
	}
];

interface DPAFeature {
	UPRN: string;
	ADDRESS: string;
	CENTER: [number, number];
	LNG: number;
	LAT: number;
	[otherOptions: string]: unknown;
}

interface OSPlacesResult {
	DPA: DPAFeature;
}

interface OSPlaces {
	results: OSPlacesResult[];
	[otherOptions: string]: unknown;
}

// This adapter provides address searching within a specified borough.
//
// Usage requires passing an API key and a LOCAL_CUSTODIAN_CODE which
// represents the borough or borough sized geographical area.
//
// Unfortunately, OS Places does not provide a way to query the whole of
// Greater London. Per request you can query the UK or a borough but not a
// geographical area in between (AFAIK).
export class GeocoderAdapterOSPlaces implements GeocoderAdapter {
	private _key: string = '';
	private _lcc: number = OS_LONDON_LOCAL_CUSTODIAN_CODES[0].code;
	private _resultCount: number = 5;

	constructor(key: string, localCustodianCode: number, resultCount = 5) {
		this._key = key;
		this._lcc = localCustodianCode;
		this._resultCount = resultCount;
	}

	// GeocoderAdapter functions.

	search(text: string) {
		const url = buildUrl(text, this._key, this._lcc, this._resultCount);
		return fetch(url)
			.then((res) => res.json())
			.then(transformResultsToGeolocationNameds);
	}

	attribution() {
		return {
			text: 'OS Places',
			link: 'https://osdatahub.os.uk/docs/places/overview'
		};
	}

	// GeocoderAdapterOSPlaces functions.

	setLocalCustodianCode(_lcc: number): GeocoderAdapterOSPlaces {
		this._lcc = _lcc;
		return this;
	}

	setResultCount(resultCount: number): GeocoderAdapterOSPlaces {
		this._resultCount = resultCount;
		return this;
	}
}

const buildUrl = (text: string, key: string, lcc: number, resultCount: number): string => {
	const queryString = new URLSearchParams({
		query: encodeURIComponent(text),
		key: key,
		output_srs: 'WGS84',
		format: 'JSON',
		maxresults: resultCount.toString(),
		fq: `LOCAL_CUSTODIAN_CODE:${lcc}`
	});

	return `https://api.os.uk/search/places/v1/find?${queryString}`;
};

const transformResultsToGeolocationNameds = (data: OSPlaces): GeolocationNamed[] => {
	if (!data.results) {
		return [];
	}

	return data.results.map((loc) => ({
		id: loc.DPA.UPRN,
		address: loc.DPA.ADDRESS,
		center: [loc.DPA.LNG, loc.DPA.LAT]
	}));
};

export default GeocoderAdapterOSPlaces;
