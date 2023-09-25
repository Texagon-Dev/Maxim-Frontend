import React, { useState, useEffect } from "react";
import { VStack, Image, Icon, Stack, Grid, HStack } from "@chakra-ui/react";
import { CiFileOn } from "react-icons/ci";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";
import pic4 from "../assets/pic4.png";
import pic6 from "../assets/pic6.png";
import YadocsHeader from "../Shared/YadocsHeader";
import CustomHeadings from "../components/CustomHeadings";
import Paragraph from "../components/Paragraph";
import InputField from "../components/InputField";
import ButtonCustom from "../components/Button";
import YadocsFooter from "../Shared/YadocsFooter";

export default function Homepage() {
  const [ContentArr, setContentArr] = useState([
    {
      title: "Gain de temps : accédez instantanément aux informations clés",
      desc: "Notre plateforme révolutionne votre façon de travailler avec vos documents, vous faisant gagner un temps précieux. En synthétisant vos documents, vous allez pouvoir accéder rapidement aux informations les plus pertinentes sans passer des heures à chercher dans de longs documents.",
      picture: pic1,
    },
    {
      title: "Productivité améliorée : absorber et décider efficacement",
      desc: "Dites adieu à la surcharge dinformations et accueillez un flux de travail rationalisé. Nos algorithmes dIA condensent vos documents complexes dans des formats digestibles, ce qui vous permet de comprendre et dabsorber plus facilement et rapidement de gros volumes dinformations.",
      picture: pic2,
    },
    {
      title:
        "Compréhension améliorée : saisissez rapidement les concepts de base",
      desc: "Avec notre solution, vous pouvez débloquer un niveau de compréhension plus profond, facilitant une meilleure prise de décision et la rétention des connaissances.",
      picture: pic3,
    },
    {
      title: "Hébergé en Europe pour une protection optimale des données",
      desc: "Nos mesures de sécurité intègrent des mécanismes dauthentification robustes, des protocoles de transfert de données sécurisés et des contrôles daccès avancés. Ces mises en œuvre techniques garantissent que vos documents restent confidentiels et protégés contre tout accès non autorisé.",
      picture: pic4,
    },
  ]);

  return (
    <>
      <VStack spacing={24} align="center" width="full" minHeight="100vh">
        <YadocsHeader />
        <VStack
          spacing={12}
          px={["4", "8", "12", "12"]}
          align="center"
          width="full"
          minHeight="100vh"
        >
          {/* heading */}
          <CustomHeadings
            w={["full", "full", "70%", "60%"]}
            text={"Révolutionnez vos interactions avec les documents"}
            size={"3xl"}
            color={"brand.main"}
            textAlign={"center"}
          />
          <Paragraph
            text={
              "Libérer le plein potentiel de vos documents n'a jamais été aussi simple ! Téléchargez simplement votre document et notre chatbot le synthétise.Trouvez la réponse à votre question en intéragissant directement avec notre chatbot."
            }
            w={["full", "full", "70%", "60%"]}
            textAlign={"center"}
          />
          <VStack
            padding={"4"}
            bg={"brand.light"}
            w="full"
            rounded={"lg"}
            dropShadow={"lg"}
          >
            <VStack
              spacing={4}
              align="center"
              width="full"
              border={"1px"}
              paddingY={"4"}
              borderStyle={"dashed"}
              borderRadius={"lg"}
              borderColor={"brand.main"}
              bg="whiteAlpha.400"
              paddingX={"4"}
            >
              <CustomHeadings
                text="Importer votre document"
                size={["md", "lg", "xl", "xl"]}
                color={"brand.main"}
                textAlign={"center"}
              />
              <Icon
                as={CiFileOn}
                w={["12", "16", "20", "20"]}
                h={["12", "16", "20", "20"]}
                color={"brand.main"}
              />
              <Paragraph
                text={"ou deposer votre fichier ici"}
                color={"brand.main"}
                textAlign={"center"}
              />
              <Paragraph
                text={`Formats autorisés : \'.pdf', '.txt', '.ppt', '.pptx', '.doc', 'docx`}
                color={"blackAlpha.500"}
                textAlign={"center"}
              />
            </VStack>

            <HStack>
              <ButtonCustom
                isExpanded={true}
                size={"lg"}
                type={"primary"}
                w="full"
                btnName={"Get Started"}
                onClick={() => {
                  window.location.href = "/dashboard/chat";
                }}
              />
            </HStack>
          </VStack>
          <Stack
            direction={["column", "column", "row", "row"]}
            spacing={4}
            align="center"
            justify={"center"}
            w="full"
          >
            <Image
              src={pic6}
              alt={"pic5"}
              w={["24", "32", "40", "40"]}
              objectFit={"contain"}
            />
            <Paragraph
              text={"Rejoignez notre liste d'attente 450+"}
              color={"brand.main"}
              textAlign={"center"}
            />
          </Stack>
          <Stack
            direction={"column"}
            marginTop={"12"}
            spacing={12}
            w="full"
            align="center"
            justify={"center"}
          >
            {ContentArr.map((item, index) => (
              <Stack
                direction={["column", "column", "column", "row"]}
                key={index}
                spacing={6}
                align="center"
                justify={"center"}
                w="full"
              >
                <VStack
                  spacing={4}
                  align="center"
                  justify={"center"}
                  w="full"
                  padding={"4"}
                >
                  <CustomHeadings
                    text={item.title}
                    color={"brand.main"}
                    textAlign={"left"}
                  />
                  <Paragraph
                    text={item.desc}
                    color={"blackAlpha.500"}
                    textAlign={"left"}
                  />
                </VStack>
                <Image
                  src={item.picture}
                  alt={"pic5"}
                  w="full"
                  h="full"
                  objectFit={"contain"}
                />
              </Stack>
            ))}
          </Stack>
          <VStack
            bg="brand.light"
            spacing={4}
            rounded={"lg"}
            dropShadow={"lg"}
            align="center"
            justify={"center"}
            w="full"
            paddingY={"8"}
            paddingX={["4", "4", "36", "36"]}
          >
            <CustomHeadings
              text={
                "Révolutionnez l'expérience avec vos documents. Inscrivez-vous à la beta dès maintenant !"
              }
              size={["md", "lg", "xl", "xl"]}
              color={"brand.main"}
              textAlign={"center"}
            />
            <InputField
              label={"Nom"}
              placeholder={"Enter your name"}
              type={"text"}
            />
            <InputField
              label={"Email"}
              placeholder={"Enter your email"}
              type={"email"}
            />
            <ButtonCustom
              isExpanded={true}
              size={"lg"}
              type={"primary"}
              w="full"
              btnName={"S'inscrire"}
            />
            <HStack w="full" align={"center"} justify={"center"}>
              <Image
                src={pic6}
                alt={"pic5"}
                w={["24", "32", "40", "40"]}
                objectFit={"contain"}
              />
              <Paragraph
                text={"Rejoignez notre liste d'attente 450+"}
                color="blackAlpha.500"
              />
            </HStack>
          </VStack>
        </VStack>
        <YadocsFooter />
      </VStack>
    </>
  );
}
