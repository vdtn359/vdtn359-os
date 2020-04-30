import { Expose } from 'src/decorators';

export class Book {
	constructor({ alias }) {
		this.name = alias;
		this.nameUpperCase = alias.toUpperCase();
	}
	@Expose({
		as: 'alias',
	})
	name: string;

	nameUpperCase: string;
}
