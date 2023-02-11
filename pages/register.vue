<script setup lang="ts">
	import { z } from 'zod'
	import { AuthError } from '@supabase/supabase-js'
	const registerSchema = z.object({
		username: z.string().min(3, {
			message: 'Campo requerido',
		}),
		email: z
			.string()
			.email({ message: 'Formato de correo electrónico ingresado no válido' }),
		password: z.string().min(3, { message: 'Campo requerido' }),
	})
	type RegisterFields = z.infer<typeof registerSchema>
	type Errors = {
		authErrors: AuthError
		fieldErrors: z.ZodError<RegisterFields | null>
	}
	const inputModels = ref<RegisterFields>({
		email: '',
		password: '',
		username: '',
	})
	const errors = ref<Errors>({} as Errors)
	const isSubmitting = ref(false)
	const needsEmailVerification = ref(false)
	const router = useRouter()
	const client = useSupabaseAuthClient()

	definePageMeta({ middleware: ['auth'] })
	useHead({ title: 'Nexy - Registrarse' })

	const register = async () => {
		const result = registerSchema.safeParse(inputModels.value)
		isSubmitting.value = true
		if (!result.success) {
			errors.value.fieldErrors = result.error
			isSubmitting.value = false
		} else {
			const { data: user, error } = await client.auth.signUp({
				email: result.data.email,
				password: result.data.password,
			})
			if (error) {
				isSubmitting.value = false
				errors.value.authErrors = error
			} else if (user) {
				isSubmitting.value = false
				needsEmailVerification.value = true
			}
		}
	}
</script>

<template>
	<main class="min-h-screen h-full grid place-items-center font-roboto">
		<section v-if="needsEmailVerification">
			<p>Por favor, revise su correo para confirmar su cuenta.</p>
		</section>
		<form
			class="flex flex-col justify-center space-y-4 container w-full mx-auto max-w-2xl xl:p-0 p-2"
			@submit.prevent="register"
			v-else
		>
			<h2 class="text-center text-2xl font-semibolds">Unete ya a Nexy!</h2>
			<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
				<label class="font-bold" for="username">Nombre de usuario</label>
				<input
					class="px-5 py-4 rounded-md outline-none bg-sky-50"
					type="text"
					name="username"
					placeholder="janedoe132"
					v-model="inputModels.username"
				/>
				<span class="c-red-500 h-6">{{
					errors.fieldErrors?.formErrors.fieldErrors.username
						? errors.fieldErrors?.formErrors.fieldErrors.username?.[0]
						: null
				}}</span>
			</aside>
			<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
				<label class="font-bold" for="email">Correo electrónico</label>
				<input
					class="px-5 py-4 rounded-md outline-none bg-sky-50"
					type="email"
					name="email"
					placeholder="janedoe132@email.com"
					v-model="inputModels.email"
				/>
				<span class="c-red-500 h-6">{{
					errors.fieldErrors?.formErrors.fieldErrors.email
						? errors.fieldErrors?.formErrors.fieldErrors.email?.[0]
						: null
				}}</span>
			</aside>

			<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
				<label class="font-bold" for="password">Contraseña</label>
				<input
					class="px-5 py-4 rounded-md outline-none bg-sky-50"
					type="password"
					name="password"
					placeholder="janedoe123*"
					v-model="inputModels.password"
					:disabled="isSubmitting"
				/>
				<span class="c-red-500 h-6">{{
					errors.fieldErrors?.formErrors.fieldErrors.password
						? errors.fieldErrors?.formErrors.fieldErrors.password?.[0]
						: null
				}}</span>
			</aside>
			<button
				:class="`px-5 py-3 rounded-lg  w-full max-w-2xl ${
					isSubmitting ? 'bg-fuchsia-600' : 'bg-fuchsia-500'
				} duration-100 ease-in-out mb-10 c-neutral-50  font-bold `"
				type="submit"
				:disabled="isSubmitting"
			>
				{{ isSubmitting ? 'Creando...' : 'Crear cuenta ' }}
			</button>
			<span class="c-red-500 h-6">{{
				errors.authErrors ? errors.authErrors.message : null
			}}</span>
			<NuxtLink to="/login" class="text-center underline"
				>Ya poseo una cuenta</NuxtLink
			>
		</form>
	</main>
</template>
