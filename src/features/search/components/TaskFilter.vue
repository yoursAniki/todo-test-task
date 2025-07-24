<template>
	<div class="filters-popup">
		<div>
			<div class="filter-title">Статусы</div>
			<label v-for="status in TaskStatus" :key="status">
				<input type="checkbox" :value="status" v-model="selectedStatuses" />
				{{ status }}
			</label>
		</div>
		<div>
			<tag-list v-model="selectedTags" />
		</div>
		<button @click="$emit('close')">Закрыть</button>
	</div>
</template>

<script setup lang="ts">
// components
import TagList from "../../../entities/project/task/ui/TagList.vue";

import { computed, ref, watch } from "vue";
import { useFiltersStore } from "../model/store/filterStore";
import { TaskStatus } from "../../../shared/types/task.types";

const filtersStore = useFiltersStore();

const selectedStatuses = computed({
  get: () => filtersStore.statuses,
  set: (val) => filtersStore.setStatuses(val),
});

const selectedTags = computed({
  get: () => filtersStore.tags,
  set: (val) => filtersStore.setTags(val),
});
</script>

<style scoped>
.filters-popup {
	position: absolute;
	top: 110%;
	right: 0;
	z-index: 10;
	background: #fff;
	border: 1px solid #aaa;
	border-radius: 8px;
	padding: 16px;
	min-width: 200px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.filter-title {
	font-weight: bold;
	margin-bottom: 4px;
}
</style>
