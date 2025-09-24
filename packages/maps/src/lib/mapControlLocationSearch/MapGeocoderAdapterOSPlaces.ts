import type { GeocoderAdapter, GeolocationNamed } from '@ldn-viz/ui';
import { GREATER_LONDON_BOUNDS_BNG_PADDED } from '../themes/bounds';

// LocalCustodianCode represents a mapping between a custodian code and its
// readable label.
export interface LocalCustodianCode {
	label: string;
	code: number;
}

// OS_LONDON_LOCAL_CUSTODIAN_CODES is an array of AddressBase custodian codes mapped to
// their "borough" name (label).
export const OS_LONDON_LOCAL_CUSTODIAN_CODES: LocalCustodianCode[] = [
	{
		label: 'CITY OF LONDON',
		code: 5030
	},
	{
		label: 'BARKING AND DAGENHAM',
		code: 5060
	},
	{
		label: 'BARNET',
		code: 5090
	},
	{
		label: 'BEXLEY',
		code: 5120
	},
	{
		label: 'BRENT',
		code: 5150
	},
	{
		label: 'LONDON BOROUGH OF BROMLEY',
		code: 5180
	},
	{
		label: 'CAMDEN',
		code: 5210
	},
	{
		label: 'CROYDON',
		code: 5240
	},
	{
		label: 'EALING',
		code: 5270
	},
	{
		label: 'ENFIELD',
		code: 5300
	},
	{
		label: 'GREENWICH',
		code: 5330
	},
	{
		label: 'HACKNEY',
		code: 5360
	},
	{
		label: 'HAMMERSMITH AND FULHAM',
		code: 5390
	},
	{
		label: 'LONDON BOROUGH OF HARINGEY',
		code: 5420
	},
	{
		label: 'HARROW',
		code: 5450
	},
	{
		label: 'HAVERING',
		code: 5480
	},
	{
		label: 'HILLINGDO',
		code: 5510
	},
	{
		label: 'LONDON BOROUGH OF HOUNSLOW',
		code: 5540
	},
	{
		label: 'ISLINGTON',
		code: 5570
	},
	{
		label: 'KENSINGTON AND CHELSEA',
		code: 5600
	},
	{
		label: 'KINGSTON UPO',
		code: 5630
	},
	{
		label: 'LAMBETH',
		code: 5660
	},
	{
		label: 'LEWISHAM',
		code: 5690
	},
	{
		label: 'MERTON',
		code: 5720
	},
	{
		label: 'NEWHAM',
		code: 5750
	},
	{
		label: 'REDBRIDGE',
		code: 5780
	},
	{
		label: 'RICHMOND UPON THAMES',
		code: 5810
	},
	{
		label: 'SOUTHWARK',
		code: 5840
	},
	{
		label: 'SUTTON',
		code: 5870
	},
	{
		label: 'TOWER HAMLETS',
		code: 5900
	},
	{
		label: 'WALTHAM FOREST',
		code: 5930
	},
	{
		label: 'WANDSWORTH',
		code: 5960
	},
	{
		label: 'CITY OF WESTMINSTER',
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

// GeocoderAdapterOSPlaces provides address searching within a specified
// borough using the OS places API.
//
// Usage requires passing an API key and a LOCAL_CUSTODIAN_CODE which
// represents the borough or borough sized geographical area.
//
// OS Places now provides a way to add a bounding box to the query url
export class MapGeocoderAdapterOSPlaces implements GeocoderAdapter {
	private _key: string = '';
	//private _lcc: number = -1;
	private _resultCount: number = 5;

	constructor(key: string, resultCount = 5) {
		this._key = key;
		//this.setLocalCustodianCode(localCustodianCode);
		this.setResultCount(resultCount);
	}

	// GeocoderAdapter functions.

	search(text: string) {
		const url = buildUrl(text, this._key, this._resultCount);
		return fetch(url)
			.then((res) => res.json())
			.then(transformResultsToGeolocationNameds);
	}

	retrieve(id: string) {}

	attribution() {
		return {
			text: 'OS Places',
			link: 'https://osdatahub.os.uk/docs/places/overview'
		};
	}

	// GeocoderAdapterOSPlaces functions.

	// setLocalCustodianCode(_lcc: number): MapGeocoderAdapterOSPlaces {
	// 	this._lcc = _lcc;
	// 	return this;
	// }

	setResultCount(resultCount: number): MapGeocoderAdapterOSPlaces {
		this._resultCount = resultCount;
		return this;
	}
}

const buildUrl = (text: string, key: string, resultCount: number): string => {
	const queryString = new URLSearchParams({
		query: encodeURIComponent(text),
		key: key,
		output_srs: 'WGS84',
		format: 'JSON',
		maxresults: resultCount.toString(),
		//fq: `LOCAL_CUSTODIAN_CODE:${lcc}`,
		bbox: GREATER_LONDON_BOUNDS_BNG_PADDED.flat().toString()
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
