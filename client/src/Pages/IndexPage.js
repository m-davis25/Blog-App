import {useEffect, useState} from 'react';
import Posts from '../Pages/Posts';
import './Posts.css'

export default function IndexPage(){

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/posts').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, [])

  return (
    <>
      {posts.length > 0 && posts.map(posts => (
        <Posts {...posts} />
      ))}
    </>
  );
}
