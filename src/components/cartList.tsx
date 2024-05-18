import React from 'react';
import DomainItem from './domainItem';
import { List, ListItem } from '@chakra-ui/react';
import { useStore } from '@/store/store';

const CartList = () => {
  const addDomainList = useStore((state) => state.addDomainList);
  const domainList = useStore((state) => state.domainList)

  return (
    <List spacing={3}>
      {domainList.map((domain) => (
        <ListItem key={domain.domainName}>
          <DomainItem domain={domain}/>
        </ListItem>
      ))}
    </List>
  );
};

export default CartList;
