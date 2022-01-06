import milify from "millify";

export const short = (number) => milify(number, {
	precision: 1,
});