export default defineNuxtRouteMiddleware(async (to, from) => {
	const client = useSupabaseAuthClient()
	const loggedUser = await client.auth.getUser()
	console.log(loggedUser.data.user)
	if (loggedUser.data.user && !loggedUser.error) return navigateTo('/home')
})
