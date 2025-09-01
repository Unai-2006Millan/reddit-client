import {useState, useEffect} from 'react';
import axios from 'axios';
import './LoadSubReddits.css';

function LoadSubReddits() {
    const [LoadSubReddits, setSubReddits] = useState([]);
    const [error, setError] = useState(null);
    useEffect (() => {
        const fetchSubrredits = async () => {
      try {
        const response = await axios.get('/api/subreddits.json');
        setSubReddits(response.data.data.children);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchSubrredits();
    }, []);

    if (error) {
    return (
      <div>
        <h2>Error fetching subreddits</h2>
        <p>{error}</p>
      </div>
    );
  }

    if (LoadSubReddits.length === 0) {
        return <p>Loading subreddits...</p>;
    }
    return (
        <div className='load-subreddits'>
            <ul>
                {LoadSubReddits.map((subreddit) => {
                    const {display_name, title, icon_img} = subreddit.data;
                    return (
                        <li className="subreddit" key={subreddit.data.id}>
                            <h3>{title}</h3>
                            {icon_img && <img src={icon_img} alt={`${display_name} icon`} width="50" height="50" />}
                            <p>{display_name}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default LoadSubReddits;