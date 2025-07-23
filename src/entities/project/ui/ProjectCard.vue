<template>
	<div class="flex flex-col justify-center">
		<div class="border-2">{{ project.name }}</div>
		<div v-for="task in project.tasks">
			<task-card :task="task" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { TaskCard } from "../task";

import type { Project } from "../../../shared/types/project.types";

const props = defineProps<{
	project: Project;
}>();
</script>

<style></style>
