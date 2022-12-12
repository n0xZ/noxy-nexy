<script setup lang="ts">
	import type { Project } from '~/types'
	type ProjectItemProps = {
		project: Project
		removeProject: (project: Project) => void
	}
	const props = defineProps<ProjectItemProps>()
</script>

<template>
	<aside
		class="flex flex-col justify-around w-full min-h-40 h-full bg-warm-gray-50 p-2 rounded-sm"
	>
		<span class="flex flex-row items-center justify-between">
			<h3 class="font-semibold xl:text-2xl text-xl">{{ props.project.title }}</h3>
		</span>
		<p class="truncate c-neutral-500 xl:text-md text-sm">
			{{ props.project.description }}
		</p>
		<div class="flex flex-row justify-end items-center space-x-5">
			<a
				class="self-end px-2 py-2 bg-fuchsia-600 rounded-lg c-neutral-50"
				:href="`home/projects/${project.id}`"
				>Ver proyecto
			</a>

			<button
				class="flex flex-row items-center space-x-3 px-2 py-2 bg-fuchsia-600 rounded-lg c-neutral-50"
				@click="props.removeProject(props.project)"
			>
				<div class="i-carbon-task-remove h-6 w-6"></div>
				<span>Eliminar </span>
			</button>
		</div>
	</aside>
</template>
