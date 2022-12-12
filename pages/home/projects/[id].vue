<script setup lang="ts">
	import { PostgrestResponse } from '@supabase/supabase-js'
	import { marked } from 'marked'
	import { Project } from '~~/types'

	type EditProjectFields = {
		title?: string
		description?: string
		markdown?: string
	}
	definePageMeta({ middleware: ['protected-content'] })
	const route = useRoute()
	const client = useSupabaseClient<Project>

	const canEditProject = ref(false)
	const isEditing = ref(false)
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
	const editProject = async () => {
		isEditing.value = true
		const { data, error } = (await client()
			.from('project')
			.update(projectModels.value)
			.eq('id', route.params.id)) as PostgrestResponse<Project>
		if (error) throw error
		isEditing.value = false
		canEditProject.value = false
	}
</script>

<template>
	<form
		class="flex flex-col justify-center space-y-3 container mx-auto max-w-2xl h-full xl:p-0 p-2 prose prose-fuchsia"
		v-if="project && !pending"
		@submit.prevent="editProject"
	>
		<aside
			class="flex flex-rol justify-center items-center space-x-2 max-w-2xl w-full mb-3"
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
				class="i-carbon-task-settings h-7 w-7 hover:c-fuchsia-400 duration-100 ease-in-out cursor-pointer"
				@click="toggleEdit"
			></div>
		</aside>

		<input
			:class="`px-3 py-4  truncate rounded-lg outline-none ${
				canEditProject && 'bg-sky-50'
			} c-neutral-400`"
			:value="project?.[0].description"
		/>

		<div
			class="min-h-64 h-full w-full rounded-lg outline-none text-base"
			v-if="!canEditProject"
			v-html="marked.parse(projectModels.markdown!)"
		></div>
		<textarea
			v-else-if="project?.[0].markdown"
			class="min-h-64 h-ful max-w-2xl w-full rounded-lg outline-none text-base prose prose-fuchsia bg-sky-50"
			v-model="projectModels.markdown"
		></textarea>
		<button
			v-if="canEditProject"
			:class="`px-5 py-3 rounded-lg  w-full max-w-2xl ${
				isEditing ? 'bg-fuchsia-600' : 'bg-fuchsia-500'
			} duration-100 ease-in-out mb-10 c-neutral-50  font-bold `"
			type="submit"
		>
			{{ !isEditing ? 'Editar proyecto' : 'Editando...' }}
		</button>
	</form>
	<section v-else-if="pending"><p>Cargando...</p></section>
</template>
