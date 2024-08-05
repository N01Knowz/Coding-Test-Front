'use client'
import { usePosts } from '@/hooks/posts'
import React, { useEffect, useState } from 'react'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const { store } = usePosts()

    const storePost = e => {
        setSuccess(false)
        setLoading(true);
        e.preventDefault()
        store({
            title,
            content,
            setErrors,
            setSuccess,
            setLoading,
        })
    }

    useEffect(() => {
        if(success){
            setTitle('');
            setContent('');
        }
    }, [success])

    return (
        <>
            <form
                onSubmit={storePost}
                className="py-6 flex items-center gap-6 flex-col">
                <input
                    type="text"
                    placeholder="Title"
                    className="input-bordered"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    className="textarea-lg textarea-bordered"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button className="btn" disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "Create New Post"  }</button>
            </form>
        </>
    )
}

export default CreatePost
