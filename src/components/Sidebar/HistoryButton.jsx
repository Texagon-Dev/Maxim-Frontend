import React from "react";
import { Button, HStack, Heading, Icon, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import IconButton from "../IconButton";
import { DelChat, EditChat, waitForOneSecond } from "../../Shared/Function";
import EditModal from "./EditModal";

function HistoryButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const HandleDelete = async (id) => {
    console.log("The Chat to Delete : " + id);
    try {
      await DelChat(id);

      console.log("The Chat to Delete : " + id);
      if (props.ActiveChat) {
        console.log("The Active Chat to Delete : ", props.ActiveChat);

        if (props.ActiveChat.id === id) {
          props.setSelectedChat(null);
          props.setActiveChat(null);

          window.location.reload();
        }

        if (props.SelectedChat.id == id) {
          props.setSelectedChat(null);
          props.setActiveChat(null);

          window.location.reload();
        }
      }

      await waitForOneSecond();

      console.log("The Active Chat  : ", props.ActiveChat);



      await props.setChatHistoryfunc();



    } catch (err) { }
  };

  const EDC = async (id, chatname) => {
    // console.log("The Chat to Edit : " + id);
    // console.log("The Chat to Edit : " + chatname);
    try {
      await EditChat(props.chat.id, chatname);
      props.setChatHistoryfunc();
    } catch (err) { }
  };

  return (
    <HStack
      border={"1px"}
      borderColor={"whiteAlpha.400"}
      bg={"whiteAlpha.200"}
      transition={"all .2s ease-in-out"}
      _hover={{
        bg: "whiteAlpha.400",
        color: "brand.main",
      }}
      paddingY={"2"}
      paddingX={"3"}
      cursor={"pointer"}
      rounded={"lg"}
      align={"center"}
      spacing={props.isExpanded ? "6" : "0"}
      {
      ...!props.isExpanded && {
        onClick: () => {

          props.setSelectedChat(props.chat);

          if (window.location.pathname != "/dashboard/chat") {
            window.location.href = "/dashboard/chat"
          }

        }
      }
      }
      {...props}
    >
      <Heading
        w={"full"}
        as="p"
        size={["sm"]}
        color="white"
        isTruncated={true}
        {...props}

        {
        ...props.isExpanded && {
          onClick: () => {
            props.setSelectedChat(props.chat);

            if (window.location.pathname != "/dashboard/chat") {
              window.location.href = "/dashboard/chat"
            }
          }
        }
        }

      >
        {props.isExpanded ? props.historyTitle : null}
      </Heading>
      {props.isExpanded ? (
        <HStack transition={"all .2s ease-in-out"}>
          <Button
            padding={"0"}
            bg={"transparent"}
            color={"white"}
            _hover={{
              bg: "whiteAlpha.700",
              color: "brand.main",
            }}
            {...props}
            onClick={() => {
              onOpen();
              //EDC(props.chat.id, "EDC Update");
            }}
          >
            <BiEditAlt size={"20"} />
          </Button>
          <Button
            p={"0"}
            bg={"transparent"}
            color={"white"}
            _hover={{
              bg: "whiteAlpha.700",
              color: "brand.main",
            }}
            onClick={() => {

              HandleDelete(props.chat.id);
            }}
          >
            <MdDeleteOutline size={"20"} />
          </Button>
        </HStack>
      ) : (
        <IconButton
          icon={BiMessageDetail}
          boxSize={9}
          type={"light"}
          bg="transparent"
        />
      )}
      <EditModal isOpen={isOpen} onClose={onClose} chatid={props.chat.id} fnc={EDC} />
    </HStack>
  );
}

export default HistoryButton;
