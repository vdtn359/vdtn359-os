import 'reflect-metadata';
export const METADATA_KEY = '__TRANSFORMER_METADATA__';

export type ExposeOptions = {
	as?: string;
	type?: any;
	toClass?: boolean;
	toPlain?: boolean;
};

export function ExposeAll(): ClassDecorator {
	return (target) => {
		return target;
	};
}

const defaultOptions: ExposeOptions = {
	toClass: true,
	toPlain: true,
};

export function Expose(options: ExposeOptions = {}): PropertyDecorator {
	options = { ...defaultOptions, ...options };
	return (target: Record<string, any>, property: string | symbol) => {
		if (typeof property != 'string') {
			return;
		}
		const metadataTarget = target.constructor || target;
		if (!Reflect.hasOwnMetadata(METADATA_KEY, metadataTarget)) {
			Reflect.defineMetadata(
				METADATA_KEY,
				new Map<string, ExposeOptions>(),
				metadataTarget
			);
		}
		const metadata: Map<string, ExposeOptions> = Reflect.getMetadata(
			METADATA_KEY,
			metadataTarget
		);
		metadata.set(property, {
			...options,
			type:
				options.type ||
				Reflect.getMetadata('design:type', target, property),
		});
		Reflect.defineMetadata(METADATA_KEY, metadata, metadataTarget);
	};
}

export function Exclude(): PropertyDecorator {
	return (target: Record<string, any>, property: string | symbol) => {
		if (typeof property != 'string') {
			return;
		}
		const metadataTarget = target.constructor || target;
		const metadata: Map<string, ExposeOptions> = Reflect.getMetadata(
			METADATA_KEY,
			metadataTarget
		);
		if (!metadata || !metadata.has(property)) {
			return;
		}
		metadata.delete(property);
	};
}
