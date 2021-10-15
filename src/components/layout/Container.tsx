import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';

type ContainerProps = {
    children: React.ReactNode;
} & FlexProps;

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <Flex
            minH="100vh"
            direction="column"
            bg={useColorModeValue('gray.50', 'gray.800')}
            transition="0.3s ease-out"
            {...props}
        >
            {children}
        </Flex>
    );
};
