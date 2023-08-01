import { theme } from "@/styles/material-theme";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Image from "next/image";
import { serviceImg } from "@/types/service_image.type";
import Link from "next/link";

interface ServicesProps {
  imgs: serviceImg[];
  service: Service;
}

const ServiceItem: React.FC<ServicesProps> = ({ imgs, service }) => {
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

  const getServiceLogo: any = (name: string) => {
    let serviceImage;
    if (imgs !== undefined) {
      serviceImage = imgs?.find((image) => image.name === name);
    }
    return serviceImage?.src;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          paddingBottom: 1,
          paddingTop: 1,
          justifyContent: "space-between",
          minHeight: 70,
        }}
      >
        <Box
          data-testid="second-container-service-item"
          sx={{
            display: "flex",
            gap: mobile ? 1 : 3,
          }}
        >
          <Box
            data-testid="image-container-service-item"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: mobile ? 40 : 70,
              minHeight: mobile ? 40 : 70,
              maxWidth: mobile ? 70 : 100,
              minWidth: mobile ? 70 : 100,
              marginTop: mobile ? 1 : 0,
              position: "relative",
            }}
          >
            <Image
              src={getServiceLogo(service.name)}
              layout="fill"
              objectFit="contain"
              alt={service.name}
            />
          </Box>
          <Typography
            sx={{
              fontSize: mobile ? "13px !important" : "15px !important",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {service.name}
          </Typography>
        </Box>
        <Link href={`/dashboard/services/${service.id}`}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: mobile ? "14px !important" : "16px !important",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Seleccionar
          </Typography>
        </Link>
      </Box>
      <Divider sx={{ border: "1px solid #0000002c" }} />
    </>
  );
};

export default ServiceItem;
