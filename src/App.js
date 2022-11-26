import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import LoginPage from "./components/LoginPage";
import HostHomePage from "./components/HostHomePage";
import GuestHomePage from "./components/GuestHomePage";


const { Header, Content } = Layout;

class App extends React.Component {

  state = {
    authed: false,
    asHost: false,
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asHost = localStorage.getItem("asHost") === "true";
    this.setState({
      authed: authToken !== null,
      asHost,
    });
  }

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };

  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost);
    this.setState({
      authed: true,
      asHost,
    });
  };

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess}/>;
    }

    if (this.state.asHost) {
      return <HostHomePage />;
    }

    return <GuestHomePage />;
  }
  

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );



  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: 'flex', justifyContent: "space-between"}}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'white'}}>
            Stay Booking
          </div>

          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>

        <Content style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}>
          {this.renderContent()}
        </Content>
      </Layout>
    )
  }
}


export default App;
