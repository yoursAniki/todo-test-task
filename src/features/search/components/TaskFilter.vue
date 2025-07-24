<template>
	<div class="filters-popup">
		<div>
			<div class="filter-title">Статусы</div>
			<label v-for="status in TaskStatus" :key="status" class="flex gap-1">
				<input v-model="selectedStatuses" type="checkbox" :value="status" />
				{{ status }}
			</label>
		</div>
		<div>
			<tag-list v-model="selectedTags" />
		</div>
		<primary-button @click="$emit('close')" class="mt-3"
			>Закрыть</primary-button
		>
	</div>
</template>

<script setup lang="ts">
// components
import TagList from "../../../entities/project/task/ui/TagList.vue";
import { PrimaryButton } from "../../../shared/ui/primary-button";

import { computed } from "vue";
import { useFiltersStore } from "../model/store/filterStore";
import { TaskStatus } from "../../../shared/types/task.types";

const filtersStore = useFiltersStore();

const selectedStatuses = computed({
	get: () => filtersStore.statuses,
	set: val => filtersStore.setStatuses(val),
});

const selectedTags = computed({
	get: () => filtersStore.tags,
	set: val => filtersStore.setTags(val),
});
</script>

<style scoped lang="scss">
.filters-popup {
	z-index: 50;
	position: absolute;
	top: 110%;
	right: 0;
	z-index: 10;
	background: $primary-color;
	border: 1px solid $dark-grey;
	border-radius: 8px;
	padding: 16px;
	min-width: 200px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

	.filter-title {
		font-weight: bold;
		margin-bottom: 4px;
	}
}
</style>
