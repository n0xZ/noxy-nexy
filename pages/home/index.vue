<script setup lang="ts">
	import { PostgrestResponse } from '@supabase/supabase-js'
	import { Project } from '~~/types'

	useHead({ title: 'Nexy - Home' })
	const client = useSupabaseClient()
	const user = useSupabaseUser()
	const { data, error } = (await client
		.from('project')
		.select('*')
		.eq('userId', user.value?.id)) as PostgrestResponse<Project>
</script>

<template>
	<section class="mt-16" v-if="!data || !data.length">
		<p>Al parecer no tienes proyectos creados hasta ahora.</p>
		<NuxtLink class="c-fuchsia-600 underline" to="/home/projects/create"
			>Haz click acá para empezar a crear tus proyectos</NuxtLink
		>
	</section>
	<section class="h-full w-full" v-else>
		<ProjectList :projects="data" />
	</section>
</template>
