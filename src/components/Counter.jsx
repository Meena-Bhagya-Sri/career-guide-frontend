import {useState,useEffect} from "react";

function Counter({value}){

  const [count,setCount] = useState(0);

  useEffect(()=>{

    let start = 0;

    const duration = 1200;

    const step = value / (duration / 16);

    const timer = setInterval(()=>{

      start += step;

      if(start >= value){
        start = value;
        clearInterval(timer);
      }

      setCount(Math.floor(start));

    },16);

  },[value]);

  return <h3>{count}</h3>;

}

export default Counter;