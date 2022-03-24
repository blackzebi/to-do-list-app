import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Routes, Route, Link } from "react-router-dom";
import Tasks from "./pages/TaskManager";
import Employees from "./pages/EmployeeManager";
import CancedledTasks from "./pages/ListCanceledTask";
// import classnames from "classnames";
// import { appRoutes } from "./routes";
// import Header from './pages/Header'

// const tabs = [
//   {
//     id: 1,
//     name: "Tasks",
//     slug: "/",
//   },
//   {
//     id: 2,
//     name: "Employees",
//     slug: "/employees",
//   },
//   {
//     id: 3,
//     name: "CancedledTasks",
//     slug: "/cancedledTasks"
//   }
// ]

function Header() {
  return (
    <nav className="header-wrapper">
      <div className="header">
        <div className="header-logo">Todo List app</div>
        <div className="header-nav">
          <Link className="link" to="/tasks">
            Tasks
          </Link>
          <Link className="link" to="/employees">
            Employees
          </Link>
          <Link className="link" to="/cancedledTasks">
            CancedledTasks
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  // const [type, setType] = useState("Tasks")
  // const routes = useRoutes(appRoutes);
  return (
    <div className="App">
      {/* <nav>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={classnames({ active: type === tab.name })}
            >
              <Link to={tab.slug} onClick={() => setType(tab.name)}>
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}
      <Header />
      <div className="App-container">
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/cancedledTasks" element={<CancedledTasks />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
