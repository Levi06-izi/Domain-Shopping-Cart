import { useStore } from '@/store/store';
import { Badge, Text } from '@chakra-ui/react';

interface CartQuantityProps {
  itemsInCart: number;
  requiredItems: number;
}

const CartBasket: React.FC<CartQuantityProps> = ({ itemsInCart, requiredItems }) => {
  // Calculate remaining items
  const remainingItems = requiredItems - itemsInCart;

  return (
    <>
      <Badge width="fit-content" height={"fit-content"} colorScheme="green" variant="solid" mr={2} mt={1}>
        {itemsInCart} in Cart
      </Badge>
      <Text as="span" color= {remainingItems>=0?"gray.500":"red.500"}>
       { remainingItems>=0?`Add ${remainingItems}`:`Required only ${requiredItems}`}
      </Text>
    </>
  );
};

export default CartBasket;
