<template>
	<div class="flex gap-3 border-2 px-1 py-2">
		<input v-model="taskTemplate.title" name="title" type="text" />
		<select
			v-model="taskTemplate.status"
			name="status"
		>
			<option v-for="status in TaskStatus">{{ status }}</option>
		</select>
		<!-- <div>
			<ul class="max-h-[80px] max-w-[100px] overflow-y-scroll flex flex-wrap">
				<li v-for="tag in taskTemplate.tags">{{ tag }}</li>
			</ul>
      <input class="max-w-[100px]" type="text">
		</div> -->
    <tag-list v-model="taskTemplate.tags" />
	</div>
</template>

<script lang="ts" setup>
import TagList from "./TagList.vue";

import { ref } from "vue";
import type { Task } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";

const props = defineProps<{
	task: Task;
}>();

const taskTemplate = ref<Task>({ ...props.task });
</script>

<style></style>
