<script setup lang="ts">
	import type { Project } from '~/types'
	type ProjectListProps = {
		projects: Project[]
	}
	const props = defineProps<ProjectListProps>()
</script>

<template>
	<article class="grid grid-rows-2 container mx-auto max-w-xl gap-6 xl:p-2 ">
		<aside  class="flex flex-col justify-around  w-full h-32 bg-warm-gray-50 p-2 rounded-sm" v-for="project in props.projects" >
			<h3 class="font-semibold text-2xl">{{ project.title }}</h3>
			<p class="truncate c-neutral-400">{{ project.description }}</p>
			<a class="self-end px-4 py-3 bg-fuchsia-600 rounded-lg c-neutral-50" :href="`home/projects/${project.id}`">Ver proyecto</a>
		</aside>
	</article>
</template>
