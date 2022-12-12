<script setup lang="ts">
	import type { Project } from '~/types'
	type ProjectListProps = {
		projects: Project[]
		removeProject: (project:Project) => void
	}
	const props = defineProps<ProjectListProps>()
</script>

<template>
	<article class="flex flex-col justify-center space-y-5 container mx-auto max-w-2xl  xl:p-2 h-full w-full">
		<project-item
			v-for="project in props.projects"
			:project="project"
			:remove-project="props.removeProject"
			:key="project.id"
		/>
	</article>
</template>
