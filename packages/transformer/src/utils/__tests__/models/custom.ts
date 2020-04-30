import { Expose } from 'src/decorators';

export class Inner {
	@Expose()
	a: string;

	@Expose()
	b: string;
}

export class Custom {
	@Expose({
		as: 'alias',
	})
	name: string;

	@Expose()
	customName: string;

	@Expose()
	number: number;

	@Expose()
	inner: Inner;
}
