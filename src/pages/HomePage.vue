<template>
	<section class="flex flex-col">
		<h1 class="mb-5">Мои проекты</h1>

		<project-list :projects="projects" />

		<div class="flex flex-col gap-3.5 items-center mt-5">
			<primary-button text="Импортировать" :disabled="!projects.length" />
			<primary-button text="Экспортировать" />
		</div>
	</section>
</template>

<script lang="ts" setup>
// components
import { PrimaryButton } from "../shared/ui/primary-button";
import { ProjectList } from "../features/project-list";

import { useProjectStore } from "../features/project-list/model/store/projectStore";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore();

const { projects } = storeToRefs(projectStore);
</script>

<style scoped lang="scss"></style>
