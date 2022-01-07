export const getOriginalImage = (imageUrl) => {
	return imageUrl.replace(/_(normal|bigger|mini)/gi, "");
};