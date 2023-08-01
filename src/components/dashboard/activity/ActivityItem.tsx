import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  const formattedAmount = (amount: number): string => {
    return amount < 0 ? `-$ ${Math.abs(amount)}` : `$ ${amount}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      //   day: '2-digit',
      //   month: '2-digit',
      //   year: 'numeric',
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   hour12: false
    };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <Link
      href={`/dashboard/activity/${activity.id}`}
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid black",
        paddingY: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            bgcolor: "secondary.main",
            marginRight: "10px",
          }}
        />
        <Typography variant="body2">{activity.description}</Typography>
      </Box>
      <Box>
        <Typography variant="body2" sx={{ textAlign: "right" }}>
          {formattedAmount(activity.amount)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textTransform: "capitalize",
            color: "#636363",
            fontSize: "12px",
            textAlign: "right",
            marginTop: "-5px",
          }}
        >
          {formatDate(activity.dated)}
        </Typography>
      </Box>
    </Link>
  );
};

export default ActivityItem;
