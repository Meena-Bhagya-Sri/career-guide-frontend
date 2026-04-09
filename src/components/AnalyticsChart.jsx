import { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/AdminLogin.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function AnalyticsChart({ darkMode }) {
const currentYear = new Date().getFullYear();



  const [year,setYear] = useState(currentYear);
  const [chartData,setChartData] = useState(new Array(12).fill(0));
  const [loading,setLoading] = useState(true);
  const years = [
currentYear,
currentYear-1,
currentYear-2
];
  const fetchAnalytics = async () => {

    try{
      
  const res = await API.get(`/admin/analytics?year=${year}`);

      const data = res.data.monthlyUsers || [];

      if(data.length === 12){
        setChartData(data);
      }

      setLoading(false);

    }catch(err){

      console.error("Analytics fetch error:",err);
      setLoading(false);

    }

  };

  useEffect(()=>{

    fetchAnalytics();

    const interval = setInterval(fetchAnalytics,15000);

    return () => clearInterval(interval);

  },[year]);

  const data = {

    labels:[
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],

    datasets:[
      {
        label:"Users Growth",

        data:chartData,

        borderColor:"#3b82f6",

        backgroundColor:"rgba(59,130,246,0.25)",

        fill:true,

        tension:0.45,

        borderWidth:3,

        pointRadius:4,

        pointHoverRadius:7,

        pointBackgroundColor:"#ff2d95",

        pointBorderColor:"#ffffff",

        pointBorderWidth:2
      }
    ]
  };

  const options = {

    responsive:true,

    plugins:{
      legend:{
        display:false
      }
    },

    scales:{

      y:{
        beginAtZero:true,

        ticks:{
          color:darkMode ? "#ffffff" : "#111111"
        },

        grid:{
          color:darkMode
          ? "rgba(255,255,255,0.12)"
          : "#e5e7eb"
        }
      },

      x:{
        ticks:{
          color:darkMode ? "#ffffff" : "#111111"
        },
        grid:{display:false}
      }

    }

  };

  return(

    <div className="chart-container">

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:"10px"
        }}
      >

        <h3 className="chart-title">
          System Usage Analytics
        </h3>

      <div className="chart-header">



<select
// style={{border:"2px solid red"}}
style={{zIndex:9999}}
value={year}
onChange={(e)=>setYear(Number(e.target.value))}
className="analytics-year-select"
>
    {/* style={{border:"2px solid red"}} */}
{years.map(y=>(
<option key={y} value={y}>{y}</option>
))}
</select>

</div>
      </div>

      {loading
        ? <div className="chart-loading">Loading analytics...</div>
        : <Line data={data} options={options}/>
      }

    </div>

  );

}

export default AnalyticsChart;