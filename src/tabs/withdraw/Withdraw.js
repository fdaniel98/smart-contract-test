import {
    Button,
    Center,
    Flex,
    Spinner,
    Stack,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { withdraw } from "../../services/blockchain";

const Withdraw = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleWithdraw = async () => {
    const res = await withdraw((tx) => {
      setLoading(true);
      toast({
        title: "Withdraw ",
        description: `Withdraw request sended: ${tx.hash}`,
        status: "success",
        duration: null,
        position: "top-right",
        isClosable: true,
      });
    });
    if (res) {
      setLoading(false);
      return toast({
        title: "Withdraw success",
        description: `Withdraw request succeded`,
        status: "success",
        duration: null,
        position: "top-right",
        isClosable: true,
      });
    }
  };
  return (
    <Flex direction="column">
      <Center>
        <Stack>
          {loading ? (
            <Center>
              <Spinner size="md" />
            </Center>
          ) : (
            <Button
              onClick={handleWithdraw}
              rightIcon={<BiDollar />}
              colorScheme="green"
              variant="outline"
            >
              Withdraw like PRO
            </Button>
          )}
        </Stack>
      </Center>
    </Flex>
  );
};

export default Withdraw;
