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
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/Modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

function App() {

  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApploaded());
    } else {
      commonStore.setApploaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content="Loading...."/>
  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar />
    <ModalContainer/>
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
          <Route path="/profiles/:username" element={<ProfilePage/>}/>
          <Route path="/errors" element={<TestErrors/>}/>
          <Route path="/server-error" element={<ServerError/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
