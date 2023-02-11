<script setup lang="ts">
	import { PostgrestResponse } from '@supabase/supabase-js'
	import { Project } from '~~/types'

	useHead({ title: 'Nexy - Home' })
	const client = useSupabaseClient<Project>()

	const {
		data: projects,
		pending,
		error,
	} = await useAsyncData('projects', async () => {
		const loggedUser = await client.auth.getUser()
		const { data, error } = (await client
			.from('project')
			.select('*')
			.eq('userId', loggedUser.data.user?.id)) as PostgrestResponse<Project>
	if(error) throw error
		return data
	})
	const removeProject = async (project: Project) => {
		const { error } = await client.from('project').delete().eq('id', project.id)
		if (!error && projects) {
			projects.value = projects.value?.filter((p) => p.id !== project.id)!
		} else
			throw createError({ message: 'Ocurrio un error', cause: error?.details })
	}
	const logError = () => {
		console.log(error)
	}

	if (error.value)
		throw createError({
			message: 'Ocurrio un error',
			cause: error?.value?.message,
			fatal: true,
			statusCode: 404,
		})
</script>

<template>
	<NuxtErrorBoundary @error="logError">
		<section class="mt-16" v-if="!projects || !projects.length">
			<p>Al parecer no tienes proyectos creados hasta ahora.</p>
			<NuxtLink class="c-fuchsia-600 underline" to="/home/projects/create"
				>Haz click acá para empezar a crear tus proyectos</NuxtLink
			>
		</section>
		<section class="h-full w-full" v-else-if="!pending">
			<h2 class="text-center text-3xl mb-4">Proyectos actuales</h2>
			<ProjectList :removeProject="removeProject" :projects="projects" />
		</section>
		<p v-else>Cargando proyectos...</p>
		<template #error="{ error }">
			<p>Ha ocurrido un error</p>
		</template>
	</NuxtErrorBoundary>
</template>
