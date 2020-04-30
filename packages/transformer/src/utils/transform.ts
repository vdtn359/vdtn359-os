import { getMetadata } from 'src/utils/metadata';

export function toPlain(
	object,
	constructor = getConstructorFromObject(object)
) {
	if (!object || typeof object !== 'object') {
		return object;
	}
	if (Array.isArray(object)) {
		return object.map((element) => toPlain(element));
	}
	if (object instanceof Date) {
		return object.toJSON();
	}
	const metadata = getMetadata(constructor);
	if (!metadata) {
		return object;
	}
	const result = {};
	for (const [key, value] of Object.entries(object)) {
		if (!metadata.has(key)) {
			continue;
		}
		const exposeOptions = metadata.get(key);
		if (!exposeOptions.toPlain) {
			continue;
		}
		const as = exposeOptions.as || key;
		result[as] =
			value && typeof value === 'object'
				? toPlain(value, exposeOptions.type)
				: value;
	}
	return result;
}

export function toClass(plainObject, Class): typeof Class {
	const metadata = getMetadata(getConstructorFromClass(Class));
	if (!metadata) {
		return plainObject;
	}
	const result = Class.length ? new Class(plainObject) : new Class();
	for (const [key, exposeOptions] of metadata.entries()) {
		const as = exposeOptions.as || key;
		if (!result[key] && plainObject[as]) {
			const value = plainObject[as];
			result[key] =
				value && typeof value === 'object'
					? toClass(value, exposeOptions.type)
					: value;
		}
	}
	return result;
}

function getConstructorFromClass(object) {
	return object.prototype.constructor || object;
}

function getConstructorFromObject(object) {
	const prototype = Object.getPrototypeOf(object);
	return prototype.constructor;
}
