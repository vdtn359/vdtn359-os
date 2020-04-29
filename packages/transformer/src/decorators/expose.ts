export function Expose({ as }: { as?: string } = {}):
	| ClassDecorator
	| PropertyDecorator {
	return (target: Record<string, any>, property: string | symbol) => {
		if (!property) {
			// a class decorator, do nothing
			return;
		}
	};
}
