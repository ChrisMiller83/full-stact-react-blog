import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export default function Comments(props) {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.user);
  
  const getComments = (id) => {
    fetch(`/api/v1/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setComments(data);
        }
      });
  };

  useEffect(() => {
    getComments(props.postId);
  }, [props.postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/posts/${props.postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Comment Submitted');
          setText('');
          setShowForm(false);
          getComments(props.postId);
        }
      });
  };
  return (
    <div>
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.text}</p>
              <h6>{comment.User.username}</h6>
            </div>
          );
        })}
      </div>
      {user && (
        <div>
          {showForm ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Comment"
                type="text"
                fullWidth
                onChange={(e) => setText(e.target.value)}
                value={text}
                required
              />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(!showForm)}
            >
              Add Comment
            </Button>
          )}
        </div>
      )}
    </div>
  );
}