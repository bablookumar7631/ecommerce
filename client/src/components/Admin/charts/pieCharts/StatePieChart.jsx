import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { desktopOS, valueFormatter } from "./webUsageStats";

const StatePieChart = () => {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 35,
          arcLabelRadius: "60%",
          ...data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
};


const size = {
    width: 400,
    height: 200,
};
  
const data = {
    data: desktopOS,
    valueFormatter,
};

export default StatePieChart;
