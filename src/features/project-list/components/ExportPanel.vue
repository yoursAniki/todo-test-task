<template>
	<div class="flex flex-wrap items-center justify-center gap-3">
		<input
			v-model="key"
			type="password"
			:disabled="!projectStore.projects.length"
			placeholder="Ключ для шифрования"
			class="export-input py-3 px-6"
		/>
		<primary-button
			@click="exportData"
			:disabled="!projectStore.projects.length"
			>Экспортировать</primary-button
		>
	</div>
</template>

<script setup lang="ts">
import { PrimaryButton } from "../../../shared/ui/primary-button";

import { ref } from "vue";
import { useProjectStore } from "../model/store/projectStore";
import { encryptAES } from "../../../shared/libs/crypto";

const key = ref("");
const projectStore = useProjectStore();

const exportData = () => {
	if (!key.value) {
		alert("Введите ключ!");
		return;
	}
	const data = projectStore.exportData();
	const token = encryptAES(data, key.value);

	const blob = new Blob([token], { type: "text/plain" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = "projects.aes";
	a.click();

	URL.revokeObjectURL(url);
};
</script>

<style scoped lang="scss">
.export-input {
	border: 2px solid $black;
	border-radius: 10px;

	&:disabled {
		opacity: 0.5;
	}
}
</style>
