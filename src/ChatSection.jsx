import { HStack, VStack, Box, Show, Spinner } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import MessageUI from "./components/MessageUI";
import InputField from "./components/InputField";
import IconButton from "./components/IconButton";
import { BiSolidSend } from "react-icons/bi";
import { GetRequest, UpdateChatHist } from "./Shared/Function";

function ChatSection({ ActiveChat, updateChatHistoryfunc, ChatStatus }) {
  const [messages, setMessages] = React.useState(
    ActiveChat ? ActiveChat.ChatHistory : []
  );

  const [ChatFileType, setChatFileType] = React.useState(
    ActiveChat ? ActiveChat.BookName.endsWith(".pdf") : false
  );

  React.useEffect(() => {
    console.log("ChatFileType Changed = ", ChatFileType);
  }, [ChatFileType]);

  const chatboxRef = useRef(null);
  const msgboxRef = useRef(null);

  const [userfieldmsg, setuserfieldmsg] = React.useState("");

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      console.log("Scrolling to bottom");
    }
  }, [chatboxRef]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      console.log("Scrolling to bottom");
    }
  }, [msgboxRef]);

  React.useEffect(() => {
    if (ActiveChat) {
      setMessages(ActiveChat.ChatHistory);
      //console.log("Change in Active Chat Detected");
    }
  }, [ActiveChat]);

  const onEnterPress = (e) => {
    if (userfieldmsg.trim() === "") return;

    if (e.key !== "Enter") return;

    if (!ActiveChat) {
      return;
    }

    updateChatHistoryfunc(ActiveChat.id, {
      sender: "User",
      text: userfieldmsg,
      source: [],
    });

    GetRequest(userfieldmsg, ActiveChat.id).then((res) => {
      updateChatHistoryfunc(ActiveChat.id, {
        sender: "Bot",
        text: res.data,
        source: res.source,
      });
    });
    setuserfieldmsg("");
  };

  const onClick = () => {
    if (userfieldmsg.trim() === "") return;

    if (!ActiveChat) {
      return;
    }

    updateChatHistoryfunc(ActiveChat.id, {
      sender: "User",
      text: userfieldmsg,
      source: [],
    });

    GetRequest(userfieldmsg, ActiveChat.id).then((res) => {
      updateChatHistoryfunc(ActiveChat.id, {
        sender: "Bot",
        text: res.data,
        source: res.source,
      });
    });
    setuserfieldmsg("");
  };

  return (
    <VStack
      bg="white"
      spacing={"3"}
      padding={["0", "2", "4"]}
      w={"full"}
      h={"full"}
      align={"flex-start"}
      justify={"space-between"}
    >
      <Show below="md">
        <Box w={"full"} h={"8"} overflowY={"auto"} overflowX={"hidden"}></Box>
      </Show>

      <VStack
        w={"full"}
        h={"full"}
        overflowY={"auto"}
        overflowX={"hidden"}
        spacing={"5"}
        align={"flex-start"}
        padding={["0", "2", "4"]}
        id="chatbox"
        ref={chatboxRef}
      >
        {ChatStatus === 4 ? (
          <>
            {messages?.map((message, index) => (
              <>
                <MessageUI
                  key={index}
                  user={message.sender}
                  message={message.text}
                  source={ChatFileType ? message.source || [] : []}
                  refs={index === messages.length - 1 ? msgboxRef : null}
                />
              </>
            ))}
          </>
        ) : (
          <>
            <VStack
              spacing={"3"}
              padding={"2"}
              w={"full"}
              h={"full"}
              align={"center"}
              justify={"center"}
            >
              {" "}
              {ChatStatus === 1 ? (
                <>
                  <Spinner size="xl" />
                  Processing the File
                </>
              ) : (
                <>
                  {ChatStatus === 2 ? (
                    <>
                      {" "}
                      <Spinner size="xl" />
                      Generating Summary
                    </>
                  ) : (
                    <>
                      {ChatStatus === 3 ? <>File Processing Failed</> : <></>}
                    </>
                  )}
                </>
              )}
            </VStack>
          </>
        )}
      </VStack>
      <HStack w={"full"} spacing={"4"} padding={["0", "2", "4"]}>
        <InputField
          placeholder={"Type your message"}
          size="lg"
          setuserfieldmsg={setuserfieldmsg}
          fieldmsg={userfieldmsg}
          onKeyDown={onEnterPress}
        />
        <IconButton
          onClick={onClick}
          _hover={{
            bg: "brand.main",
            color: "brand.light",
          }}
          transition={"all .2s ease-in-out"}
          icon={BiSolidSend}
          boxSize={"12"}
          type={"primary"}
        />
      </HStack>
    </VStack>
  );
}

export default ChatSection;
