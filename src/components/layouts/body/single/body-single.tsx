import { ContainerProps, Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";


interface BodySingleProps extends PropsWithChildren {
    title?: string,
    containerProps?: ContainerProps,
}

const BodySingle: FC<BodySingleProps> = ({children}: BodySingleProps) => {
    return (
        
            <Stack 
             display='flex'
             flexWrap='wrap'
             direction="column"
             justifyContent='center'
             alignItems='center' 
             bgcolor='primary.main' 
             height='100%'
             sx={{justifyContent: 'center', backgroundColor: 'primary.main', padding: '0'}}
             width='100%'
             position='relative'
             >
                {children}
            </Stack>
        
    );
};
export default BodySingle;
