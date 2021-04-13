import { Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';


export default function Blog() {
  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => { 
    e.preventDefault();
    fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: form.title,
        content: form.content,
      }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        history.push('/');
      }
    });
  };

  return (
    <div>
      <h1>Blog</h1>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Title"
              type="text"
              fullWidth
              onChange={handleChange}
              value={form.title}
              name="title"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Context"
              type="content"
              multiline
              fullWidth
              onChange={handleChange}
              value={form.content}
              name="content"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}