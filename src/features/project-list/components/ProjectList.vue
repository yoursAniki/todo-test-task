<template>
	<div>
		<div class="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
			<div v-if="!projects.length" class="text-2xl">
				В настоящий момент проектов нет.
			</div>
			<div v-for="project in projects" :key="project.id">
				<project-card
					:project="project"
					@delete-project="store.deleteProject"
				/>
			</div>
		</div>
		<div class="flex justify-center gap-3">
			<primary-button @click="addProject" color="accept" class="mt-3"
				>Добавить проект</primary-button
			>
			<primary-button
				@click="store.deleteAllProjects"
				:disabled="!projects.length"
				color="reject"
				class="mt-3"
				>Удалить проекты</primary-button
			>
		</div>
	</div>
</template>

<script lang="ts" setup>
// components
import { ProjectCard } from "../../../entities/project";
import { PrimaryButton } from "../../../shared/ui/primary-button";

import type {
	Project,
	CreateProject,
} from "../../../shared/types/project.types";
import { useProjectStore } from "../model/store/projectStore";

const props = defineProps<{
	projects: Project[];
}>();

const store = useProjectStore();

const addProject = () => {
	const projectTemplate: CreateProject = { name: "", tasks: [] };

	store.addProject(structuredClone(projectTemplate));
};
</script>

<style></style>
