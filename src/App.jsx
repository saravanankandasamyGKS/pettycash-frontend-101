import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Signinuser from "./components/Signin";
import RegisterUser from "./components/Register";
import Addexpense from "./components/addexpense";
import DashboardPage from "./components/Dashboard";
import { AppState } from "./contextapi/dataupdate";
import { useEffect } from "react";
import { getalldatas } from "./api calls/Details";
import Editpage from "./pages/Editpage";
import AddincomePage from "./pages/Addincomepage";
import Expense from "./components/Expense";
import Income from "./components/Income";
import { GetallIncome } from "./api calls/income";

function App() {
  //context Api
  const { setinfo, info, setincome,income,settotal,total } = AppState();
  //navigate
  const navigate = useNavigate();
  //get from local storage
  const key = localStorage.getItem("Key");
  // Parse the data
  const userid = JSON.parse(key);
  // if userid not available redirect to login

  // Store data locally
  useEffect(() => {
    if (!key) {
      // Handle unauthorized access, e.g., show a message or redirect to login
      navigate("/signin");
      return;
    }

    // Check if info is already present in the context before fetching data
    if (!info || info.length === 0) {
      getalldatas(userid)
        .then((data) => {
          setinfo(data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      GetallIncome(userid)
        .then((data) => {
          setincome(data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

        settotal([...info,...income])
    }
  }, [income, info, key, navigate, setincome, setinfo, settotal, userid]);

console.log(total)
  return (
    <div className="App ">
      <Routes>
        <Route exact path="/" element={<DashboardPage />} />
        <Route path="/signin" element={<Signinuser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/Income" element={<Income />} />
        <Route path="/Expense" element={<Expense />} />
        <Route path="/addexpense" element={<Addexpense />} />
        <Route path="/editexpense/:id" element={<Editpage />} />
        <Route path="/addincome" element={<AddincomePage />} />
      </Routes>
    </div>
  );
}

export default App;
