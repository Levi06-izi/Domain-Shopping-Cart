import React, { useState } from 'react';
import { Box, Text, Stack, Spacer, Tag, Button, IconButton, Input, useToast, useMediaQuery } from '@chakra-ui/react';
import { useStore } from '@/store/store';
import { EditIcon } from '@chakra-ui/icons';
import { isValidTerm } from '@/utils/isValid';
import useKeyPress from '@/utils/useKeyPress';
interface DomainItemProps {
  domain: { domainName: string; available: boolean };
}

const DomainItem: React.FC<DomainItemProps> = ({ domain }) => {
  const removeDomain = useStore((state) => state.removeDomain);
  const updateDomain = useStore((state) => state.updateDomain);
  /**
   * added 'useMediaQuery' hook for setting up a responsive design on small screens so that the things doesn't break
   */
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)'); 
  const [onBox, setOnBox] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const backgroundColor = domain.available ? 'green.400' : 'gray.400';
  const [value, setValue] = useState<string>(domain.domainName)
  const toast = useToast()
  console.log(value, "newvalue")
  const handleUpdateDomain = async () => {
    if(isValidTerm(value)){
      //update using new function
      const isUpdated =await updateDomain(domain.domainName, value);
      setEdit(false);
      if(isUpdated)
      toast({
        title: "Domain Updated!",
        description:"",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }
  const ref = useKeyPress('Enter',handleUpdateDomain);
  return (
    <Box 
      as="article"
      className="domain-item" 
      borderWidth={1} p={3} 
      borderRadius="md" 
      overflow="hidden"
      onMouseEnter={() => setOnBox(true)}
      onMouseLeave={() => setOnBox(false)}
    > 
    <Stack direction={!isSmallScreen?"row":"column"}>
    <Stack direction="row" spacing={4} alignItems="top">
      {edit ? 
      <Input 
        value={value}
        onChange={(event:React.ChangeEvent<HTMLInputElement>)=> {
          setValue(event.target.value)
        }}
        mr={2}
        size={'sm'}
        isInvalid={!isValidTerm(value)}
        ref={ref}
      />
      :
      <Text whiteSpace="nowrap"overflow="hidden" textOverflow="ellipsis" width="100px">{domain.domainName}</Text>
      }
      {edit && 
      <Button 
        size="sm" 
        colorScheme="green" 
        variant="ghost" 
        onClick={handleUpdateDomain}
      >
        Save
      </Button>}
      {!edit && <IconButton
          size="sm"
          icon={<EditIcon />}
          visibility={onBox? "visible": "hidden"} // Initially hidden
          onClick={() => setEdit(true)} 
          aria-label={''}      
      />}
    </Stack>
    <Spacer/>
    <Stack direction={"column"} spacing={2} alignItems={isSmallScreen?"left":"flex-end"}> {/* Vertical stack for availability and remove */}
      <Tag variant="solid" bg={backgroundColor} width={"fit-content"}>
        {domain.available ? 'Available' : 'Unavailable'}
      </Tag>
      <Button size="sm" colorScheme="red" variant="ghost" onClick={() => removeDomain(domain.domainName)}>
        Remove
      </Button>
    </Stack>
    </Stack>
  </Box>
  );
};

export default DomainItem;
