import { FC } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import LogoDmh from "@/components/logoDmh";
import HeaderButtons from "./header-buttons";
import HeaderAvatar from "./header-avatar";



type Props = {
    variant?: "index" | "signIn" | "home" | null
}

const GeneralHeader: FC<Props> = ({ variant }: Props) => {

    const logoColor: string = variant === 'index' || variant === 'home' ? '#C1FD35' : '#201F22';

    return (
        <AppBar data-testid="appbar" position="sticky" color={variant === 'index' || variant === 'home' ? 'primary' : 'secondary'} sx={{ boxShadow: 'none', zIndex: 10, padding: '0', height: '64px' }} >

            <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignContent: 'center', margin: '0 0.8rem', height: '64px' }}>

                <LogoDmh color={logoColor} />

                <HeaderButtons variant={variant} />
                <HeaderAvatar variant={variant}/>
            </Toolbar>

        </AppBar>
    )
}

export default GeneralHeader;