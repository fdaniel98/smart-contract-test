import {
  Box,
  Button,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState } from "react";
import "./App.css";
import CHAINS from "./blockchain/chains/chains.json";
import Fundme from "./tabs/fundme/Fundme";
import Swap from "./tabs/swap/Swap";
import Withdraw from "./tabs/withdraw/Withdraw";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isConnected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [chain, setChain] = useState(null);
  const [account, setAccount] = useState(null);

  const connectToMetamask = () => {
    window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const onConnect = () => {
    window.ethereum.on("connect", (info) => {
      console.log("ON CONNECT");
      setChain(CHAINS[info.chainId]);
      setConnected(window.ethereum.isConnected());
    });
  };

  const onDisconnect = () => {
    window.ethereum.on("disconnect", (error) => {
      console.log("ERROR..", error);
      console.log("ON DISCONNECT");
    });
  };

  const checkChain = async () => {
    window.ethereum.on("chainChanged", (chainId) => {
      console.log("CHAIN...", window.chain);
      window.location.reload();
    });
  };

  const onChangeAccount = async () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
      console.log("ACCOUNTS...", accounts);
    });
  };

  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setLoading(false);
  };

  const checkProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      checkChain();
      onConnect();
      onDisconnect();
      getAccount();
      onChangeAccount();
    }
    setProvider(provider);
  };

  useEffect(() => {
    checkProvider();
  }, []);

  return (
    <div className="App">
      {" "}
      <Flex direction="column">
        <Box p="8">
          <Text
            bgGradient="linear(to-l, #00ff06, #000000)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Smart contract practice
          </Text>
        </Box>
        <Box p="8">
          <Stack>
            <Text>
              Connected on: <strong>{chain}</strong>
            </Text>
            <Text>
              Account: <strong>{account}</strong>
            </Text>
          </Stack>
        </Box>
      </Flex>
      {provider ? (
        <>
          {!isConnected ? (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={connectToMetamask}
            >
              Connect to metamask
            </Button>
          ) : (
            <Tabs isFitted variant="enclosed" color="gray">
              <TabList mb="1em">
                <Tab>Fund me</Tab>
                <Tab>Styrigon swap</Tab>
                <Tab>Lottery</Tab>
                <Tab>Withdraw</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Fundme account={account} />
                </TabPanel>
                <TabPanel>
                  <Swap />
                </TabPanel>
                <TabPanel>
                  <p>Lottery</p>
                </TabPanel>
                <TabPanel>
                  <Withdraw />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </>
      ) : (
        <div>Need metamask</div>
      )}
    </div>
  );
};

export default App;
