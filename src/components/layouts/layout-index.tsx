import { Box, Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import GeneralHeader from "./header/general-header";
import GeneralFooter from "./footer/general-footer";

const IndexLayout: FC <PropsWithChildren> = ({children}: PropsWithChildren) => {

    return (<>
            <Stack direction='column' height='100%'>
                <GeneralHeader variant='index'/>
                <Box display='flex' flexGrow={1} justifyContent='center' marginBottom={'5vh'}>
                    {children}
                </Box>
                <GeneralFooter />
            </Stack>
        </>
    );
};
export default IndexLayout;