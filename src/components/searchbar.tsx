import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Button, Box , Text, useToast} from '@chakra-ui/react';
import useKeyPress from '@/utils/useKeyPress';
import { useStore } from '@/store/store';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Callback for handling search term
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const addDomainList = useStore((state) => state.addDomainList);
  const domainList = useStore((state) => state.domainList)
  const [searchTerm, setSearchTerm] = useState('');
  const [isError, setIsError] = useState(false);
  const toast = useToast()

  const  handleSearchSubmit =async () => {
    if(searchTerm == '' )return;
    const isValid = isValidTerm(searchTerm);
    if(isValid && searchTerm) {
        // onSearch(searchTerm); //callback invoke if needed
        const isAdded = await addDomainList(domainList, searchTerm);
        if (isAdded){
          toast({
          title: 'Added domain to cart',
          status: 'success',
          duration: 3000,
        isClosable: true,
        });
        setSearchTerm('')
      }
    }
    else{
        setIsError(true);
    }
  };
  const ref = useKeyPress('Enter', handleSearchSubmit);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const isValidTerm = (term: string) => {
    const regex = /^[a-zA-Z]+\.(com|app|xyz|COM|APP|XYZ)$/; // Regex for domain format (example.com or example.abc)
    return regex.test(term);
  }

  return (
    <Box display="flex" alignItems="center" mb={4} width={'100%'}>
        <Input 
            ref={ref}
            value={searchTerm}
            onChange={handleSearchChange} 
            placeholder="Search..." 
            mr={2}
            isInvalid={isError}
            onFocus={() => setIsError(false)}
        />
      <Button onClick={handleSearchSubmit}>Add</Button>
      {isError && (
        <Text color="red.500" fontSize="sm" ml={2} id="search-error">
          Invalid domain format. Please enter a valid domain (e.g., example.com, example.xyz or example.app)
        </Text>
      )}
    </Box>
  );
};

export default SearchBar;