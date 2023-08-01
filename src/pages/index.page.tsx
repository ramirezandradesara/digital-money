import { useEffect, useState } from 'react';
import BodySingle from '@/components/layouts/body/single/body-single';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import IndexLayout from '@/components/layouts/layout-index';
import { theme } from '@/styles/material-theme';
import { Img } from '@/types/image.type';
import { Text } from '@/types/cardText.type';
import Head from 'next/head';
import CardIndex from '@/components/cardIndex/cardIndex';
import { cardText } from '@/mocks/cardText';
import { fetchImages } from '@/mocks/images.services';
import { GetStaticProps, NextPage } from 'next';
import { fetchText } from '@/mocks/texts.service';
import { fetchMongoText } from '@/service/texts_mongo.service';
import { fetchMongoImages } from '@/service/images_mongo.services';
import { fetchMongoImagesServer } from '@/service/images_mongo_server.services';

interface IndexProps {
  imgs: Img[],
  texts: Text[],
}

// SERVIDOR
export const getStaticProps: GetStaticProps = async () => {



  //MOCK
  //const textData = await fetchText();

  //MONGO ATLAS
  const textsData = await fetchMongoText();
  const texts: Text[] = textsData
  const imgsData = await fetchMongoImagesServer();
  //console.log(imgsData);
  const imgs: Img[] = imgsData;
  return {
    props: {
      texts,
      imgs
    }
  }
}


// CLIENTE

const Index: NextPage<IndexProps> = ({ texts, imgs }) => {
  /*   const [imageState, setImageState] = useState<Img>();
   */
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

  const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));

  const desktop = useMediaQuery(theme.breakpoints.up("desktop"));

  const laptop_Desktop = useMediaQuery(theme.breakpoints.up("laptop"));

  let laptop;

  if (laptop_Desktop && !desktop)
    laptop = true;

  let screenSize = '';

  if (mobile) screenSize = 'mobile';

  if (laptop_Desktop) screenSize = 'desktop';

  if (tablet) screenSize = 'tablet';

  
  const imageSelected = imgs.filter(img => img.device === screenSize)[0];
 
  return (
    <>
      <Head>
        <title>Digital Money House</title>
        <meta name="description" content="Digital Money House" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BodySingle>
        <Container data-testid='imageContainer' sx={{

          //backgroundImage: `url(${imageSelected?.src})`,
          backgroundImage: imageSelected?.src ? `url(${imageSelected.src})` : undefined,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: mobile ? '48%' : '32% 30px',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'space-between',
          padding: mobile ? '2.5rem 1rem 1rem' : laptop ? '3rem 2rem 1rem' : desktop ? '5rem 3rem 2rem' : '5.5rem 3rem 3rem'
        }} maxWidth={false}>

          <Box width={mobile ? '48%' : (desktop ? '30%' : laptop_Desktop ? '26%' : '55%')} justifyContent={'start'}>

            <Typography variant='h1' color='text.secondary' mb='1rem' fontWeight={mobile ? '500' : 'normal'}>De ahora en adelante, hacés más con tu dinero</Typography>
            {mobile && <hr style={{
              backgroundColor: '#C1FD35',
              height: '5px',
              border: 'none',
              width: '15%',
              marginLeft: '0',
            }} />}
            <Box display={mobile ? '' : 'flex'} sx={{ marginBottom: '114px' }}>
              <Typography variant="h2" color='secondary' pr='0.5rem' pb='0.4rem' fontWeight='normal' sx={{
                whiteSpace: "nowrap"
              }}>
                Tu nueva
              </Typography>
              <Typography variant='h2' color='secondary' sx={{
                whiteSpace: "nowrap"
              }}>billetera virtual</Typography>
            </Box>
          </Box>

          <Grid container spacing={{ mobile: 2, tablet: 3.5, laptop: 2 }} justifyContent='center' zIndex={5}>
            <Grid item mobile={12} tablet={10} laptop={4.5}>
              <CardIndex title={texts[0].title} content={texts[0].content} />
            </Grid>

            <Grid item mobile={12} tablet={10} laptop={4.5}>
              <CardIndex title={texts[1].title} content={texts[1].content} />
            </Grid>
          </Grid>
        </Container>

        <Box
          height={mobile ? '42.5%' : (laptop_Desktop ? '25%' : '42%')}
          width={'100%'}
          sx={{
            backgroundColor: 'secondary.main',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            zIndex: 0,
            position: 'absolute',
            bottom: 0,
          }}>
        </Box>

      </BodySingle>

    </>
  )
}

(Index as any).Layout = IndexLayout;

export default Index;

