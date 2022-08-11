import { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import ProfileEditForm from "./ProfileEditForm";

export default observer(function ProfileAbout() {
  const {
    profileStore: { isCUrrentUser, profile },
  } = useStore();
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About - ${profile?.displayName}`}
          />
          {isCUrrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? 
              <ProfileEditForm setEditMode={setEditMode} />
           : 
            <span style={{whiteSpace: 'pre-wrap'}}>
              {profile?.bio}
            </span>
          }
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
})
