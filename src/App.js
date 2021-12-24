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
import { useEffect, useState } from "react";
import "./App.css";
import Exchange from "./exchange/Exchange";
import { getIndexWallet, sayHelloWorld, setData } from "./services/blockchain";

function App() {
  const [word, setWord] = useState("");

  const sayHello = async () => {
    const res = await sayHelloWorld();
    setWord(res);
  };

  const setTest = async () => {
    const wallet = await getIndexWallet(0);
    const res = await setData(wallet, 'nueva-transaccion');
  };

  useEffect(() => {
    sayHello();
    setTest();
  }, []);

  return (
    <div className="App">
      <Flex direction="column">
        <Box p="8">
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Styrigon Swap
          </Text>
        </Box>
        <Spacer />
        <Box p="4">
          <Text fontSize="2x1" color="purple.400" noOfLines={3}>
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
            colorScheme="purple"
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
}

export default App;
