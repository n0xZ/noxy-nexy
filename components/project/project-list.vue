<script setup lang="ts">
	import type { Project } from '~/types'
	type ProjectListProps = {
		projects: Project[]
	}
	const props = defineProps<ProjectListProps>()
</script>

<template>
	<article class="grid grid-rows-3 container mx-auto max-w-xl gap-6">
		<aside v-for="project in props.projects">
			<p>{{ project.title }}</p>
		</aside>
	</article>
</template>
