# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Установка & запуск

1. `git clone 'ссылка на репозиторий'`
2. `cd 'название папки'`
3. `npm install`
4. `npm run dev`

## Отчёт о проделанной работе

1. Использовал архитектурную методологию FSD (Feature Sliced Design).
2. Реализовал корректно работающий поиск, фильтр, crud-функции для задач.
3. Данные хранятся в LocalStorage под ключём `todo_app_data`, взаимодействие с ними происходит через Pinia хранилища - `projects` и `filters`.
4. Импорт и экспорт работают корректно, ошибки ловят.
5. При запуске проекта прилетают предупреждения от scss об импортах, но правильной сборке и работе проекта это не мешает.
6. Минимальная адаптация под мобильные устройства.
