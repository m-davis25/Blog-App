import React, { useState } from 'react';
import Editor from '../Editor';
import { Navigate } from 'react-router';

const CreatePosts = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(event) {
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        
        const response = await fetch('http://localhost:8000/posts', {
            method: 'POST',
            body: data,
            credentials:'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

  return (
    <form onSubmit={createNewPost}>
        <h1 className='create-title'>Create Post</h1>
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
        <button style={{marginTop: '5px'}}>Create Post</button>
    </form>
  );
}

export default CreatePosts