import { Box, Center ,Flex,Text} from '@chakra-ui/react';

import  notFound from './animations/notFoundAnimation.json';
import { Player } from '@lottiefiles/react-lottie-player';

const NotFound = () =>{
    return( 
        <Box>
        <Center>
            <Text fontSize={'7xl'}> הנתיב שחיפשת אינו קיים</Text>
        </Center>
        <Center >
        <Player
        
        src={notFound}
        className="player"
        loop
        autoplay
        speed={1}
        style={{ height: '90%', width: '50%' }}
        />
        </Center>
        </Box>
     


    )
}
export default NotFound



 
