export function formatDateToLong(dateStr) {
	const [year, month, day] = dateStr.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	const daySuffix = d => {
		if (d >= 11 && d <= 13) return `${d}th`;
		switch (d % 10) {
			case 1:
				return `${d}st`;
			case 2:
				return `${d}nd`;
			case 3:
				return `${d}rd`;
			default:
				return `${d}th`;
		}
	};

	const monthName = date.toLocaleString('default', { month: 'long' });

	const dayOfWeek = getDayOfWeek(dateStr);

	return `${daySuffix(day)} ${monthName} ${year}, ${dayOfWeek}`;
}

function getDayOfWeek(dateStr) {
	const [day, month, year] = dateStr.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	const options = { weekday: 'long' }; // 'short' gives Mon/Tue/etc.
	return date.toLocaleDateString('en-US', options);
}
