import 'reflect-metadata';
import { ExposeOptions, METADATA_KEY } from 'src/decorators';

export function getMetadata(target): Map<string, ExposeOptions> | undefined {
	return Reflect.getMetadata(METADATA_KEY, target);
}
