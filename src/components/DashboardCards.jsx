import { useState, useEffect } from "react";
import Counter from "./Counter";

import {
FaUsers,
FaBrain,
FaBriefcase,
FaMapSigns,
FaBook
} from "react-icons/fa";

function DashboardCards({ setActiveSection, activeSection }) {

const [stats,setStats] = useState(null);

const fetchStats = () => {

API.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`,)
.then(res => res.json())
.then(data => setStats(data))
.catch(err => console.error(err));

};

useEffect(()=>{
fetchStats();
},[]);
const cards = [
{
icon: <FaUsers />,
label: "Total Users",
value: stats?.total_users || 0,
section: "users"
},
{
icon: <FaBrain />,
label: "Total Skills",
value: stats?.total_skills || 0,
section: "skills"
},
{
icon: <FaBriefcase />,
label: "Total Careers",
value: stats?.total_careers || 0,
section: "careers"
},
{
icon: <FaMapSigns />,
label: "Total Roadmaps",
value: stats?.total_roadmaps || 0,
section: "roadmaps"
},
{
icon: <FaBook />,
label: "Total Resources",
value: stats?.total_resources || 0,
section: "resources"
}
];

return(

<div className="dashboard-grid">

{cards.map((card,index)=>(
<div
key={index}
className={`card-box ${activeSection === card.section ? "active-card" : ""}`}
onClick={()=>setActiveSection(card.section)}
>

<div className="card-icon">{card.icon}</div>

{stats
? <Counter value={card.value}/>
: <div className="card-skeleton"></div>
}

<p>{card.label}</p>

</div>
))}

</div>

);

}

export default DashboardCards;