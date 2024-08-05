'use client'
import { usePosts } from '@/hooks/posts'
import React from 'react'
import Loading from '../Loading'
import Link from 'next/link'

const Posts = () => {
    const { posts } = usePosts()

    return (
        <>
            {posts ? (
                posts.map(post => (
                    <Link href={`/post/${post.id}`} key={post.id}>
                        <div>
                            <div className="border-black border-2 mb-4 rounded-md p-2 w-96">
                                <p>{post.name}</p>
                                <p className="text-lg font-bold">
                                    {post.title}
                                </p>
                                <div className="border-black border-2 mb-4 rounded-md p-2 h-12 overflow-hidden">
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Posts
