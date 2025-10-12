export class CORSProxyService {
	constructor(private targetUrl: URL) {}

	get proxiedURL() {
		return new URL(`https://corsproxy.io/?url=${this.targetUrl}`)
	}
}
