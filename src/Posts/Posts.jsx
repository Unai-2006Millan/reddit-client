import './Posts.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/slices/postsSlice';

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.posts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
        
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div className="loader">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div>
            <ul>
                {posts.map((post) => {
                const { title, selftext, media, preview, author, ups, num_comments } = post.data;

                return (
                    <li className="post" key={post.data.id}>
                    <h3>{title}</h3>
                    {selftext && <p>{selftext}</p>}

                    <div className='media-container'>
                        {media && media.reddit_video && (
                        <video
                            controls
                            width="640"
                            height="360"
                            src={media.reddit_video.fallback_url}
                        >
                            Your browser does not support the video tag.
                        </video>
                        )}

                        {preview && preview.images && (
                        <>
                            {preview.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.source.url.replace(/&amp;/g, '&')}
                                alt={title}
                                style={{ maxWidth: '100%', marginBottom: '1rem' }}
                            />
                            ))}
                        </>
                        )}
                    </div>
                    <div className='date-posted'>
                        <h5>Posted By {author}</h5>
                        <h5>👍 {ups} | 💬 {num_comments}</h5>
                    </div>
                    </li>
                );
                })}
            </ul>
        </div>
    );
}

export default Posts;