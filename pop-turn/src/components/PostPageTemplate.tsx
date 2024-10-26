import React from 'react'
import CardComponent from './card';
import { Flex,Box } from '@chakra-ui/react';

type PostPageTemplateProps = {
  type: "Posts" | "MyPosts" | "Favorites";
};
const now = new Date();

export const PostPageTemplate = (props: PostPageTemplateProps) => {
  const data = [
    ["イベント１", "変換された文章１", ["1", "2", "3"], now, true, 100, null],
    ["イベント２----------------------------", "変換された文章２", ["4", "5", "6"], now, false, 200, null],
    ["イベント３--------------------------------------------------------------------------------------------------------", "変換された文章３", ["7", "8", "9"], now, true, 300, null],
    ["イベント４", "変換された文章４", ["10", "11", "12"], now, false, 400, null],
    ["イベント５", "変換された文章５", ["13", "14", "15"], now, false, 400, null],
    ["イベント６", "変換された文章６", ["16", "17", "18"], now, false, 400, null],
  ];

  return (
    <Flex flexWrap="wrap" justifyContent="space-between" alignItems="flex-start">
      <Box width="48%">
        {data.filter((_, index) => index % 2 === 0).map((d, index) => (
          <Box key={index} mb="4">
            <CardComponent
              event={d[0]}
              converted={d[1]}
              tags={d[2]}
              date={d[3]}
              isFavorited={d[4]}
              FavoritedNumber={d[5]}
              setisFavorited={d[6]}
            />
          </Box>
        ))}
      </Box>
      <Box width="48%">
        {data.filter((_, index) => index % 2 !== 0).map((d, index) => (
          <Box key={index} mb="4">
            <CardComponent
              event={d[0]}
              converted={d[1]}
              tags={d[2]}
              date={d[3]}
              isFavorited={d[4]}
              FavoritedNumber={d[5]}
              setisFavorited={d[6]}
            />
          </Box>
        ))}
      </Box>
    </Flex>
  )
}
