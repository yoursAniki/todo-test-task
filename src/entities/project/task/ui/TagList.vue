<template>
	<div>
		<ul
			class="max-h-[80px] max-w-[250px] overflow-y-auto flex flex-wrap gap-0.5"
		>
			<li
				v-for="(tag, index) in internalValue"
				class="task-tag py-1 px-0.5 flex gap-1 items-center"
			>
				<span>{{ tag }}</span>
				<close-icon @click="removeTag(index)" color="white" />
			</li>
		</ul>
		<div class="flex flex-wrap mt-1 gap-1">
			<input
				v-model.trim="newTag"
				@keyup.enter="addTag(newTag)"
				placeholder="Добавить тег"
				class="max-w-[150px]"
				type="text"
				name="new-tag"
			/>
			<primary-button
				@click="addTag(newTag)"
				class="add-button max-w-[100px]"
				text="Добавить"
				:disabled="!newTag"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
// components
import { PrimaryButton } from "../../../../shared/ui/primary-button";
import CloseIcon from "../../../../shared/ui/icons/CloseIcon.vue";

import { computed, ref } from "vue";

const props = defineProps<{
	modelValue: string[];
}>();

const emit = defineEmits<{
	(event: "update:modelValue", value: string[]): void;
}>();

const internalValue = computed({
	get: () => props.modelValue,
	set: (val: string[]) => {
		emit("update:modelValue", val);
	},
});

const removeTag = (tagIndex: number) => {
	const newTags = [...internalValue.value];
	newTags.splice(tagIndex, 1);
	internalValue.value = newTags;
};

const newTag = ref("");

const addTag = (tag: string) => {
	if (!tag) return;

	const newTags = [...internalValue.value, tag];
	internalValue.value = newTags;
	newTag.value = "";
};
</script>

<style scoped lang="scss">
.task-tag {
	background-color: $black;
	color: $primary-color;
	border-radius: 3px;
}

.add-button {
	padding: 5px;
	font-size: 20px;
}
</style>
