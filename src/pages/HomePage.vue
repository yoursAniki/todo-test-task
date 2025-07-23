<template>
	<section class="flex flex-col">
		<project-list :projects="projects" />

		<div class="flex flex-col gap-3.5 items-center">
			<primary-button text="Импортировать" />
			<primary-button text="Экспортировать" />
		</div>
	</section>
</template>

<script lang="ts" setup>
import { PrimaryButton } from "../shared/ui/primary-button";
import { ProjectList } from "../features/project-list";
import type { Project } from "../shared/types/project.types";
import { ref } from "vue";

const projects = ref<Project[]>([
	{
		id: "1",
		name: "Project 1",
		tasks: [
			{
				id: "1",
				title: "Task 1",
				status: "todo",
				tags: [
					"tag 1",
					"tag 2",
					"tag 3",
					"tag 4",
					"tag 5",
					"tag 6",
					"tag 1",
					"tag 2",
					"tag 3",
					"tag 4",
					"tag 5",
					"tag 6",
				],
				subtasks: [],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "2",
				title: "Task 2",
				status: "todo",
				tags: ["tag 1", "tag 2"],
				subtasks: [],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	},
	{
		id: "2",
		name: "Project 2",
		tasks: [
			{
				id: "1",
				title: "Task 1",
				status: "todo",
				tags: ["tag 1", "tag 2"],
				subtasks: [],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	},
]);
</script>

<style scoped lang="scss"></style>
