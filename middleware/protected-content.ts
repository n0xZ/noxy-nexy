import { PostgrestResponse } from '@supabase/supabase-js'
import { Project } from '~~/types'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const client = useSupabaseClient<Project>()
	const existingUserProjects = (await client
		.from('project')
		.select('*')
		.eq('id', to.params.id)) as PostgrestResponse<Project>
	console.log(existingUserProjects)
	if (existingUserProjects.error || !existingUserProjects.data.length)
		return navigateTo('/home/unauthorized', { redirectCode: 401 })
})
