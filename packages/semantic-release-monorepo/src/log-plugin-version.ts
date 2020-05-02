import { resolve } from 'path';
import readPkg from 'read-pkg';
import debug0 from 'debug';

const debug = debug0('semantic-release:monorepo');

const logPluginVersion = (type) => (plugin) => async (pluginConfig, config) => {
	if (config.options.debug) {
		const { version } = await readPkg(resolve(__dirname, '../'));
		debug('Running %o version %o', type, version);
	}

	return plugin(pluginConfig, config);
};

export default logPluginVersion;
