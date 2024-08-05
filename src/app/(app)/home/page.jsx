import Link from 'next/link'
import Posts from './Posts'

const Home = () => {
    return (
        <>
            <div className="py-6 flex items-center gap-6 flex-col">
                <Link href="/create-post">
                    <button className="btn">Create Post</button>
                </Link>
                <Posts />
            </div>
        </>
    )
}

export default Home
