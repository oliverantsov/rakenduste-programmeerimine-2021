import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import ShowMagic from "./components/ShowMagic";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Layout, Breadcrumb } from 'antd';
import UpdatePost from "./components/UpdatePost";
import './components/App.css';

function App() {
  const { Content, Footer } = Layout;
  return (
    <div id="container">
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <BrowserRouter>
              <Header><Route path="/" component={Header} /></Header>
              <Switch>
                <Route exact path="/showmagic" component={ShowMagic} />

                <Route exact path="/posts" component={Posts} />
                <Route exact path="/updatepost" component={UpdatePost} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </BrowserRouter>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Rakenduste programmeerimine 2021</Footer>
      </Layout>
    </div>
  );
}

export default App;