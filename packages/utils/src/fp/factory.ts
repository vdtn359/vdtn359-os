export const curry = (fn) =>
	fn.length === 0 ? fn() : (...pp) => curry(fn.bind(null, ...pp));
