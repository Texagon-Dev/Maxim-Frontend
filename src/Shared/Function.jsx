import supabase from "./Supabase";
import axios from "axios";
import { validate } from "./Authentication";

const Backend = import.meta.env.VITE_BACKEND;

export async function GetPaymentListLink(ret_url) {
  const access_token = (await validate()).access_token;
  if (!access_token) return null;
  try {
    const resp = await axios.post(`${Backend}/getpaymentlist`, {
      access_token,ret_url
    });

    return resp.data;
  } catch (err) {
    return null;
  }
}

export async function waitForOneSecond() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
}

export async function UpdateChatHist(ChatID, messages) {
  try {
    const UUID = (await validate()).user.id;
    if (!UUID) return null;
    await axios.post(`${Backend}/UpdateChat`, { UUID, ChatID, messages });
  } catch (err) {
    console.error("Error updating chat history:", err);
    return null;
  }
}

export async function GetRequest(query, ChatID) {
  try {
    const access_token = (await validate()).access_token;
    if (!access_token) return null;

    const resp = await axios.post(`${Backend}/chat`, {
      access_token,
      query,
      ChatID,
    });

    const data = resp.data.result.result;
    const PageNoArr = [];
    const sourceDocuments = resp.data.result.sources;
    for (const sourceDoc of sourceDocuments) {
      PageNoArr.push(sourceDoc.loc.pageNumber);
    }
    const uniqueArray = [...new Set(PageNoArr)].sort((a, b) => a - b);

    return {
      data,
      source: uniqueArray.length > 0 ? uniqueArray : "",
    };
  } catch (err) {
    console.error("Error in GetRequest:", err);
    return {
      data: "",
      source: [],
    };
  }
}


export async function GetAllChats() {
  try {
    let access_token = (await validate()).access_token;
    const resp = await axios.post(`${Backend}/GetAllChats`, { access_token });

    if(resp.status === 401){
      localStorage.clear();
      window.location.href = "/login";
    }

    return resp.data.sort((a, b) => b.id - a.id);
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function DelChat(ChatID) {
  try {
    let access_token = (await validate()).access_token;
    axios.post(`${Backend}/DelChat`, { access_token, ChatID });
  } catch (err) {
    console.log(err);
  }
}

export async function EditChat(ChatID, ChatName) {
  try {
    let access_token = (await validate()).access_token;
    axios.post(`${Backend}/EditChat`, { access_token, ChatID, ChatName });
  } catch (err) {
    console.log(err);
  }
}
