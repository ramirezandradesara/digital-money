import SearchActivity from "@/components/dashboard/activity/SearchActivity";
import HomeLayout from "@/components/layouts/layout-home";
import Loader from "@/components/utils/Loader";
import { DataUser } from "@/context/UserDataContext";
import {
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { theme } from "@/styles/material-theme";
import ServiceItem from "@/components/dashboard/services/ServiceItem";
import InfoPageText from "@/components/dashboard/infoPageText";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next";
import { fetchMongoServiceImagesServer } from "@/service/service_images_mongo_server.services";
import { serviceImg } from "@/types/service_image.type";

interface ServicesProps {
  imgs: serviceImg[],
}

export const getStaticProps: GetStaticProps = async () => {


  //MONGO ATLAS
  const imgsData = await fetchMongoServiceImagesServer();
  const imgs: serviceImg[] = imgsData;
  return {
    props: {
      imgs
    }
  }
}

const Services: NextPage<ServicesProps> = ({ imgs }) => {
  const { userData } = useContext(DataUser);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [token, setToken] = useState<string | null>("");
  const [services, setServices] = useState<Service[]>([]);
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();


  const fetchServices = async () => {
    if (token) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://digitalmoney.ctd.academy/service`
        );
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error("Error fetching services:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const tokenStorage = localStorage.getItem("token");

    if (tokenStorage) {
      fetchServices();
    } else {
      router.push("/login")
    }
  }, [userData, token]);

  return (
    <Container
      sx={{
        backgroundColor: "secondary.light",
        minWidth: "100%",
        minHeight: mobile || tablet ? "110vh" : "100vh",
        display: "flex",
        flexDirection: "column",
        paddingX: tablet || mobile ? 3 : 10,
        paddingY: mobile ? 4 : 6,
        gap: mobile ? 2 : 3,
      }}
    >
      {mobile && <InfoPageText />}
      <SearchActivity
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholder="Buscá entre más de 5.000 empresas"
      />

      <Box
        sx={{
          paddingTop: "35px",
          paddingBottom: "30px",
          paddingX: "30px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          marginBottom: 8,
          backgroundColor: "white",
          minWidth: "100%",
        }}
      >
        {isLoading ? (
          <Loader height="150px" />
        ) : (
          <Box id="activity-container">
            <Typography variant={mobile ? "h4" : "h3"} sx={{ marginBottom: 2 }}>
              Más recientes
            </Typography>
            <Divider sx={{ border: "1px solid #0000002c" }} />
            {services
              ?.filter((service) =>
                service.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((service) => (
                <ServiceItem
                  key={service.id}
                  imgs={imgs}
                  service={service}
                  data-testid="service-item"
                />
              ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

(Services as any).Layout = HomeLayout;

export default Services;
