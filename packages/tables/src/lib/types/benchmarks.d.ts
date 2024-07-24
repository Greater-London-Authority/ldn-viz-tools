export interface ComparedBenchmark {
	raw: number;
	goodIs: 'high' | 'low' | 'n/a';
	value: number;
	good: 'good' | 'bad' | 'equal' | 'n/a';
	vs: 'above' | 'below';
}
