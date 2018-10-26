export default function() {
	this.namespace = 'api/v1';

	this.post('/querybrand', ({ bmbrand }, request) => {
		return bmbrand.all();
	});
}
