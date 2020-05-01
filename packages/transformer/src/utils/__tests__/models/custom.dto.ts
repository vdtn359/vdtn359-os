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

	@Expose({
		type: Number,
		as: 'number',
	})
	private _number: number;

	set number(number) {
		this._number = number;
	}

	get number() {
		return this._number;
	}

	@Expose()
	inner: InnerDto;
}
