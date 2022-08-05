import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar />
      <NavBar />
      <Container style={{ marginTop: "6rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="activities" element={<ActivityDashboard />} />
          <Route path="activities">
            <Route path=":id" element={<ActivityDetails />} />
          </Route>
          <Route path="createActivity" element={<ActivityForm />} />
          <Route path="manage">
            <Route path=":id" element={<ActivityForm />} />
          </Route>
          <Route path="/errors" element={<TestErrors/>}/>
          <Route path="/server-error" element={<ServerError/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
