<template>
	<svg
		class="close-icon cursor-pointer select-none"
		width="12"
		height="12"
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.773 2.28769L2.28777 10.773C1.99785 11.0629 1.51702 11.0629 1.22711 10.773C0.937194 10.4831 0.937194 10.0022 1.22711 9.71232L9.71239 1.22703C10.0023 0.93712 10.4831 0.93712 10.773 1.22703C11.063 1.51695 11.063 1.99778 10.773 2.28769Z"
			:fill="color"
			fill-opacity="0.87"
		/>
		<path
			d="M10.773 10.773C10.4831 11.0629 10.0023 11.0629 9.71239 10.773L1.22711 2.2877C0.937194 1.99779 0.937194 1.51695 1.22711 1.22704C1.51702 0.937126 1.99785 0.937126 2.28777 1.22704L10.773 9.71232C11.063 10.0022 11.063 10.4831 10.773 10.773Z"
			:fill="color"
			fill-opacity="0.87"
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
.close-icon {
	.white {
		fill: $primary-color;
	}

	.black {
		fill: $black;
	}
}
</style>
