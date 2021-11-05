import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { addPost, nullifyPosts, removePost, updatePosts } from "../store/actions";
import { Table, Space, Form, Input, Button, Select } from "antd";
import { Context } from "../store";
import './App.css';

function UpdatePost() {
    let rows;
    const [specificPostData, setSpecificPostData] = useState("");
    const [state, dispatch] = useContext(Context);
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16 }
    };

    useEffect(() => {
        if(state.auth.email != null && state.auth.email != undefined){
            const userEmail = {
                email: state.auth.email
            }
            fetch("http://localhost:8081/api/post/userposts", {
                method: "POST",
                body: JSON.stringify(userEmail),
                headers: {"Content-Type":"application/json"}
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(nullifyPosts())
                dispatch(addPost(data))
                setSpecificPostData(data)
            })
        } else {
            dispatch(nullifyPosts())
        }
        }, [])
    
    function updateTitle(val){
        const updatedTitle = {
            title: val.postTitle
        }
        const updatedPost = {
            id: val.postId,
            firstName: state.auth.firstName,
            lastName: state.auth.lastName,
            title: val.postTitle,
            email: state.auth.email
        }
        fetch("http://localhost:8081/api/post/update/" + val.postId, {
            method: "PUT",
            body: JSON.stringify(updatedTitle),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            console.log(response);
        })
        dispatch(updatePosts(updatedPost))
    }

    function deletePost(id){
        fetch("http://localhost:8081/api/post/delete/" + id, {
            method: "DELETE"
        }).then(response => {
            console.log(response);
        })
        dispatch(removePost(id))
    }

    if(state.posts.data !== undefined){
        const mappedData = state.posts.data.map(row => ({
            key: row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            title: row.title,
            email: row.email,
            id: row.id
        }))
        rows = [
            ...mappedData
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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button onClick={() => deletePost(record.id)}>DELETE</Button>
            </Space>
        ),
    },
    ];

    const onFinish = (val) => {
        updateTitle(val);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <Table dataSource={rows} columns={columns} />
            <Form {...layout} form={form} onFinish={onFinish}>
                <Form.Item name="postId" label="Enter valid ID from POSTS table: " style={{fontWeight: "bold", marginTop: "30px"}} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="postTitle" label="Enter updateable title: " style={{fontWeight: "bold"}} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{marginLeft: "-840px", fontWeight: "bold"}}>UPDATE</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdatePost