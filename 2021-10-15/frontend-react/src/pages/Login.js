import { Form, Input, Button } from 'antd';
import { useContext } from 'react';
import { Context } from '../store';
import { loginUser } from '../store/actions';
import '../components/App.css';

function Login(){
    const [state, dispatch] = useContext(Context);

    function getLoginData(val){
        const userData = {
            email: val.email,
            password: val.password
        };
        return(
            fetch("http://localhost:8081/api/auth/login", {
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
        getLoginData(val);
    }

    if(state.auth.email != undefined){
        return(
            <h1 style={{textAlign: "center", color: "green", fontWeight: "bold", fontSize: "30px", marginTop: "85px"}}>Signed in.</h1>
        )
    } else {
        return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={onFinish}
            >
                <Form.Item
                    label="E-mail"
                    style={{ marginTop: "40px" }}
                    name="email"
                    rules={[{ required: true, message: 'Please input your E-mail!' }, 
                            { type: 'email', message: 'Hmm, this does not look like E-mail!' }]}
                >
                    <Input />
                </Form.Item>
    
                <Form.Item
                    label="Password"
                    style={{ color: "red" }}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
    
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{fontWeight: "bold"}}>
                        SUBMIT
                    </Button>
                </Form.Item>
            </Form>
        );
    };
}

export default Login;