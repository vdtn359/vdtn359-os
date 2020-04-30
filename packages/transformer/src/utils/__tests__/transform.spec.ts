import { User } from './models/user';
import { toClass, toPlain } from 'src/utils/transform';
import { Book } from 'src/utils/__tests__/models/book';

describe('toPlain', () => {
	it('convert date to string', () => {
		expect(toPlain(new Date(Date.UTC(2020, 3, 30, 0, 0, 0)))).toEqual(
			'2020-04-30T00:00:00.000Z'
		);
	});

	it('respect alias', () => {
		const book = new Book({
			alias: 'My Book',
		});
		expect(toPlain(book)).toEqual({
			alias: 'My Book',
		});
	});

	it('convert class to plain correctly', () => {
		const user = new User();
		user.firstName = 'Tuan';
		user.lastName = 'Nguyen';
		user.password = '123';
		user.friend = {
			lastName: 'World',
			password: '123',
			firstName: 'Hello',
		};
		expect(toPlain(user)).toEqual({
			firstName: 'Tuan',
			lastName: 'Nguyen',
			friend: {
				firstName: 'Hello',
				lastName: 'World',
			},
		});
	});
});

describe('toClass', () => {
	it('convert plain to class correctly', () => {
		const plainUser = {
			firstName: 'Tuan',
			lastName: 'Nguyen',
			password: '123',
			friend: {
				firstName: 'Hello',
				lastName: 'World',
				password: '123',
			},
		};
		const user = toClass(plainUser, User);
		expect(user).toBeInstanceOf(User);
		expect(user.friend).toBeInstanceOf(User);
		expect(JSON.stringify(user)).toEqual(JSON.stringify(plainUser));
	});

	it('respect alias', () => {
		const plainBook = {
			alias: 'My Book',
		};
		const book = toClass(plainBook, Book);
		expect(book).toBeInstanceOf(Book);
		expect(JSON.stringify(book)).toEqual(
			JSON.stringify({
				name: 'My Book',
				nameUpperCase: 'MY BOOK',
			})
		);
	});
});
