# Task Manager

# Домашнее задание №1
## Ссылка
https://task-manager-10amm5sn6-sashas-projects-1e06fa40.vercel.app/
## Возможности
- Создание, редактирование и просмотр задач
- Фильтрация задач по статусу, категории и приоритету
- Адаптивный дизайн с использованием Material UI
- Переключение светлой и тёмной темы
- Клиентская маршрутизация с React Router

## Начало работы

### Требования
- Node.js (версия 16 или выше)
- npm (версия 7 или выше)

### Установка
1. Клонируйте репозиторий:
```bash
git clone https://github.com/mcalexandretion/task-manager.git
cd task-manager
```
2. Установите зависимости:
  ```bash
  npm install
  ```
3. Запуск приложения
Запустите сервер разработки:
  ```bash
  npm run dev
  ```
Откройте браузер и перейдите по адресу http://localhost:5173

### Технологии
React, TypeScript, Material UI, React Router, CSS Modules, Vite

### Структура проекта
- src/components/: Компоненты React (TaskList.tsx, TaskDetails.tsx, TaskItem.tsx)
- src/context/: Контекст React для управления задачами и темами
- src/styles/: CSS Modules для стилей компонентов
- src/types/: Определения типов TypeScript
- src/routes/: Конфигурация маршрутов
