<template>
	<svg
		class="filter-icon cursor-pointer select-none"
		width="98"
		height="98"
		viewBox="0 0 98 98"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M33.8826 51.3772C21.6477 42.2298 12.9286 32.1681 8.1678 26.5115C6.69408 24.7605 6.21116 23.4791 5.92084 21.2218C4.92659 13.4928 4.42951 9.62835 6.6958 7.13363C8.96214 4.63892 12.9699 4.63892 20.9855 4.63892H77.6814C85.697 4.63892 89.7046 4.63892 91.9707 7.13363C94.2373 9.62835 93.7402 13.4928 92.7461 21.2219C92.4555 23.4791 91.9727 24.7606 90.4987 26.5115C85.7315 32.1753 76.995 42.2549 64.7353 51.4136C63.6261 52.2426 62.895 53.5927 62.7593 55.0908C61.5449 68.5163 60.4249 75.8696 59.7277 79.5896C58.6028 85.5953 50.0866 89.2085 45.5279 92.4324C42.8144 94.3514 39.5212 92.0671 39.1695 89.0964C38.4992 83.4339 37.2365 71.9304 35.8581 55.0908C35.7343 53.5789 35.0006 52.2131 33.8826 51.3772Z"
			:stroke="color"
			stroke-width="8.5"
			stroke-linecap="round"
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
.filter-icon {
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
