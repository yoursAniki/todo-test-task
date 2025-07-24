<template>
	<section class="flex flex-col">
		<h1 class="mb-5">Мои проекты</h1>

		<search-input v-model="search" placeholder="Поиск" />

		<project-list :projects="filteredProjects" />

		<div class="flex flex-col gap-3.5 items-center mt-5">
			<primary-button text="Импортировать" :disabled="!projects.length" />
			<primary-button text="Экспортировать" />
		</div>
	</section>
</template>

<script lang="ts" setup>
// components
import { SearchInput } from "../features/search";
import { PrimaryButton } from "../shared/ui/primary-button";
import { ProjectList } from "../features/project-list";

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
