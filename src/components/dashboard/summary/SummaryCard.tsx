import { Box, Card, Typography } from "@mui/material";

const SummaryCard = ({
  title,
  current,
  previous,
}: {
  title: string;
  current: number;
  previous: number;
}) => {
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const percentageChange = calculatePercentageChange(current, previous);
  const isPositive = percentageChange >= 0;
  return (
    <Card
      sx={{
        p: 3,
        minWidth: "345px",
        width: "100%",
      }}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h3" py="8px">
        {current.toLocaleString()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {isPositive ? (
          <img src="/icons/uparrow.svg" alt="up" />
        ) : (
          <img src="/icons/downarrow.svg" alt="down" />
        )}
        <Typography variant="subtitle2" color={isPositive ? "green" : "red"}>
          {Math.abs(percentageChange).toFixed(1)}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          previous month
        </Typography>
      </Box>
    </Card>
  );
};

export default SummaryCard;
