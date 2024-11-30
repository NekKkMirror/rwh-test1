export const asString = (value, maxLength) => {
	if (!value) return '';
	return value.toString().substring(0, maxLength);
}