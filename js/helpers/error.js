/**
 * throw error and show function name and path
 * improved https://gist.github.com/irisli/716b6dacd3f151ce2b7e
 * @return {void}
 */
export function notImplemented () {
	let stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
	let match
	try {
		match = stackTrace.match(/at Object\.(\w+) \((\S+)\)/);
		match[1] // throw error if match is null
	} catch {
		// Firefox
		match = stackTrace.match(/\n(\w+)@(\S+)/)
	}
	let [callerName, callerPlace] = [match[1], match[2]]

	throw 'Function ' + callerName + ' at ' + callerPlace + ' is not implemented yet';
}

export function badCall(err = '') {
	let stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
	let match
	try {
		match = stackTrace.match(/at ((?!badCall)\S+) \((\S+)\)/);
		match[1] // throw error if match is null
	} catch {
		// Firefox
		match = stackTrace.match(/\n(\w+)@(\S+)/)
	}
	let [callerName, callerPlace] = [match[1], match[2]]

	throw 'Bad call of ' + callerName + ' at ' + callerPlace + ': ' + err;
}
