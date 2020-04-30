import { Expose } from 'src/decorators';

export class InnerDto {
	@Expose()
	a: string;

	@Expose()
	c: string;
}

export class CustomDto {
	@Expose({
		as: 'name',
	})
	alias: string;

	@Expose()
	customAlias: string;

	@Expose()
	number: number;

	@Expose()
	inner: InnerDto;
}
