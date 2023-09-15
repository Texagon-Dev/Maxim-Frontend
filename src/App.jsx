import React, { useState } from "react";
import "./App.css";
import { Divider, HStack, Stack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatSection from "./ChatSection";
import TabsView from "./components/Tabs";
import Header from "./components/Header";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import { GetAllChats, UpdateChatHist, GetRequest } from "./Shared/Function";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { validate, validatetoken } from "./Shared/Authentication";
import { useLocation } from "react-router-dom";
import Dashboard from "./pages";
import Homepage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import PaymentFailed from "./pages/Payments/Failed";
import PaymentSuccessful from "./pages/Payments/Success";

function App() {
  const [SelectedChat, setSelectedChat] = useState(null);
  const [ActiveChat, setActiveChat] = useState();
  const [ActiveFile, setActiveFile] = useState(null);
  const [ChatHistory, setChatHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatloading, setchatloading] = useState(true);
  const [NewChat, setNewChat] = useState(false);
  const [ChatStatus, setChatStatus] = useState(-1);

  // -1 => No Chat , 1 => File Processing , 2 => File Processes, 3 => File Failed , 4 => Chat Started
  // 5 ==> Loading Supabase Document , 6 ==> Supabase Document Loaded , 7 ==> Supabase Document Failed

  async function setChatHistoryfunc() {
    console.log("Update Chat Issued");

    setChatHistory([]);
    setchatloading(true);
    setChatHistory(await GetAllChats());
    setchatloading(false);

    console.log("Update Chat Resolved");
  }

  async function updateChatHistoryfunc(chatid, msgjson) {
    console.log("Update Chat Issued");
    let CH;
    if (ActiveChat && ActiveChat.ChatHistory) {
      CH = ActiveChat.ChatHistory;
    } else {
      CH = [];
    }
    CH.push(msgjson);
    UpdateChatHist(chatid, CH);
    setActiveChat({ ...ActiveChat, ChatHistory: CH });

    const foundIndex = ChatHistory.findIndex((item) => item.id === chatid);
    if (foundIndex != -1) {
      let ChatHistorytemp = ChatHistory;
      console.log("Found Index : ", foundIndex, ChatHistorytemp[foundIndex]);
      ChatHistorytemp[foundIndex].ChatHistory = CH;
      setChatHistory(ChatHistorytemp);
    }
  }

  React.useEffect(() => {
    if (SelectedChat) {
      setActiveFile(null);

      console.log("Selected Chat : ", SelectedChat);
      setActiveChat(SelectedChat);
      setNewChat(false);

      setChatStatus(5); //Loading Supabase Document

      //setChatStatus(4);//Chat Started
    }
  }, [SelectedChat]);

  async function newchatfunc(newchat) {
    console.log("New Chat Issued => ", newchat);

    if (newchat) {
      console.log("New Chat Resolved => ", newchat.data[0]);

      const message =
        "Can you please Summarize it briefly in French? Also Add 3 Questions from the text with Proper Formatting in French.";

      const response = await GetRequest(message, newchat.data[0].id);

      newchat.data[0].ChatHistory = [
        {
          sender: "Bot",
          text: response.data,
          source: response.source,
        },
      ];

      UpdateChatHist(newchat.data[0].id, [
        {
          sender: "Bot",
          text: response.data,
          source: response.source,
        },
      ]);

      let Ch = ChatHistory;
      Ch.push(newchat.data[0]);
      Ch.sort((a, b) => b.id - a.id);
      setChatHistory(Ch);
      setActiveChat(newchat.data[0]);
      setChatStatus(4); //Chat Started
    } else {
      await setChatHistoryfunc();
    }
  }

  React.useEffect(() => {
    console.log("Active Chat : ", ActiveChat);
  }, [ActiveChat]);

  React.useEffect(() => {
    async function init() {
      const location = window.location.pathname.toLowerCase();

      if (
        !(
          location === "/login" ||
          location === "/signup" ||
          location === "/reset-password" ||
          location === "/homepage" ||
          location === "/pricing" ||
          location === "/terms" ||
          location === "/privacy" ||
          location === "/payfailed" ||
          location === "/paysuccess"
        )
      ) {
        if (validatetoken()) {
          console.log("Token Not Valid");
          await validate(true);
        } else {
          await validate();
        }
        await setChatHistoryfunc();
      }
    }
    init();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Stack
          direction={["column", "column", "row"]}
          h={"100dvh"}
          spacing={"0"}
          align={"flex-start"}
        >
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/Homepage" exact>
            <Homepage />
          </Route>

          <Route path="/Pricing" exact>
            <Pricing />
          </Route>

          <Route path="/dashboard">
            <Sidebar
              setIsExpanded={setIsExpanded}
              isExpanded={isExpanded}
              history={ChatHistory}
              chatloading={chatloading}
              setChatHistoryfunc={setChatHistoryfunc}
              SelectedChat={SelectedChat}
              setSelectedChat={setSelectedChat}
              ActiveChat={ActiveChat}
              setActiveChat={setActiveChat}
            />
            <Header setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
          </Route>

          <Route exact path="/dashboard/chat">
            <Stack
              display={["none", "none", "flex"]}
              overflowY={"auto"}
              direction={["column", "column", "row"]}
              w={"full"}
              h={"full"}
              bg={"brand.light"}
              align={"flex-start"}
            >
              <ChatSection
                ActiveChat={ActiveChat}
                updateChatHistoryfunc={updateChatHistoryfunc}
                NewChat={NewChat}
                setNewChat={setNewChat}
                newchatfunc={newchatfunc}
                ChatStatus={ChatStatus}
              />
            </Stack>
            <TabsView
              chat={
                <ChatSection
                  ActiveChat={ActiveChat}
                  updateChatHistoryfunc={updateChatHistoryfunc}
                  NewChat={NewChat}
                  setNewChat={setNewChat}
                  newchatfunc={newchatfunc}
                  ChatStatus={ChatStatus}
                />
              }
            />
          </Route>
          <Route exact path="/dashboard/profile">
            <Profile />
          </Route>

          <Route exact path="/PayFailed">
            <PaymentFailed />
          </Route>
          <Route exact path="/PaySuccess">
            <PaymentSuccessful />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/reset-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/terms">
            <Terms />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
        </Stack>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
