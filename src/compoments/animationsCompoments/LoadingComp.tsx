import { Box, Center ,Text} from '@chakra-ui/react';
import  loading from './animations/loadingAnimation.json';
import { Player } from '@lottiefiles/react-lottie-player';

const Loading = () => {

    return( 
        <Box bgColor={'green.700'}>
        <Center>
            <Text fontSize={'7xl'}>אנא המתן</Text>
        </Center>
        <Center >
        <Player
        
        src={loading}
        className="player"
        loop
        autoplay
        speed={0.5}
        style={{ height: '90%', width: '50%' }}
        />
        </Center>
        </Box>
     


    )
}
export default Loading