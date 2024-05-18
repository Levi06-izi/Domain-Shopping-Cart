import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useStore } from '@/store/store';

const prioritizeDomains = (domains: any[]): any[] => {
  const domainMap = new Map<string, number>(); // Map domain endings to priorities
    domainMap.set('com', 1)
    domainMap.set('app', 2)
    domainMap.set('xyz', 3)

    const newList = domains.slice().sort((domA: any, domB: any) => {
    const endingA = domA.domainName.split('.').pop() || ''
    const endingB = domB.domainName.split('.').pop() || ''

    // Retrieve priorities from the Map (efficient lookup)
    const priorityA = domainMap.get(endingA) || Infinity
    const priorityB = domainMap.get(endingB) || Infinity

    if (priorityA !== priorityB) {
      return priorityA - priorityB; // Lower priority comes later
    }
    console.log(domA.domainName.length- domB.domainName.length)
    // If priorities are the same, sort by length (shorter wins)
    return domA.domainName.length - domB.domainName.length;
  });
  return newList;
};

const FilterDomainsButton = () => {
    const domainList = useStore((state) => state.domainList);
    const setDomainList = useStore((state) => state.setDomainList);
    const numDomainsRequired = useStore((state) => state.numDomainsRequired);
    const toast = useToast();

    const handleFilterDomains = () => {
    const filteredDomains = prioritizeDomains(domainList).slice(0, numDomainsRequired); // Sort and keep top N
    setDomainList(filteredDomains);

    toast({
      title: 'Domains Filtered!',
      description: `Kept the top ${numDomainsRequired} domains based on priority and length.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Button size={'sm'} onClick={handleFilterDomains} isDisabled={domainList.length <= numDomainsRequired}>
      Best {numDomainsRequired} Domains
    </Button>
  );
};

export default FilterDomainsButton;
