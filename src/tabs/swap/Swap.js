import {
    Box,
    Flex,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import { useState } from "react";
import Exchange from "../../exchange/Exchange";

const Swap = () => {
  const [word, setWord] = useState("");

  return (
    <div className="App">
      <Flex direction="column">
        <Box p="8">
          <Text
            bgGradient="linear(to-l, #00ff06, #000000)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Styrigon Swap
          </Text>
        </Box>
        <Spacer />
        <Box p="4">
          <Text fontSize="2x1" color="green.400" noOfLines={3}>
            Up to 90% of the trading commission is returned in STY tokens,{" "}
            <br /> 10% is credited to your STY Boost. You can change the
            percentage.
          </Text>
        </Box>
      </Flex>

      <Flex>
        <Spacer />
        <Box boxShadow="xl" p="6" rounded="md" bg="white" w="35%">
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            align="center"
            isFitted
          >
            <TabList>
              <Tab>Exchange</Tab>
              <Tab>Liquidity</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Exchange />
              </TabPanel>
              <TabPanel>
                <p>Liquidity</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Spacer />
      </Flex>
    </div>
  );
};

export default Swap;
