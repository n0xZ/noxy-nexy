<script setup lang="ts">
	import { PostgrestError } from '@supabase/supabase-js'
	import { z } from 'zod'
	import { Project } from '~/types'

	const createProjectSchema = z.object({
		title: z.string().min(5, { message: 'Campo requerido' }),
		description: z.string().min(5, { message: 'Campo requerido' }),
	})

	type CreateProjectFields = z.infer<typeof createProjectSchema>
	type Errors = {
		fieldErrors: z.ZodError<CreateProjectFields>
		apiError: PostgrestError
	}

	const client = useSupabaseClient<Project>()
	const user = useUser()
	const projectInputModels = ref<CreateProjectFields>({
		description: '',
		title: '',
	})
	const errors = ref<Errors>({} as Errors)
	const isSubmitting = ref(false)

	const onSubmit = async () => {
		const formResult = createProjectSchema.safeParse(projectInputModels.value)
		isSubmitting.value = true
		if (formResult.success) {
			const newProject: Partial<Project> = {
				...formResult.data,
				userId: user.value?.id,
				hasFinished: false,
			}
			const { data, error } = await client.from('project').insert([newProject])
			if (error) errors.value.apiError = error
			isSubmitting.value = false
			projectInputModels.value = {} as CreateProjectFields
		} else {
			errors.value.fieldErrors = formResult.error
			isSubmitting.value = false
		}
	}
</script>

<template>
	<form
		class="flex flex-col justify-center space-y-4 container w-full mx-auto max-w-2xl mt-20"
		@submit.prevent="onSubmit"
	>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
			<label class="font-bold" for="title">Titulo del proyecto</label>
			<input
				class="px-5 py-4 rounded-lg outline-none border-2 border-neutral-100 bg-transparent"
				type="text"
				name="title"
				placeholder="Jane Doe's first project"
				v-model="projectInputModels.title"
			/>
			<span class="c-red-500 h-6">{{
				errors.fieldErrors?.formErrors.fieldErrors.title
					? errors.fieldErrors?.formErrors.fieldErrors.title?.[0]
					: null
			}}</span>
		</aside>

		<aside class="flex flex-col justify-center space-y-3 max-w-xl w-full">
			<label class="font-bold" for="description">Descripción del proyecto</label>
			<input
				class="px-5 py-4 rounded-lg outline-none border-2 border-neutral-100 bg-transparent"
				type="text"
				name="description"
				placeholder="This is Jane Doe first project. "
				v-model="projectInputModels.description"
			/>
			<span class="c-red-500 h-6">{{
				errors.fieldErrors?.formErrors.fieldErrors.description
					? errors.fieldErrors?.formErrors.fieldErrors.description?.[0]
					: null
			}}</span>
		</aside>
		<button
			:class="`px-5 py-3 rounded-lg  w-full max-w-xl ${
				isSubmitting ? 'bg-fuchsia-600' : 'bg-fuchsia-500'
			} duration-100 ease-in-out mb-10 c-neutral-50  font-bold `"
			type="submit"
			:disabled="isSubmitting"
		>
			{{ isSubmitting ? 'Creando...' : 'Crear nuevo proyecto' }}
		</button>
		<span class="h-6 c-red-500">{{
			errors.apiError ? errors.apiError.details : null
		}}</span>
	</form>
</template>
