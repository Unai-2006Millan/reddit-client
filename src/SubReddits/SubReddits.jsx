import './Subreddits.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../store/slices/subredditsSlice';

const Subreddits = () => {
    const dispatch = useDispatch();
    const { subreddits, status, error } = useSelector((state) => state.subreddits);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSubreddits());
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
                {subreddits.map((subreddit) => {
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


export default Subreddits;