<template>
	<div class="flex flex-wrap justify-center gap-3 items-center">
		<input
			v-model="key"
			type="password"
			placeholder="Ключ для расшифровки"
			class="import-input py-3 px-6"
		/>
		<div
			class="cursor-pointer relative border-2 border-dashed py-3 px-3 flex items-center gap-2 z-10"
		>
			<div>{{ fileName || "Выберите файл" }}</div>
			<input
				ref="fileInput"
				@change="onFileChange"
				class="absolute top-0 left-0 w-full h-full opacity-0"
				type="file"
				name="file-import"
				accept=".aes"
			/>
			<close-icon v-if="fileContent" @click="closeFile" class="z-20" />
		</div>

		<primary-button @click="importData">Импортировать</primary-button>
	</div>
</template>

<script setup lang="ts">
// components
import { PrimaryButton } from "../../../shared/ui/primary-button";
import CloseIcon from "../../../shared/ui/icons/CloseIcon.vue";

import { ref } from "vue";
import { useProjectStore } from "../model/store/projectStore";
import { decryptAES } from "../../../shared/libs/crypto";
import type { Project } from "../../../shared/types/project.types";

const projectStore = useProjectStore();

const key = ref("");
const fileContent = ref<string | null>(null);
const fileName = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const closeFile = () => {
	if (!fileInput.value) return;

	fileInput.value.value = "";
	fileContent.value = null;
	fileName.value = "";
};

const onFileChange = (e: Event) => {
	const file = (e.target as HTMLInputElement).files?.[0];

	if (!file) return;

	fileName.value = file.name;

	const reader = new FileReader();
	reader.onload = () => {
		fileContent.value = reader.result as string;
	};

	reader.readAsText(file);
};

const importData = () => {
	if (!key.value || !fileContent.value) {
		alert("Заполните все поля!");
		return;
	}

	const data = decryptAES(fileContent.value, key.value);

	if (!data) {
		alert("Неверный ключ или файл повреждён!");
		return;
	}

	projectStore.importData(data as { projects: Project[] });
	alert("Импорт успешно завершён!");
};
</script>

<style scoped lang="scss">
.import-input {
	border: 2px solid $black;
	border-radius: 10px;
}
</style>
