<template>
	<div class="task-card flex gap-3 px-4 py-2">
		<input v-model="taskTemplate.title" placeholder="Название задачи" name="title" type="text" />
		<select v-model="taskTemplate.status" name="status">
			<option v-for="status in TaskStatus">{{ status }}</option>
		</select>
		<tag-list v-model="taskTemplate.tags" />
	</div>
</template>

<script lang="ts" setup>
// components
import TagList from "./TagList.vue";

import { ref } from "vue";
import type { Task } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";

const props = defineProps<{
	task: Task;
}>();

const taskTemplate = ref<Task>({ ...props.task });
</script>

<style scoped lang="scss">
.task-card {
	border: 2px solid $black;

	border-top: none;
}
</style>
