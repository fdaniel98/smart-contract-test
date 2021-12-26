import { Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { MoneyInput } from "../../components";
import { fundMe, getETHPrice, getTotal } from "../../services/blockchain";

const {
  Box,
  Flex,
  Stack,
  Button,
  Center,
  Text,
  Divider,

  Spacer,
} = require("@chakra-ui/react");

const Fundme = () => {
  const [value, setvalue] = useState(50);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);
  const toast = useToast();

  const ethValue = value / ethPrice;

  const handleTotal = async () => {
    const total = await getTotal();
    setTotal(total);
  };

  const handleETHPrice = async () => {
    const price = await getETHPrice();
    setEthPrice(price);
  };

  const handleFundMe = async () => {
    try {
      window.ethereum.request({ method: "eth_requestAccounts" });
      const res = await fundMe(ethValue, (tx) => {
        setLoading(true);
        toast({
          title: "Sended",
          description: `Transaction sended: ${tx.hash}`,
          status: "success",
          duration: null,
          position: "top-right",
          isClosable: true,
        });
      });
      if (res) {
        toast({
          title: "Success",
          description: "Transaction success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        setvalue(50);
        await handleTotal();
      }
    } catch (error) {
      setLoading(false);
      return toast({
        title: "Fail",
        description: "An error occurred on the transaction",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleTotal();
    handleETHPrice();
  }, []);

  return (
    <Flex direction="column">
      <Center>
        <Stack>
          <Box>
            <Stack spacing={3}>
              <Text
                bgGradient="linear(to-l, #00ff06, #000000)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="extrabold"
              >
                Total: ${(total * ethPrice).toFixed(2)} USD
              </Text>
              <Text>
                <strong>on ETH:</strong> {Number(total).toFixed(4)}
              </Text>
              <Text
                bgGradient="linear(to-l, #00ff06, #000000)"
                bgClip="text"
                fontSize="sm"
                fontWeight="extrabold"
              >
                ETH Price: ${ethPrice} USD
              </Text>
              <Divider />
            </Stack>
          </Box>
          <Spacer />
          <Box>
            <Stack spacing={3}>
              <MoneyInput setValue={setvalue} value={value} />
              <Text>
                <strong>on ETH:</strong> {ethValue.toFixed(4)}
              </Text>
              <Text fontSize="xs" align={"center"}>
                <strong>
                  <span>&#8226;</span>Min:
                </strong>{" "}
                $50 <span>&#8226;</span>
                <strong> Max:</strong> $5000
              </Text>
              {loading ? (
                <Center>
                  <Spinner size="md" />
                </Center>
              ) : (
                <Button
                  onClick={handleFundMe}
                  className="transitions"
                  leftIcon={<BiDollarCircle />}
                  colorScheme="teal"
                  variant="solid"
                  bgGradient="linear(to-l, #00ff06, #000000)"
                  _hover={{
                    bgGradient: "linear(to-l, #00ff06, #000000, #000000)",
                  }}
                  _active={{ bgGradient: "linear(to-l, #00ff06, #000000)" }}
                >
                  Fund me
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Flex>
  );
};

export default Fundme;
