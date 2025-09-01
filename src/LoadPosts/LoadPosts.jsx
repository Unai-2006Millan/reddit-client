import { useEffect, useState } from 'react';
import axios from 'axios';
import './LoadPosts.css';

function LoadPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Fetch posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/r/popular.json');
        setPosts(response.data.data.children);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();

  }, []);

  if (error) {
    return (
      <div>
        <h2>Error fetching posts</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return <p>Loading posts...</p>;
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

export default LoadPosts;



