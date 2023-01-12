import React from "react";
import "../styles/loading.css";
import Loader from "../assets/Loader.gif";
export default function Loading() {
  return (
    <div className="loading_div">
      <img className="loading" src={Loader} />
    </div>
  );
}
