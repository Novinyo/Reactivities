import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  return (
    <>
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
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
