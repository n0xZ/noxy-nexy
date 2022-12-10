export const useUser = () => {
	const user = useSupabaseUser()
	return useState('user', () => user)
}
