<template>
	<div
		class="flex flex-col"
		:class="computeStatusColor"
		:style="{ marginLeft: `${props.depth * 24}px` }"
	>
		<div class="task-card flex flex-col">
			<div
				class="flex flex-wrap items-center md:justify-between justify-center gap-3 sm:px-4 sm:py-2 p-1"
			>
				<span>{{ index + 1 }}</span>
				<input
					v-model="taskData.title"
					placeholder="Название задачи"
					class="px-2 py-1"
					name="title"
					type="text"
				/>
				<select v-model="taskData.status" name="status">
					<option v-for="status in TaskStatus" :key="status">
						{{ status }}
					</option>
				</select>

				<tag-list v-model="taskData.tags" />

				<div class="flex flex-col gap-1">
					<span class="text-s"
						>Создано: {{ formatDate(props.task.createdAt) }}</span
					>
					<span class="text-s"
						>Обновлено: {{ formatDate(props.task.updatedAt) }}</span
					>
				</div>

				<trash @click="deleteTask" color="red" />
			</div>

			<div
				v-if="isDataChanged"
				class="flex flex-wrap justify-center gap-3 pb-2"
			>
				<primary-button
					@click="saveTask"
					text="Сохранить"
					class="save-button"
					color="accept"
				/>

				<primary-button @click="resetTask" text="Отмена" color="reject" />
			</div>
			<task-card
				v-for="(subtask, index) in task.subtasks"
				:task="subtask"
				:index="index"
				:depth="(props.depth ?? 0) + 1"
				@delete-subtask="deleteSubtask"
				@update-subtask="updateSubtask"
			/>
		</div>
		<div
			@click="addSubtask"
			class="subtask-card flex items-center gap-3 border-2 border-dashed border-t-0 border-gray-400 px-2 py-1 cursor-pointer select-none"
		>
			<close color="black" class="rotate-45" />
			<span class="text-gray-400">Добавить подзадачу</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
// components
import TagList from "./TagList.vue";
import { PrimaryButton } from "../../../../shared/ui/primary-button";
import Close from "../../../../shared/ui/icons/Close.vue";
import Trash from "../../../../shared/ui/icons/Trash.vue";

import { computed, inject, ref, watch } from "vue";
import type { Task } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";
import { formatDate } from "../../../../shared/utils/formatDate";
import { useProjectStore } from "../../../../features/project-list/model/store/projectStore";

const props = defineProps<{
	task: Task;
	index: number;
	depth: number;
}>();

const emit = defineEmits([
	"delete-task",
	"update-task",
	"delete-subtask",
	"update-subtask",
]);

const store = useProjectStore();

const deleteTask = () => {
	emit("delete-subtask", props.task.id);
	emit("delete-task", props.task.id);
};

const computeStatusColor = computed(() => {
	if (taskData.value.status === TaskStatus.Todo) return "status-todo";
	if (taskData.value.status === TaskStatus.InProgress)
		return "status-in-progress";
	if (taskData.value.status === TaskStatus.Done) return "status-done";
});

const taskTemplate = {
	id: props.task.id,
	title: "",
	status: TaskStatus.Todo,
	tags: [],
	subtasks: JSON.parse(JSON.stringify(props.task.subtasks)) ?? [],
	createdAt: props.task.createdAt,
	updatedAt: props.task.updatedAt,
};

const isDataChanged = computed(() => {
	return !(
		taskData.value.title === props.task.title &&
		taskData.value.status === props.task.status &&
		JSON.stringify(taskData.value.tags) === JSON.stringify(props.task.tags)
	);
});

const taskData = ref<Task>(JSON.parse(JSON.stringify(taskTemplate)));

watch(
	() => props.task,
	newTask => {
		taskData.value = JSON.parse(JSON.stringify(newTask));
	},
	{ deep: true, immediate: true }
);

// if (isDataChanged.value)
// 	taskData.value = JSON.parse(JSON.stringify(props.task));

const saveTask = () => {
	emit("update-subtask", taskData.value);
	emit("update-task", taskData.value);
};
const resetTask = () => {
	taskData.value = JSON.parse(JSON.stringify(props.task));
};

const projectId = inject<string>("projectId");

const addSubtask = () => {
	if (!projectId) return;

	store.addSubtaskToTask(projectId, props.task.id, taskTemplate);
};

const deleteSubtask = (subTaskId: string) => {
	if (!projectId) return;

	store.deleteSubtaskFromProject(projectId, subTaskId);
};

const updateSubtask = (subTask: Task) => {
	if (!projectId) return;
	store.updateSubtaskInProject(projectId, subTask);
};
</script>

<style scoped lang="scss">
.task-card {
	border: 2px solid $black;
}

// todo доделать стили для статусов

// .status-todo {
// }

// .status-in-progress {
// 	background: $yellow;
// }

// .status-done {
// 	background: $accept-color;

// 	.save-button {
// 		background: $black;
// 	}
// }
</style>
