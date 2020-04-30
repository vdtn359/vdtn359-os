import { Expose, ExposeAll } from 'src/decorators/expose';

@ExposeAll()
export class User {
	@Expose()
	firstName: string;

	@Expose()
	lastName: string;

	@Expose({
		toPlain: false,
	})
	password: string;

	@Expose()
	dob?: Date;

	@Expose()
	friend?: User;
}
