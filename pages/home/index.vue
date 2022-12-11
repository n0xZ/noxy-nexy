<script setup lang="ts">
	import { PostgrestResponse } from '@supabase/supabase-js'
	import { Project } from '~~/types'

	useHead({ title: 'Nexy - Home' })
	const client = useSupabaseClient<Project>()

	const { data: projects } = await useAsyncData('projects', async () => {
		const loggedUser = await client.auth.getUser()
		const { data, error } = (await client
			.from('project')
			.select('*')
			.eq('userId', loggedUser.data.user?.id)) as PostgrestResponse<Project>
		if (error) throw error
		return data
	})
</script>

<template>
	<section class="mt-16" v-if="!projects || !projects.length">
		<p>Al parecer no tienes proyectos creados hasta ahora.</p>
		<NuxtLink class="c-fuchsia-600 underline" to="/home/projects/create"
			>Haz click acá para empezar a crear tus proyectos</NuxtLink
		>
	</section>
	<section class="h-full w-full" v-else>
		<h2 class="text-center text-3xl mb-4">Proyectos actuales</h2>
		<ProjectList :projects="projects" />
	</section>
</template>
