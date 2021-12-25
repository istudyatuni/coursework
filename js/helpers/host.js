export function isLocalhost() {
	const h = location.hostname
	const localhosts = ['0.', '127', '10.', '100', '192.168']
	return h === 'localhost' || localhosts.some((e) => h.startsWith(e))
}
