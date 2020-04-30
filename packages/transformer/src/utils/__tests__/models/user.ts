import { Expose, ExposeAll } from 'src/decorators/expose';
import { Exclude } from 'src/decorators/exclude';

@ExposeAll()
export class User {
	@Expose()
	firstName: string;

	@Expose()
	lastName: string;

	@Expose()
	city?: string;

	@Expose({
		toPlain: false,
	})
	password?: string;

	@Expose()
	dob?: Date;

	@Expose({
		type: User,
	})
	friends?: User[];

	@Expose()
	manager?: User;

	@Expose({
		groups: ['secret'],
	})
	secret?: string;

	@Exclude({
		groups: ['secret'],
	})
	exclude?: string;

	@Expose({
		groups: ['excludeIf'],
		excludeIf: (key, value) => value === 1,
	})
	excludeIf?: number;
}
