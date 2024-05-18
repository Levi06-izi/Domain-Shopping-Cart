import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useStore } from '@/store/store';


const RemoveUnavailable = () => {
  const domainList = useStore((state) => state.domainList);
  const setDomainList = useStore((state) => state.setDomainList);
  const numDomainsRequired = useStore((state) => state.numDomainsRequired);
  const toast = useToast();

  const handleFilterDomains = () => {
    const availableDomains = domainList.filter((domain) => domain.available); // Filter unavailable domains
    const unavailableExit = availableDomains.length!=domainList.length?true: false
    setDomainList(availableDomains)
    // No need to call setDomainList within handleFilterDomains

    toast({
      title: unavailableExit?'Unavailable Domains Removed!': 'No Unavailable Exits',
      description:unavailableExit?`Successfully removed unavailable domains from the list.`:``,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Button onClick={handleFilterDomains} size={'sm'}>
      Remove Unavailable
    </Button>
  );
};

export default RemoveUnavailable;
