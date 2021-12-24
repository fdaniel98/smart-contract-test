import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Circle, Flex, Spacer, Text } from "@chakra-ui/layout";
import {
  Button,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import React from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { MdSettings } from "react-icons/md";
import Coins from "../coins/coins.json";

const Exchange = () => {
  return (
    <Flex direction="column">
      <Flex>
        <Box>
          <Flex direction="column" alignItems="flex-start">
            <Text fontSize="18px" as="strong">
              Exchange
            </Text>
            <Text color="pink" fontSize="14px">
              Trade tokens in an instant
            </Text>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Icon
            as={MdSettings}
            w={6}
            h={6}
            color="purple.400"
            style={{ cursor: "pointer" }}
          />
        </Box>
      </Flex>
      <Box
        w="100%"
        p={4}
        mt={8}
        border="1px solid rgba(185, 185, 185, 0.4)"
        borderRadius="8"
      >
        <Flex>
          <Flex direction="column">
            <Box p={2}>
              <Text color="rgba(176, 176, 176, 0.8)">From</Text>
            </Box>
            <Box p={2}>
              <Text align="left">0.0</Text>
            </Box>
          </Flex>
          <Spacer />
          <Flex direction="column">
            <Box p={2}>
              <Text color="rgba(176, 176, 176, 0.8)" align="left">
                Balance: 394.732
              </Text>
            </Box>
            <Box p={2}>
              <Flex alignItems="center">
                <Box mr="1">
                  <Button colorScheme="purple" size="xs" variant="ghost">
                    MAX
                  </Button>
                </Box>
                <Box>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      <Flex alignItems="center">
                        <Image
                          borderRadius="full"
                          boxSize="20px"
                          src={Coins[0].icon}
                          alt="Segun Adebayo"
                        />
                        <Box pr="1" pl="1">
                          {Coins[0].name}
                        </Box>
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      {Coins.map((item) => (
                        <MenuItem key={`${item.name}-key`}>
                          <Flex alignItems="center">
                            <Image
                              borderRadius="full"
                              boxSize="20px"
                              src={item.icon}
                              alt="Segun Adebayo"
                            />
                            <Box pr="1" pl="1">
                              {item.name}
                            </Box>
                          </Flex>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Circle
          style={{ cursor: "pointer" }}
          boxShadow="md"
          w="40px"
          h="40px"
          m="4"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          color="white"
        >
          <BiSortAlt2 />
        </Circle>
      </Box>
      <Box>Bottom</Box>
    </Flex>
  );
};

export default Exchange;
