import { FC } from "react";
import { Card, CardContent, Typography, useMediaQuery  } from '@mui/material';
import { theme } from "@/styles/material-theme";

interface CardIndexProps {
    title: string,
    content: string
}

const CardIndex: FC<CardIndexProps> = ({title, content}: CardIndexProps) => {

    const mobile = useMediaQuery (theme.breakpoints.down("tablet"));
    const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));
  
    const laptop_Desktop = useMediaQuery(theme.breakpoints.up("laptop"));
  
  
  
    return (
      <Card sx={{ borderRadius: '30px', height: '100%', padding: mobile ? '1%' : laptop_Desktop ? '0.75rem' : '1rem', boxShadow: 'none',}}>
        <CardContent>
          <Typography variant='subtitle1' fontWeight='bold' gutterBottom >
            {title}
          </Typography>
          <hr style={{backgroundColor: '#C1FD35', height: '3px', border: 'none'}}/>
          <Typography variant="body1" lineHeight='1.4' sx={{paddingRight: mobile ? '2%' : tablet ? '1rem' : laptop_Desktop ? '2rem' : '1rem'}}>
            {content}
          </Typography>
        </CardContent>
       
      </Card>
    );
  }
  
  export default CardIndex;
