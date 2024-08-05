import useSWR from 'swr'
import axios from '@/lib/axios'

export const usePosts = ($id = null) => {
    const {
        data: posts,
        error,
        mutate,
    } = useSWR('/api/posts', () =>
        axios
            .get('/api/posts')
            .then(res => res.data)
            .catch(error => console.log('Something went wrong', error)),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const store = async ({ setErrors, setSuccess, setLoading, ...props }) => {
        await csrf()
        setErrors([])

        try {
            await axios.post('/api/posts', props)
            mutate() // Refetch data after successful creation
            setSuccess(true)
        } catch (error) {
            if (error.response?.status !== 422) throw error // Re-throw non-validation errors

            setErrors(error.response.data.errors) // Set validation errors
        } finally {
            setLoading(false)
        }
    }

    const show = async id => {
        const response = await axios.get(`/api/posts/${id}`)
        return response.data
    }

    return {
        posts,
        store,
        show,
    }
}
