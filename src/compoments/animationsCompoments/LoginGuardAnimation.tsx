import { Box, Center ,Flex,Text} from '@chakra-ui/react';
import  login from './animations/loginAnimation.json';
import { Player } from '@lottiefiles/react-lottie-player';

const LoginGuard = () =>{
    return( 
        <Box bg="green.800"
        >
        <Player
        src={login}
        className="player"
        loop
        autoplay
        
        speed={1}

        style={{ height: '10%', width: '10%' }}
        />
        <Center>
        <Text fontSize={'3xl'} fontFamily={'monospace'} color={'whiteAlpha.900'}>אתר השמירות של תל השומר</Text>

        </Center>
        </Box>
     


    )
}
export default LoginGuard



 
