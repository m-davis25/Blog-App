import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import Editor from '../Editor';
import './Posts.css'


const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/posts/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setSummary(postInfo.summary);
                    setContent(postInfo.content);
                });
            });
    }, []);

    async function updatePosts(event) {
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        
        const response = await fetch('http://localhost:8000/posts/', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
               setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/posts/' + id} />
    }

    return (
        <form onSubmit={updatePosts}>
            <h1 className='edit-title'>Edit Post</h1>
            <input 
                type='title' 
                placeholder={'title'} 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <br />
            <input 
                type='summary' 
                placeholder={'summary'} 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <br />
            <input 
                type='file'
                onChange={e => setFiles(e.target.files)}
            />
            <Editor onChange={setContent} value={content} />
            <button style={{marginTop: '5px'}}>Edit Post</button>
        </form>
      );
}

export default EditPost