<template>
	<button
		@click.stop="$emit('click')"
		class="primary-button"
		:class="computeColor"
		:style="computeRounded"
		v-bind="$attrs"
	>
		<slot v-if="text" name="text-content">{{ text }}</slot>

		<slot v-else></slot>
	</button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
	text: String,
	color: {
		type: String,
		default: "main",
	},
	rounded: {
		type: Number,
		default: 10,
	},
});

defineEmits(["click"]);

const computeColor = computed(() => {
	return `btn-${props.color}`;
});

const computeRounded = computed(() => {
	return {
		"border-radius": `${props.rounded}px`,
	};
});
</script>

<style scoped lang="scss">
.primary-button {
	cursor: pointer;
	font-size: 23px;
	color: $primary-color;
	padding: 5px 29px;
	user-select: none;

	transition: all 0.1s ease-in-out;

	&:not(:disabled):active {
		transform: translateY(1px);
		filter: brightness(90%);
	}

	&:disabled {
		background: $grey;
		cursor: default;
	}

	@media (max-width: 768px) {
		font-size: 18px;
	}

	@media (max-width: 425px) {
		font-size: 16px;
	}
}

.btn-main {
	background: $black;
}

.btn-secondary {
}

.btn-accept {
	background: $accept-color;
}
</style>
