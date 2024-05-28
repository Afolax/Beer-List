// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Container, Heading, Input, SimpleGrid, Image, Text } from '@chakra-ui/react';

// const App = () => {
//   const [beers, setBeers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     axios.get('https://api.sampleapis.com/beers/ale')
//       .then(response => {
//         setBeers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//       });
//   }, []);

//   const handleSearch = event => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredBeers = beers.filter(beer =>
//     beer.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container maxW="container.xl" p={4}>
//       <Heading mb={4}>Beer List</Heading>
//       <Input 
//         placeholder="Search for a beer" 
//         mb={4} 
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
//         {filteredBeers.map(beer => (
//           <Box key={beer.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
//             <Image src={beer.image} alt={beer.name} boxSize="150px" objectFit="cover" mx="auto" />
//             <Box p={4}>
//               <Heading fontSize="xl" mb={2}>{beer.name}</Heading>
//               <Text>{beer.description}</Text>
//             </Box>
//           </Box>
//         ))}
//       </SimpleGrid>
//     </Container>
//   );
// };

// export default App;


// src/App.js

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Image,
  Text,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import useFetchBeers from './hooks/useFetchBeers';



const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { beers, loading, error } = useFetchBeers();
  const [currentPage, setCurrentPage] = useState(0);

  const beersPerPage = 21;
  const offset = currentPage * beersPerPage;
  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBeers.length / beersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to first page on search
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />Error fetching data</Alert>;

  return (
    <Container maxW="container.xl" p={4}>
      <Heading mb={4}>Beer List</Heading>
      <Input 
        placeholder="Search for a beer" 
        mb={4} 
        value={searchTerm}
        onChange={handleSearch}
      />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredBeers.slice(offset, offset + beersPerPage).map(beer => (
          <Box key={beer.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={beer.image ||  'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png' } alt={beer.name} boxSize="150px" objectFit="cover" mx="auto" />
            <Box p={4}>
              <Heading fontSize="xl" mb={2}>{beer.name}</Heading>
              <Text>{beer.description}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Box>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </Box>
    </Container>
  );
};

export default App;
