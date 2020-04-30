import { Expose } from 'src/decorators/expose';

export function Exclude(): PropertyDecorator {
	return Expose({
		toPlain: false,
		toClass: false,
	});
}
