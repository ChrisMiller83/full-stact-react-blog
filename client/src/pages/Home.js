import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react"
import Comments from "../components/Comments";



export default function Home() {
  const [ posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('/api/v1/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [])
  
  
  return (
    <div>
      <h1>A1 Best React Blog</h1>
      {
        posts.map((post) => {
          return (
            <Paper key={post.id} elevation={4} style={{ marginBottom: '2em'}}>
              <h2>{ post.title }</h2>
              <h4>{ post.User.username }</h4>
              <p>{ post.content }</p>
              <Comments postId={post.id} />
            </Paper>
          )
        })
      }
    </div>
  )
}
