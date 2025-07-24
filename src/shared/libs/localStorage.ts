const STORAGE_KEY = "todo_app_data";

export const loadAppData = () => {
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		return data
			? JSON.parse(data)
			: { projects: [], filters: { statuses: [], tags: [], search: "" } };
	} catch {
		return { projects: [], filters: { statuses: [], tags: [], search: "" } };
	}
};

export const saveAppData = (data: { projects: any[]; filters: any }) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
