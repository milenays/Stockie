import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import TagList from '../components/TagList';
import { getTags } from '../api/tagApi';

const TagPage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={5}>Tags</Heading>
      <TagList tags={tags} setTags={setTags} />
    </Box>
  );
};

export default TagPage;
