import { Expose } from 'src/decorators';
import { Inner } from 'src/utils/__tests__/models/custom';

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

export class InnerDto {
	@Expose()
	a: string;

	@Expose()
	c: string;
}
