<template>
	<section class="flex flex-col">
		<h1 class="mb-5">Мои проекты</h1>

		<search-input v-model="search" placeholder="Поиск" />

		<project-list :projects="filteredProjects" />

		<div class="flex flex-col gap-7 items-center mt-15">
			<import-panel />
			<export-panel />
		</div>
	</section>
</template>

<script lang="ts" setup>
// components
import { SearchInput } from "../features/search";
import {
	ProjectList,
	ExportPanel,
	ImportPanel,
} from "../features/project-list";

import { useProjectStore } from "../features/project-list/model/store/projectStore";
import { useFiltersStore } from "../features/search/model/store/filterStore";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { filterProjectsWithTasks } from "../shared/libs/filterTasks";

const projectStore = useProjectStore();
const filterStore = useFiltersStore();

projectStore.init();
filterStore.init();

const { projects } = storeToRefs(projectStore);

const search = ref(filterStore.search);
watch(search, val => filterStore.setSearch(val));

const filteredProjects = computed(() =>
	filterProjectsWithTasks(
		projects.value,
		filterStore.statuses,
		filterStore.tags,
		filterStore.search
	)
);
</script>

<style scoped lang="scss"></style>
