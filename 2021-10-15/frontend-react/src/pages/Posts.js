import { Table, Space, Button } from 'antd';
import { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store";
import { addPost, nullifyPosts, removePost, updatePosts } from "../store/actions";
import { Link } from 'react-router-dom';
import '../components/PostsStyle.css';

function Posts() {
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [state, dispatch] = useContext(Context);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/post/")
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch(nullifyPosts())
      dispatch(addPost(data))
      setData(data)
    })
  }, [])

  function updatePost(id) {}

  let rows;
  if(state.posts.data !== undefined){
    const iteratedData = state.posts.data.map(row => ({
      key: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      title: row.title,
      email: row.email,
      id: row.id
    }))
    
    rows = [
      ...iteratedData
    ];
  } else {
    rows = [];
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
        title: 'First name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Surname',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button><Link to="/updatepost" onClick={updatePost}>UPDATE</Link></Button>
            </Space>
        ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    addNewPost();
    if (inputRef.current) inputRef.current.focus();
  };

  const addNewPost = () => {
    const newPost = {
      id: Date.now(),
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
      title: title,
      email: state.auth.email
    };

    if(title != null && title != "" && state.auth.email != undefined && state.auth.email != null){
      fetch("http://localhost:8081/api/post/create", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {"Content-Type":"application/json"}
      }).then(response => {
        console.log(response);
      });
      dispatch(addPost(newPost));
    } else {
      if(title == "" && title == null){
        throw new Error("Error adding post to table because field is empty!");
      } else if(state.auth.email == undefined && state.auth.email == null) {
        throw new Error("Error adding post to table because account is not logged in!");
      } else {
        throw new Error("Error adding post to table!");
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Table dataSource={rows} columns={columns} />
      <h1 style={{textAlign: "center", color: "red", fontWeight: "bold", marginTop: "-30px"}}>Enter new post title</h1>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type='text' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus></input>
        <button type='submit' style={{fontWeight: "bold"}}>Submit</button>
      </form>
      <br />
      <p style={{textAlign: "center", color: "red", marginTop: "-15px", fontSize: "12px"}}>Currently logged in as: {state.auth.firstName} {state.auth.lastName} ({state.auth.email})</p>
    </div>
  );
}

export default Posts;

