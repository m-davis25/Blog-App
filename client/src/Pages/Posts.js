import React from 'react';
import { Link } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import './Posts.css';

const Posts = ({_id, title, summary, cover, content, createdAt, author}) => {
    return (
        <div className='post'>
            <div className='texts'>
                <div className='image'>
                    <Link to={`/posts/${_id}`}>
                        <img src={'http://localhost:8000/'+ cover} alt='img' />
                    </Link>
                </div>
                <div className='blog'>
                    <Link to={`/posts/${_id}`}>
                        <h2 className='blog-title'>{title}</h2>
                    </Link>
                    <p className='info'>
                        <a href={`/userprofile/${author.username}`} className='author'>{author.username}</a>
                        <br />
                        <time>{formatISO9075(new Date(createdAt))}</time>
                    </p>
                    <p className='summary'>{summary}</p>
                </div>
            </div>
        </div>
    )
}

export default Posts