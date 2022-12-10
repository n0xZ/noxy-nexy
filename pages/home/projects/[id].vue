<script setup lang="ts">
	import { PostgrestSingleResponse } from '@supabase/supabase-js'
	import { Project } from '~~/types'

	const route = useRoute()
	const client = useSupabaseClient<Project>
	const { data: project, pending } = await useAsyncData(
		'projectById',
		async () => {
			const { data } = (await client()
				.from('project')
				.select('*')
				.eq('id', route.params.id)) as PostgrestSingleResponse<Project>

			return data
		}
	)
</script>

<template>
	<section v-if="project && !pending">
		<p>{{ project?.title }}</p>
	</section>
	<section v-else-if="pending"><p>Cargando...</p></section>
</template>
