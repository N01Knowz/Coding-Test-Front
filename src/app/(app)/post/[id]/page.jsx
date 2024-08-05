'use client'
import { usePosts } from '@/hooks/posts'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Loading from '../../Loading'

const Post = () => {
    const params = useParams()
    const [post, setPost] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        if (params.id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`/api/posts/${params.id}`)
                    setPost(response.data)
                } catch (error) {
                    setError(error)
                }
            }

            fetchPost()
        }
    }, [params])

    useEffect(() => {
        console.log(post)
    }, [post])
    return (
        <>
            {post ? (
                <div className="py-6 flex items-center gap-6 flex-col">
                    <div className="border-black border-2 mb-4 rounded-md p-2 w-96">
                        <p>{post.name}</p>
                        <p className="text-lg font-bold">{post.title}</p>
                        <div className="border-black border-2 mb-4 rounded-md p-2">
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Post
