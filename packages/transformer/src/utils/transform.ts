import { getMetadata } from 'src/utils/metadata';
import { ExposeOptions } from 'src/decorators';

export type TransformOptions = {
	ignoreDecorators?: boolean;
};

export enum TransformType {
	TO_PLAIN,
	PLAIN_TO_CLASS,
}

export function toPlain(
	object,
	constructor = getConstructorFromObject(object),
	transformOptions: TransformOptions = {}
) {
	if (!object || typeof object !== 'object') {
		return object;
	}
	if (Array.isArray(object)) {
		return object.map((element) =>
			toPlain(element, undefined, transformOptions)
		);
	}
	if (object instanceof Date) {
		return object.toJSON();
	}
	const metadata = getMetadata(constructor) || new Map();
	const result = {};
	for (const [key, value] of Object.entries(object)) {
		if (
			!shouldExpose({
				key,
				metadata,
				transformOptions,
				transformType: TransformType.TO_PLAIN,
			})
		) {
			continue;
		}
		const exposeOptions = metadata.get(key) || {};
		const as = exposeOptions.as || key;
		result[as] =
			value && typeof value === 'object'
				? toPlain(value, exposeOptions.type, transformOptions)
				: value;
	}
	return result;
}

export function plainToClass(
	plainObject,
	Class,
	transformOptions: TransformOptions = {}
): typeof Class {
	const metadata = getMetadata(getConstructorFromClass(Class)) || new Map();
	const result = Class.length ? new Class(plainObject) : new Class();
	for (const [key, exposeOptions] of metadata.entries()) {
		if (
			!shouldExpose({
				key,
				metadata,
				transformOptions,
				transformType: TransformType.PLAIN_TO_CLASS,
			})
		) {
			continue;
		}
		const as = exposeOptions.as || key;
		if (!result[key] && plainObject[as]) {
			const value = plainObject[as];
			result[key] =
				value && typeof value === 'object'
					? plainToClass(value, exposeOptions.type, transformOptions)
					: value;
		}
	}
	return result;
}

function shouldExpose({
	key,
	transformOptions,
	metadata,
	transformType,
}: {
	key: string;
	metadata: Map<string, ExposeOptions>;
	transformOptions: TransformOptions;
	transformType: TransformType;
}) {
	if (transformOptions.ignoreDecorators) {
		return true;
	}
	if (!metadata.has(key)) {
		return false;
	}

	const exposeOptions = metadata.get(key);
	if (
		transformType === TransformType.PLAIN_TO_CLASS &&
		!exposeOptions.toClass
	) {
		return false;
	}
	if (transformType === TransformType.TO_PLAIN && !exposeOptions.toPlain) {
		return false;
	}
	return true;
}

function getConstructorFromClass(object) {
	return object.prototype.constructor || object;
}

function getConstructorFromObject(object) {
	const prototype = Object.getPrototypeOf(object);
	return prototype.constructor;
}
