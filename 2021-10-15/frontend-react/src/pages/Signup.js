import React, { useContext, useState } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';
import { Context } from "../store";
import { loginUser } from "../store/actions";

function Signup() {
    const [form] = Form.useForm();
    const [state, dispatch] = useContext(Context);
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    function getSignupData(val){
        const userData = {
            firstName: val.firstName,
            lastName: val.lastName,
            email: val.email,
            password: val.password
        };
        return(
            fetch("http://localhost:8081/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {"Content-Type":"application/json"}
            }).then(response => {
                return response.json();
            }).then(data => {
                dispatch(loginUser(data))
            })
        );
    }

    const onFinish = (val) => {
        getSignupData(val);
        return(
            <h1>Account successfully registered! You may now log in from login page.</h1>
        )
    }

    if(state.auth.email != undefined){
        return(
            <h1>Signed in.</h1>
        )
    } else {
        return (
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                scrollToFirstError
                onFinish={onFinish}
            >
                <Form.Item
                    name="firstName"
                    style={{ marginTop: "40px" }}
                    label="First Name"
                    rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Surname"
                    rules={[{ required: true, message: 'Please input your surname!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[{ required: true, message: 'Please input your E-mail!' }, 
                            { type: 'email', message: 'Hmm, this does not look like E-mail!' }]}
                >
                    <Input />
                </Form.Item>
        
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
        
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[{ required: true, message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
        
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{fontWeight: "bold"}}>
                        REGISTER
                    </Button>
                </Form.Item>
            </Form>
        );
    };
}

export default Signup;