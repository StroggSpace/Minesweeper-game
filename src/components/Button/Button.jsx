import React from "react";
import "./Button.scss";

export default function Button({ onClick, children, className }) {
  return (
    <button className={`button ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
