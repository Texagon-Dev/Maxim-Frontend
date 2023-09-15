import {
  Text,
  Heading,
  VStack,
  Divider,
  Input,
  Icon,
  Spinner,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomHeading from "./components/CustomHeadings";
import ButtonCustom from "./components/Button";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { waitForOneSecond } from "./Shared/Function";
import { validate } from "./Shared/Authentication";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import FileViewer from "react-file-viewer";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Code } from "@chakra-ui/react";
import axios from "axios";

const Backend = import.meta.env.VITE_BACKEND;

const CustomErrorComponent = () => (
  <Box>An error occurred while trying to render the file.</Box>
);

function UploadSection({
  SelectedFile,
  setSelectedFile,
  setChatHistoryfunc,
  NewChat,
  setNewChat,
  newchatfunc,
  ChatStatus,
  setChatStatus,
  ActiveChat,
}) {
  const [hover, setHover] = React.useState(false);
  const [Docloading, setDocLoading] = React.useState(false);
  const [fileType, setFileType] = useState(null);
  const [txtFileContent, setTxtFileContent] = useState(null);
  const [tableContent, setTableContent] = useState(null);
  const toast = useToast();
  const fileReader = new FileReader();

  useEffect(() => {
    if (ChatStatus === 5) {
      console.log("Chat Started");
      setDocLoading(true);

      GetCurrentChatDocument();
      setChatStatus(4);
    }
  }, [ChatStatus]);

  async function GetCurrentChatDocument() {
    try {
      const access_token = (await validate()).access_token;
      const resp = await axios.post(`${Backend}/getChatDocument`, {
        access_token,
        ChatID: ActiveChat.id,
      });

      fetch(resp.data.url)
        .then((response) => response.blob())
        .then((blob) => {
          let filetype;
          if (resp.data.BookName.endsWith(".pdf")) {
            filetype = "application/pdf";
          } else if (resp.data.BookName.endsWith(".docx")) {
            filetype =
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          } else if (resp.data.BookName.endsWith(".doc")) {
            filetype = "application/msword";
          } else if (resp.data.BookName.endsWith(".txt")) {
            filetype = "text/plain";
          } else if (resp.data.BookName.endsWith(".csv")) {
            filetype = "text/csv";
          }

          const file = new File([blob], resp.data.BookName, {
            type: filetype,
          });
          const fileURL = URL.createObjectURL(file);
          setSelectedFile(fileURL);
          setFileType(file.type);

          if (file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = () => {
              setTxtFileContent(reader.result);
            };
            reader.readAsText(file);
          }

          if (file.type === "text/csv") {
            const reader = new FileReader();
            reader.onload = () => {
              const csvOutput = reader.result;
              parseCSVData(csvOutput);
            };
            reader.readAsText(file);
          }
        })
        .catch((error) => {
          console.error("Error downloading the document:", error);
        });

      return resp.data.signedUrl;
    } catch (err) {
      console.error("Error in GetCurrentChatDocument:", err);
      return null;
    }
  }

  const onClick = async (e) => {
    console.log(e.target.files[0]);

    //.docx, .doc, .txt
    const fname = e.target.files[0].name;

    if (
      !(
        fname.endsWith(".pdf") ||
        fname.endsWith(".docx") ||
        fname.endsWith(".doc") ||
        fname.endsWith(".txt") ||
        fname.endsWith(".csv")
      )
    ) {
      console.error("Invalid File Type");
      return;
    }

    let DocSize = e.target.files[0].size / 1024 / 1024;

    let currentuser = JSON.parse(localStorage.getItem("currentuser"));

    console.log(currentuser.MaxSize, " ==> ", DocSize);

    if (currentuser.bookuploads == null || currentuser.bookuploads <= 0) {
      toast({
        title: "Document Limit Reached",
        description: `Kindly Buy a  Plan  in the Profile Section to Continue`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    if (DocSize > currentuser.MaxSize) {
      toast({
        title: "Document Size Limit Reached",
        description: `Kindly Buy a  Plan  in the Profile Section to Continue`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else {
      console.log(currentuser.MaxSize, " ==> ", DocSize);
    }

    setSelectedFile(e.target.files[0]);

    let access_token = (await validate()).access_token;
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setSelectedFile(fileURL);
    setFileType(file.type);

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
        setTxtFileContent(reader.result);
      };
      reader.readAsText(file);
    }

    if (file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = () => {
        const csvOutput = reader.result;
        parseCSVData(csvOutput);
      };
      reader.readAsText(file);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("access_token", access_token);

    console.log("File Type : ", e.target.files[0].type);

    setChatStatus(1); //Processing the File

    try {
      let stream = await axios.post(Backend + "/CreateChat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setChatStatus(2); //Processing Complete Summary Generating
      setNewChat(true);
      console.log("New Chat : ", NewChat);
      newchatfunc(stream);
    } catch (error) {
      console.log(error);
      setChatStatus(3); //Processing Failed
    }
  };

  const parseCSVData = (csvOutput) => {
    const data = csvOutput.split("\n").map((row) => row.split(","));
    if (!data || data.length === 0) {
      alert("Empty CSV file or invalid format.");
      return;
    }
    const headers = data[0];
    const rows = data.slice(1); // Exclude the header row

    if (headers.length === 0) {
      alert("CSV file must have headers.");
      return;
    }

    const tableRows = rows.map((row, rowIndex) => (
      <Tr key={rowIndex} borderBottom="1px" borderColor="black">
        {row.map((cell, cellIndex) => (
          <Td key={cellIndex} borderBottom="1px" borderColor="black">
            {cell}
          </Td>
        ))}
      </Tr>
    ));

    setTableContent(
      <Table
        variant="striped"
        colorScheme="blackAlpha"
        width="full"
        marginTop={4}
        borderWidth={10}
        borderColor="black"
      >
        <Thead>
          <Tr>
            {headers.map((header, headerIndex) => (
              <Th
                key={headerIndex}
                borderBottom="1px"
                borderColor="black"
                px={2}
                py={2}
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody borderTop="1px" borderColor="black">
          {tableRows}
        </Tbody>
      </Table>
    );
  };

  function GetViewer() {
    if (SelectedFile) {
      if (fileType === "text/csv") {
        return (
          <Box
            overflowY="auto"
            h="full"
            w="full"
            bg="slate.100"
            rounded="2xl"
            p={4}
            backdropFilter="blur(20px)"
          >
            {tableContent}
          </Box>
        );
      } else if (fileType === "text/plain") {
        return (
          <Box overflowY="auto" maxH="100vh" w="full" whiteSpace="normal">
            <Code
              bg="slate.100"
              rounded="2xl"
              p={4}
              backdropFilter="blur(20px)"
              w="full"
            >
              <Text>Content of TXT file:</Text>
              <br />
              <Text>{txtFileContent}</Text>
            </Code>
          </Box>
        );
      } else if (fileType === "application/pdf") {
        return (
          <Box overflowY="auto" h="100vh" w="full">
            <iframe
              src={SelectedFile}
              width="100%"
              height="100%"
              title="File Viewer"
            ></iframe>
          </Box>
        );
      } else if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return (
          <Box w="full" h="full" overflowY="auto" bg={"white"}>
            <FileViewer
              fileType={"docx"}
              filePath={SelectedFile}
              errorComponent={<CustomErrorComponent />}
              width="100%"
            />

            {/* <DocViewer
               pluginRenderers={DocViewerRenderers}
              documents={[
                 { uri: SelectedFile, fileType: fileType || "unknown" },
               ]}
           /> */}
          </Box>
        );
      } else {
        console.log(SelectedFile);
        return (
          // <div>
          //   {/* <DocViewer
          //     pluginRenderers={DocViewerRenderers}
          //     documents={[
          //       { uri: SelectedFile, fileType: fileType || "unknown" },
          //     ]}
          //   /> */}
          // </div>
          <VStack
            spacing={"3"}
            padding={"2"}
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
          >
            {" "}
            <HStack spacing={2}>
              <Spinner size="xl" />
              Loading the Document from Supabase
            </HStack>
          </VStack>
        );
      }
    }
  }

  return (
    <>
      {SelectedFile === null ? (
        <VStack
          spacing={"3"}
          padding={"2"}
          w={"full"}
          h={"full"}
          align={"center"}
          justify={"center"}
        >
          {Docloading ? (
            <HStack spacing={2}>
              <Spinner size="xl" />
              Loading the Document from Supabase
            </HStack>
          ) : (
            <>
              <VStack
                bg={"white"}
                rounded={"lg"}
                spacing={"3"}
                padding={"4"}
                align={"center"}
                dropShadow={"2xl"}
              >
                <Icon
                  as={AiOutlineCloudUpload}
                  color={"brand.main"}
                  boxSize={"12"}
                />
                <CustomHeading
                  text={"Upload"}
                  size={"lg"}
                  marginBottom={"6"}
                  color={"brand.main"}
                />
                <VStack
                  border={"2px"}
                  borderColor={"blackAlpha.300"}
                  rounded={"lg"}
                  borderStyle={"dashed"}
                  paddingX={"6"}
                  paddingY={"6"}
                >
                  <Heading as={"p"} size={"md"} color={"brand.main"}>
                    Drag and drop your files here
                  </Heading>
                  <Text as={"p"} size={"sm"} color={"blackAlpha.600"}>
                    Supported file types: .pdf, .docx, .doc, .txt, .csv
                  </Text>
                  <Divider
                    orientation="horizontal"
                    marginTop={"6"}
                    marginBottom={"6"}
                    color={"black"}
                  />
                  <VStack w={"full"} position={"relative"} cursor={"pointer"}>
                    <ButtonCustom
                      w={"full"}
                      isExpanded={true}
                      btnName={"Upload"}
                      type={"primary"}
                      size={"lg"}
                      rightIcon={<AiOutlineCloudUpload />}
                      bg={!hover ? "brand.main" : "brand.light"}
                      color={!hover ? "white" : "brand.main"}
                      cursor={"pointer"}
                    />
                    <Input
                      onChange={onClick}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      position={"absolute"}
                      opacity={"0"}
                      top={"0"}
                      left={"0"}
                      bottom={"0"}
                      right={"0"}
                      w={"full"}
                      type={"file"}
                      variant={"unstyled"}
                      cursor={"pointer"}
                    />
                  </VStack>
                </VStack>
              </VStack>
            </>
          )}
        </VStack>
      ) : (
        <>
          {" "}
          <VStack
            spacing={"3"}
            h={"full"}
            marginTop={['8', '8', '0', '0']}
            align={"center"}
            justify={"center"}
            w={fileType === "text/csv" ? "50%" : "full"}
          >
            {GetViewer()}
          </VStack>
        </>
      )}
    </>
  );
}

export default UploadSection;
