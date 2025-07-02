// import { FormControl, MenuItem, Select } from "@mui/material";
// import React, { useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Sector,
//   Cell,
//   ResponsiveContainer,
//   Legend,
//   Tooltip,
//   Label,
// } from "recharts";
// import topProductLabel from "./TopProductLabel";

// const colors = [
//   "#04BFDA",
//   "#2FB261",
//   "#F39159",
//   "#4C5F87",
//   "#A927F9",
//   "#2FB261",
// ];

// const TopProduct = () => {
//   const [duration, setDuration] = useState("");

//   const handleChange = (event) => {
//     setDuration(event.target.value);
//   };

//   const data = [
//     { name: "Tops", value: 100 },
//     { name: "Pants", value: 150 },
//     { name: "T-Shirt", value: 100 },
//     { name: "Shirt", value: 80 },
//     { name: "Shoe", value: 40 },
//   ];

//   return (
//     <div className="bg-white  dark:bg-dark-bg border dark:border-[#3d47514d] rounded-md h-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
//       {/* header */}
//       <div className="flex justify-between items-center px-6 py-1 border-b dark:border-b-[#3d47514d]">
//         <h3 className="text-xl font-bold text-secondary dark:text-dark-color">
//           Top Product
//         </h3>
//         <FormControl sx={{ m: 1 }} size="small">
//           <Select
//             id="demo-select-small"
//             className="text-white text-xl appearance-none font-medium outline-0 border-0 rounded-lg bg-dash-primary"
//             value={duration}
//             onChange={handleChange}
//             sx={{
//               ".MuiSvgIcon-root ": {
//                 fill: "white !important",
//               },
//               color: "white",
//               "& .MuiSelect-select": {
//                 paddingRight: 2,
//                 paddingLeft: 2,
//                 paddingTop: 0.5,
//                 paddingBottom: 0.5,
//               },
//             }}
//             displayEmpty
//           >
//             <MenuItem value=""> Today</MenuItem>

//             <MenuItem value={"This Week"} className="font-medium">
//               This Week
//             </MenuItem>
//             <MenuItem value={"This Week"} className="font-medium">
//               Last Month
//             </MenuItem>
//           </Select>
//         </FormControl>
//       </div>
//       {/* chart */}
//       <div>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart width={400} height={400}>
//             <Pie
//               data={data}
//               dataKey="value"
//               cx="50%"
//               cy="50%"
//               innerRadius={70}
//               outerRadius={90}
//               fill="#82ca9d"
//               label={topProductLabel}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={colors[index % 20]} />
//               ))}
//             </Pie>

//             <Legend rapperStyle={{ paddingBottom: "20px" }} />
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default TopProduct;

import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import topProductLabel from "./TopProductLabel";

const colors = [
  "#04BFDA",
  "#2FB261",
  "#F39159",
  "#4C5F87",
  "#A927F9",
  "#2FB261",
];

const TopProduct = () => {
  const [duration, setDuration] = useState("");
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
        );
        console.log("Categories:", res.data);
        setCategories(res.data.slice(0, 8)); // Limit to 8 categories
        // Mapping the category names to the Pie chart data
        setData(
          res.data.slice(0, 5).map((category) => ({
            name: category.name, // Using the category name from the API response
            value: Math.floor(Math.random() * 200) + 50, // Random value for demonstration purposes
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="bg-white dark:bg-dark-bg border dark:border-[#3d47514d] rounded-md h-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
      {/* header */}
      <div className="flex justify-between items-center px-6 py-1 border-b dark:border-b-[#3d47514d]">
        <h3 className="text-xl font-bold text-secondary dark:text-dark-color">
          Top Product
        </h3>
        <FormControl sx={{ m: 1 }} size="small">
          <Select
            id="demo-select-small"
            className="text-white text-xl appearance-none font-medium outline-0 border-0 rounded-lg bg-dash-primary"
            value={duration}
            onChange={handleChange}
            sx={{
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
              color: "white",
              "& .MuiSelect-select": {
                paddingRight: 2,
                paddingLeft: 2,
                paddingTop: 0.5,
                paddingBottom: 0.5,
              },
            }}
            displayEmpty
          >
            <MenuItem value=""> Today</MenuItem>
            <MenuItem value={"This Week"} className="font-medium">
              This Week
            </MenuItem>
            <MenuItem value={"Last Month"} className="font-medium">
              Last Month
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* chart */}
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label={topProductLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Pie>

            <Legend rapperStyle={{ paddingBottom: "20px" }} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopProduct;
