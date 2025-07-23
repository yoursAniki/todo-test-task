<template>
	<div class="flex flex-col gap-3">
		<div v-for="project in projects">
			<project-card :project="project" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ProjectCard } from "../../../entities/project";

import type { Project } from "../../../shared/types/project.types";

const props = defineProps<{
	projects: Project[];
}>();
</script>

<style></style>
