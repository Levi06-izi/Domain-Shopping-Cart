import React, { memo } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useStore } from '@/store/store';

//memoised the component f0r better use case
const CopyDomainsButton = memo(() =>{
  const toast = useToast();
  const domainList = useStore((state) => state.domainList)
  const domainStrings = domainList.map((domainInfo:any) => {
    return domainInfo.domainName
  })
  const handleCopyToClipboard = () => {
    const domainsString = domainStrings.join(', '); // Join domains with commas
    navigator.clipboard.writeText(domainsString).then(() => {
      toast({
        title: 'Domains Copied!',
        description: 'The domains have been copied to your clipboard.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, (error) => {
      toast({
        title: 'Copy Failed',
        description: 'An error occurred while copying domains.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <Button size={'sm'} onClick={handleCopyToClipboard} disabled={!domainList.length}>
      Copy Domains
    </Button>
  );
});

export default CopyDomainsButton;
