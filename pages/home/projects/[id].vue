<script setup lang="ts">
	import { PostgrestResponse } from '@supabase/supabase-js'
	import { marked } from 'marked'
	import { Project } from '~~/types'

	type EditProjectFields = {
		title?: string
		description?: string
		markdown?: string
	}
	const route = useRoute()
	const client = useSupabaseClient<Project>

	const canEditProject = ref(false)
	const { data: project, pending } = await useAsyncData(
		'projectById',
		async () => {
			const { data } = (await client()
				.from('project')
				.select('*')
				.eq('id', route.params.id)) as PostgrestResponse<Project>

			return data
		}
	)
	const projectModels = ref<EditProjectFields>({
		title: project.value?.[0].title,
		description: project.value?.[0].description,
		markdown: project.value?.[0].markdown,
	})
	useHead({
		title: `Nexy - ${!pending.value ? project.value?.[0].title : 'Cargando...'}`,
	})
	const toggleEdit = () => {
		canEditProject.value = !canEditProject.value
	}
</script>

<template>
	<form
		class="flex flex-col justify-center space-y-5 container mx-auto max-w-xl h-full xl:p-0 p-2"
		v-if="project && !pending"
	>
		<aside
			class="flex flex-rol justify-center items-center space-x-4 w-full mb-3"
		>
			<input
				:class="`px-5 py-4 rounded-lg outline-none text-2xl w-full ${
					canEditProject ? 'bg-sky-50' : 'bg-transparent font-bold text-center '
				}`"
				type="text"
				name="title"
				placeholder="Jane Doe's first project"
				v-model="projectModels.title"
			/>

			<div
				class="i-carbon-task-settings h-6 w-6 hover:c-fuchsia-400 duration-100 ease-in-out cursor-pointer"
				@click="toggleEdit"
			></div>
		</aside>

		<input
			:class="`px-3 py-4 rounded-lg outline-none ${
				canEditProject && 'bg-sky-50'
			} c-neutral-400`"
			:value="project?.[0].description"
		/>

		<div
			class="min-h-64 h-full w-full rounded-lg outline-none text-base prose prose-fuchsia"
			v-if="!canEditProject"
			v-html="marked.parse(project?.[0].markdown)"
		></div>
		<textarea
			v-else-if="project?.[0].markdown"
			class="min-h-64 h-full w-full rounded-lg outline-none text-base prose prose-fuchsia bg-sky-50"
			v-model="projectModels.markdown"
		></textarea>
	</form>
	<section v-else-if="pending"><p>Cargando...</p></section>
</template>
