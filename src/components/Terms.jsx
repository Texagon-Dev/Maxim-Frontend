"use client";
import {
  Box,
  Heading,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import YadocsHeader from "../Shared/YadocsHeader";
import YadocsFooter from "../Shared/YadocsFooter";
const Terms = () => {
  return (
    <>
      <VStack spacing={1} alignItems="center">
        <YadocsHeader />
        <Flex textAlign="center" mt={4} direction="column" align="center">
          <Heading fontSize="5xl" fontWeight="bold" mt={20}>
            Termes et conditions
          </Heading>
          <Text
            color="gray.500"
            fontSize="xl"
            mt={4}
            mb={16}
            textAlign="center"
            w="50%"
          >
            Bienvenue sur Yadoc, une application Web qui vous permet de
            télécharger et d'interagir avec vos documents PDF. Veuillez lire
            attentivement ces conditions générales car elles régissent votre
            utilisation du produit.
          </Text>
        </Flex>

        <VStack spacing={8} alignItems="center" mt={8} p={8} bg="gray.100">
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Acceptation des conditions
            </Text>
            <Text fontSize="md" mt="4">
              En accédant ou en utilisant Yadoc, vous acceptez d'être lié par
              ces termes et conditions. Si vous n'êtes pas d'accord avec ces
              termes et conditions, vous ne devez pas utiliser Yadoc.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Utilisation de Yadoc
            </Text>
            <Text fontSize="md" mt="4">
              Vous pouvez utiliser Yadoc uniquement à des fins personnelles ou
              non commerciales. Vous ne devez pas utiliser Yadoc à des fins
              illégales ou non autorisées.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Téléchargement de documents PDF
            </Text>
            <Text fontSize="md" mt="4">
              Vous pouvez télécharger des documents PDF sur Yadoc dans le but
              d'en discuter avec d'autres utilisateurs. Vous ne devez pas
              télécharger de documents PDF illégaux, diffamatoires, obscènes ou
              autrement répréhensibles.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Conduite de l'utilisateur
            </Text>
            <Text fontSize="md" mt="4">
              Vous êtes seul responsable de votre conduite sur Yadoc. Vous ne
              devez pas vous livrer à une conduite illégale, diffamatoire,
              menaçante ou abusive. Vous ne devez pas télécharger de documents
              PDF qui enfreignent les droits de propriété intellectuelle
              d'autrui.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Contenu utilisateur
            </Text>
            <Text fontSize="md" mt="4">
              Yadoc vous permet d'importer et de visualiser des documents PDF.
              Vous conservez la pleine propriété et le contrôle du contenu que
              vous importez dans l'application. Nous ne revendiquons pas la
              propriété de votre contenu, et nous ne le surveillons pas ou n'y
              accédons pas, sauf si les lois applicables l'exigent.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Autorisations d'application
            </Text>
            <Text fontSize="md" mt="4">
              Afin de fournir la fonctionnalité prévue de notre application,
              nous pouvons vous demander certaines autorisations, telles que
              l'accès au stockage ou au système de fichiers de votre appareil.
              Ces autorisations ont uniquement pour but de vous permettre
              d'importer et de visualiser des documents PDF stockés sur votre
              appareil.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Informations collectées automatiquement
            </Text>
            <Text fontSize="md" mt="4">
              Lorsque vous utilisez notre application, nous pouvons collecter
              automatiquement certaines informations, telles que des
              informations techniques sur votre appareil, des statistiques
              d'utilisation de l'application et des rapports de plantage. Ces
              informations sont collectées sous une forme anonymisée et agrégée
              et sont utilisées pour améliorer les performances, l'expérience
              utilisateur et la qualité globale de notre application.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Confidentialité
            </Text>
            <Text fontSize="md" mt="4">
              Votre vie privée est importante pour nous. Veuillez consulter
              notre politique de confidentialité pour savoir comment nous
              collectons, utilisons et protégeons vos informations personnelles.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Résiliation
            </Text>
            <Text fontSize="md" mt="4">
              Nous pouvons résilier votre utilisation de Yadoc à tout moment
              pour quelque raison que ce soit, y compris si nous pensons que
              vous avez violé ces termes et conditions.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Exclusion de garanties
            </Text>
            <Text fontSize="md" mt="4">
              Yadoc est fourni "tel quel" et "tel que disponible". Nous ne
              garantissons pas que Yadoc sera ininterrompu, sans erreur ou sans
              temps d'arrêt.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Limitation de responsabilité
            </Text>
            <Text fontSize="md" mt="4">
              Dans la mesure maximale autorisée par la loi, nous ne serons pas
              responsables des dommages directs, indirects, accessoires,
              spéciaux ou consécutifs résultant de ou liés à votre utilisation
              de Yadoc.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Droit applicable
            </Text>
            <Text fontSize="md" mt="4">
              Ces termes et conditions seront régis et interprétés conformément
              aux lois du pays ou de l'état où ils sont utilisés.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              Modifications de ces Termes et Conditions
            </Text>
            <Text fontSize="md" mt="4">
              Nous nous réservons le droit de modifier ces termes et conditions
              à tout moment sans préavis. Votre utilisation continue de Yadoc
              après toute modification de ces termes et conditions constitue
              votre acceptation des termes et conditions révisés.
            </Text>
          </Box>
        </VStack>

        <YadocsFooter />
      </VStack>
    </>
  );
};

export default Terms;
