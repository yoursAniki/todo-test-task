<template>
	<div class="input-container">
		<search-icon class="absolute top-1/2 left-4 -translate-y-1/2 h-6 w-6" />
		<input
			class="search-input"
			v-model="internalValue"
			:type="type"
			v-bind="$attrs"
		/>
		<filter-icon
			class="absolute top-1/2 right-4 -translate-y-1/2 h-6 w-6"
			@click="showFilters = !showFilters"
		/>
		<task-filter
			v-if="showFilters"
			class="absolute right-0 top-full"
			@close="showFilters = false"
		/>
	</div>
</template>

<script lang="ts" setup>
// components
import FilterIcon from "../../../shared/ui/icons/FilterIcon.vue";
import SearchIcon from "../../../shared/ui/icons/SearchIcon.vue";
import TaskFilter from "./TaskFilter.vue";

import { computed, ref, type PropType } from "vue";

const props = defineProps({
	type: {
		type: String,
		default: "text",
	},
	modelValue: {
		type: [String, Boolean] as PropType<string | boolean>,
		required: true,
	},
});

const emit = defineEmits<{
	(event: "update:modelValue", value: string | boolean): void;
}>();

const internalValue = computed({
	get: () => props.modelValue,
	set: val => {
		emit("update:modelValue", val);
	},
});

const showFilters = ref(false);
</script>

<style scoped lang="scss">
.input-container {
	position: relative;
	margin: 6px 0;
	margin-bottom: 20px;

	.search-input {
		border: 2px solid $black;
		font-size: 24px;

		padding: 12px 5px 12px 50px;
		width: 100%;
		background: transparent;
		position: relative;
	}
}
</style>
