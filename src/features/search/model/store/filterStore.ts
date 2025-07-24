// features/filters/model/filtersStore.ts
import { defineStore } from "pinia";
import { loadAppData, saveAppData } from "../../../../shared/libs/localStorage";
import type { TaskStatus } from "../../../../shared/types/task.types";
import type { Filter } from "../types/filter.types";

export const useFiltersStore = defineStore("filters", {
	state: () =>
		({
			statuses: [] as TaskStatus[],
			tags: [] as string[],
			search: "",
		} as Filter),
	actions: {
		init() {
			const { filters } = loadAppData();
			this.statuses = filters.statuses || [];
			this.tags = filters.tags || [];
			this.search = filters.search || "";
		},
		save() {
			const appData = loadAppData();
			saveAppData({
				...appData,
				filters: {
					statuses: this.statuses,
					tags: this.tags,
					search: this.search,
				},
			});
		},
		setStatuses(statuses: TaskStatus[]) {
			this.statuses = statuses;
			this.save();
		},
		setTags(tags: string[]) {
			this.tags = tags;
			this.save();
		},
		setSearch(search: string) {
			this.search = search;
			this.save();
		},
		clear() {
			this.statuses = [];
			this.tags = [];
			this.search = "";
			this.save();
		},
	},
});
