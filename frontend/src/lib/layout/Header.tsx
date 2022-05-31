import { Box, Flex, Heading,IconButton, chakra, HStack, Button, VStack, CloseButton, VisuallyHidden, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineMenu } from 'react-icons/ai';

import ThemeToggle from "./ThemeToggle";


function Header() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <chakra.header
      bg={bg}
      w="full"
      py={4}
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <Flex>
          <chakra.a
            href="/"
            title="Choc Home Page"
            display="flex"
            alignItems="center"
          >
            <Heading size="xl" fontWeight="medium" ml="2">
              Book System
          </Heading>
          </chakra.a>
        </Flex>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.500"
            display={{ base: "none", md: "inline-flex" }}
          >
            <ThemeToggle />
            <Button variant="ghost">Header 1</Button>
            <Button variant="ghost">Header 2</Button>
            <Button variant="ghost">Header 3</Button>
          </HStack>
          <Box display={{ base: "inline-flex", md: "none" }}>
          <ThemeToggle />
          <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />

              <Button w="full" variant="ghost">
                Header 1
              </Button>
              <Button w="full" variant="ghost">
                Header 2
              </Button>
              <Button w="full" variant="ghost">
                Header 3
              </Button>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </chakra.header>
  );
}



export default Header;
