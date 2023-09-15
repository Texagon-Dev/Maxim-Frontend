"use client";
import {
  Box,
  Heading,
  Button,
  Flex,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import YadocsHeader from "../Shared/YadocsHeader";
import YadocsFooter from "../Shared/YadocsFooter";

const Privacy = () => {
  return (
    <>
      <VStack>
        <Flex direction="column" justify="center" align="center">
          <YadocsHeader />
        </Flex>
        <Flex textAlign="center" mt={4} direction="column" align="center">
          <Heading fontSize="5xl" fontWeight="bold" mt={20}>
            Politique de confidentialité
          </Heading>
          <Text
            color="gray.500"
            fontSize="xl"
            mt={4}
            mb={16}
            textAlign="center"
            w="50%"
          >
            Chez Yadoc, nous nous engageons à protéger votre vie privée et à
            assurer la sécurité de toutes les informations personnelles que vous
            nous fournissez. Cette politique de confidentialité décrit nos
            pratiques concernant la collecte, l'utilisation, la divulgation et
            la protection des informations personnelles lorsque vous utilisez
            notre site Web ou tout service proposé par Yadoc (désignés
            collectivement par le "service").
          </Text>
        </Flex>
        <VStack spacing={8} alignItems="center" mt={8} p={8} bg="gray.100">
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              1. Informations que nous recueillons
            </Text>
            <Text fontSize="md" mt="4">
              1.1 Informations personnelles : Lorsque vous utilisez notre
              Service, nous pouvons collecter des informations personnelles que
              vous fournissez volontairement, telles que votre nom, votre
              adresse e-mail et toute autre information que vous choisissez de
              fournir lorsque vous nous contactez ou utilisez des
              fonctionnalités spécifiques de notre Service.
              <br />
              1.2 Informations d'utilisation : Nous pouvons collecter des
              informations sur vos interactions avec notre Service, y compris
              votre adresse IP, le type de navigateur, le système
              d'exploitation, les URL de référence et d'autres informations
              d'utilisation. Ces données sont collectées automatiquement via des
              cookies, des balises Web et des technologies similaires.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              2. Utilisation des informations
            </Text>
            <Text fontSize="md" mt="4">
              2.1 Fournir et améliorer notre service : nous pouvons utiliser les
              informations que nous recueillons pour fournir et améliorer notre
              service, répondre aux demandes de renseignements, traiter les
              transactions, personnaliser votre expérience et analyser et
              améliorer la fonctionnalité et les performances de notre service.
              <br />
              2.2 Communication : Nous pouvons utiliser vos informations
              personnelles pour communiquer avec vous, vous envoyer des mises à
              jour importantes, des newsletters, du matériel promotionnel et
              d'autres informations relatives à notre Service. Vous pouvez
              refuser de recevoir de telles communications à tout moment en
              suivant les instructions de désabonnement fournies dans la
              communication.
              <br />
              2.3 Données agrégées : Nous pouvons agréger et anonymiser les
              données collectées via notre Service pour générer des informations
              statistiques ou analytiques. Ces données agrégées ne vous
              identifient pas personnellement et peuvent être utilisées à
              diverses fins, notamment la recherche, le marketing ou
              l'amélioration de notre service.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              3. Partage d'informations
            </Text>
            <Text fontSize="md" mt="4">
              3.1 Fournisseurs de services : nous pouvons partager vos
              informations personnelles avec des fournisseurs de services tiers
              de confiance qui nous aident à exploiter notre service, à mener
              des activités commerciales en notre nom ou à vous fournir des
              services. Ces prestataires de services sont contractuellement
              tenus de traiter vos informations personnelles de manière
              sécurisée et confidentielle et il leur est interdit de les
              utiliser à d'autres fins.
              <br />
              3.2 Exigences légales : nous pouvons divulguer vos informations
              personnelles si la loi, la réglementation, une procédure
              judiciaire ou une demande gouvernementale l'exige. Nous pouvons
              également divulguer des informations si nous estimons que cela est
              nécessaire pour protéger nos droits, notre propriété ou notre
              sécurité, ou les droits, la propriété ou la sécurité d'autrui.
              <br />
              3.3 Transferts d'entreprise : en cas de fusion, d'acquisition ou
              de vente de tout ou partie de nos actifs, nous pouvons transférer
              vos informations personnelles au tiers concerné dans le cadre de
              la transaction. Nous vous informerons par e-mail ou par un avis
              visible sur notre site Web de tout changement de propriété ou de
              contrôle.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              4. Sécurité des données
            </Text>
            <Text fontSize="md" mt="4">
              Nous prenons des mesures raisonnables pour protéger la sécurité de
              vos informations personnelles et empêcher tout accès, utilisation
              ou divulgation non autorisés. Cependant, aucune méthode de
              transmission ou de stockage n'est sécurisée à 100 %, et nous ne
              pouvons garantir la sécurité absolue de vos informations.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              5. Liens tiers
            </Text>
            <Text fontSize="md" mt="4">
              Notre service peut contenir des liens vers des sites Web ou des
              services tiers qui ne sont ni exploités ni contrôlés par nous.
              Cette politique de confidentialité ne s'applique pas à ces sites
              Web ou services tiers. Nous vous recommandons de consulter les
              politiques de confidentialité de tous les sites tiers que vous
              visitez.
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontWeight="bold"
              fontSize={["2xl", "2xl", "5xl"]}
              mt={["16", "16", "20"]}
            >
              6. Modifications de cette politique de confidentialité
            </Text>
            <Text fontSize="md" mt="4">
              Nous pouvons mettre à jour cette politique de confidentialité de
              temps à autre. La version révisée entrera en vigueur à la date
              indiquée au début de cette politique. Nous vous encourageons à
              consulter régulièrement cette politique pour rester informé de nos
              pratiques en matière d'information.
            </Text>
          </Box>
        </VStack>
        <YadocsFooter />
        
      </VStack>
    </>
  );
};

export default Privacy;
