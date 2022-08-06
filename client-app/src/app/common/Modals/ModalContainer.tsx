import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function ModalContiner() {

    const {modalStore} = useStore();
    const {modal} = modalStore;

    return (
        <Modal open={modal.open} onClose={modalStore.closeModal} size='mini'>
            <Modal.Content>
                {modal.body}
            </Modal.Content>
        </Modal>
    )
});