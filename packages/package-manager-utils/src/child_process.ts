const childProcess = require('child_process');

export function execSync(command, options = {}) {
	// eslint-disable-next-line no-console
	console.info('Executing command', command);
	return childProcess.execSync(command, {
		...getDefaultOptions(),
		...options,
	});
}

function getDefaultOptions() {
	return {
		stdio: 'inherit',
		encoding: 'utf-8',
		shell: true,
	};
}
