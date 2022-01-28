export const getProfileDate = (date) => {
	const newDate = new Date(date);
	const year = newDate.getFullYear();
	const month = newDate.toLocaleDateString("default", { month: "long" });
	return `${month} ${year}`;
};

export const getPostDate = (date) => {
	const newDate = new Date(date);
	const day = newDate.getDate();
	const year = newDate.getFullYear();
	const month = newDate.toLocaleDateString("default", { month: "short" });
	return `${month} ${day} ${(new Date().getFullYear() !== year) ? `, ${year}` : ""}`;
};