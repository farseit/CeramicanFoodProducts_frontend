import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RiFileList2Fill } from "react-icons/ri";
import { Box } from "@mui/material";

const OrderSummeryCard = ({ summery }) => {
  return (
    <Card
      variant="outlined"
      className="py-0 dark:bg-dark-bg dark:border dark:border-[#3d47514d]"
    >
      <CardContent className="flex items-center justify-center">
        <Box className="flex items-center gap-6">
          <Box>
            <Typography
              sx={{ fontSize: 14 }}
              className="text-secondary dark:text-dark-color"
            >
              {summery.title}
            </Typography>
            <Typography
              // sx={{ color: "text.secondary" }}
              className="text-[32px] text-secondary dark:text-dark-color font-medium"
            >
              $ {summery.amount}
            </Typography>
          </Box>
          <Box>{summery.icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderSummeryCard;
