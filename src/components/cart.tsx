import React from 'react';
import CartList from './cartList';
import { Button, Box, Heading, HStack, VStack, Spacer , useToast, useMediaQuery, Stack} from '@chakra-ui/react';
import { useStore } from '@/store/store';
import CartBasket from './CartBasket';
import CopyDomainsButton from './copyDomainsButton';
import FilterDomainsButton from './filterDomainsButton';
import RemoveUnavailable from './removeUnavailable';


export const Cart = () => {
  const resetList = useStore((state) => state.resetList)
  const domainList = useStore((state) => state.domainList)
  const toast = useToast()
  const numDomainsRequired = useStore((state) => state.numDomainsRequired)
  /**
   * added 'useMediaQuery' hook for setting up a responsive design on small screens so that the things doesn't break
   */
  const [isSmallScreen] = useMediaQuery('(max-width: 480px)'); 
  const clearCart = () => {
    resetList();
    toast({
      title: 'Cart is cleared',
      description:``,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const purchaseCart = () => {
    // Handle purchase logic (e.g., call API for checkout)
    console.log('Purchasing cart:', domainList);
    toast({
      title: 'Purchase is triggered',
      description:`Your domains are ready for purchase`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
    <Box as="section" className="cart" p={6} shadow="md" borderRadius="lg" width={'100%'}>
      <Stack direction={isSmallScreen?"column":"row"}>
        <Heading size="lg" as="h1">Domain Cart</Heading>
        <Spacer/>
        <CartBasket itemsInCart={domainList.length} requiredItems={numDomainsRequired} />
      </Stack>
      <CartList />
      <Stack mt={4} spacing={4} direction={isSmallScreen?"column": "row"}>
        <CopyDomainsButton/>
        <FilterDomainsButton/>
        <RemoveUnavailable/>
      </Stack>
    </Box>
    <Box as="section" className="cart" p={6} shadow="md" borderRadius="lg" width={'100%'}>
      <HStack>
        <Button size={isSmallScreen?"sm":"md"} variant="outline" onClick={clearCart}>Clear Cart</Button>
        <Spacer/>
        <Button size={isSmallScreen?"sm":"md"} colorScheme={domainList.length === 0 ? 'gray' : 'green'} onClick={purchaseCart} isDisabled={domainList.length === 0 || domainList.length!=numDomainsRequired}>
          Purchase
        </Button>
        </HStack>
    </Box>
    </>
  );
}
