import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import ButtonCustom from "../Button";

export default function EditModal(props) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = React.useState("");

  async function HandleEdit() {
    if (name.trim() === "") return;

    try {
      await props.fnc(props.chatid, name);
    } catch (err) {
        console.log("Error in Editing Chat : ", err);
    }

    setName("");
    props.onClose();
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>New Chat Title</FormLabel>
              <Input
                ref={initialRef}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Enter new chat title"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonCustom
              type={"primary"}
              isExpanded={true}
              btnName={"Save"}
              onClick={() => {
                HandleEdit();
              }}
            />
            <ButtonCustom
              type={"secondary"}
              isExpanded={true}
              btnName={"Cancel"}
              marginLeft="2"
              onClick={props.onClose}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
