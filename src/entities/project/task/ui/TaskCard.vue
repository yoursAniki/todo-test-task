<template>
	<div class="task-card flex items-center justify-between gap-3 px-4 py-2">
		<input
			v-model="taskTemplate.title"
			placeholder="Название задачи"
			class="px-2 py-1"
			name="title"
			type="text"
		/>
		<select v-model="taskTemplate.status" name="status">
			<option v-for="status in TaskStatus" :key="status">{{ status }}</option>
		</select>

		<tag-list v-model="taskTemplate.tags" />

		<div class="flex flex-col gap-1">
			<span class="text-s"
				>Создано: {{ formatDate(taskTemplate.createdAt) }}</span
			>
			<span class="text-s"
				>Обновлено: {{ formatDate(taskTemplate.updatedAt) }}</span
			>
		</div>

		<trash @click="deleteTask" color="red" />
	</div>
</template>

<script lang="ts" setup>
// components
import TagList from "./TagList.vue";
import Trash from "../../../../shared/ui/icons/Trash.vue";

import { ref } from "vue";
import type { Task } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";
import { formatDate } from "../../../../shared/utils/formatDate";

const props = defineProps<{
	task: Task;
}>();

const emit = defineEmits(["delete-task"]);

const taskTemplate = ref<Task>({ ...props.task });

const deleteTask = () => emit("delete-task", props.task.id);
</script>

<style scoped lang="scss">
.task-card {
	border: 2px solid $black;

	border-top: none;
}
</style>
