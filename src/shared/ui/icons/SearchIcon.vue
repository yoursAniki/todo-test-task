<template>
	<svg
		class="search-icon cursor-pointer select-none"
		width="119"
		height="119"
		viewBox="0 0 119 119"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M86.375 86.9305L108.5 109.056"
			:stroke="color"
			stroke-width="8.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M98.6667 54.9722C98.6667 30.5336 78.8555 10.7222 54.4167 10.7222C29.9782 10.7222 10.1667 30.5336 10.1667 54.9722C10.1667 79.411 29.9782 99.2222 54.4167 99.2222C78.8555 99.2222 98.6667 79.411 98.6667 54.9722Z"
			:stroke="color"
			stroke-width="8.5"
			stroke-linejoin="round"
		/>
	</svg>
</template>

<script lang="ts" setup>
const props = defineProps({
	color: {
		type: String,
		default: "black",
	},
});
</script>

<style scoped lang="scss">
.search-icon {
	.white {
		fill: $primary-color;
	}

	.black {
		fill: $black;
	}

	.red {
		fill: $reject-color;
	}
}
</style>
