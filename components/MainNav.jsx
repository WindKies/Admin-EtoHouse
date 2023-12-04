import Link from "next/link";
import Image from "next/image";
// import React, { useState } from "react";

const MainNav = () => {
  return (
    <header className="mainNav">
      <div className="mainNav__wrapper">
      <Image 
          alt=""
          width={102}
          height={55}
          src="/logo2.png"/>
        <div className="mainNav__logo">
          ADMIN</div>
        <div className="mainNav__menuSide">
          <div className="mainNav__links">
            <Link className="mainNav__link" href="/mgs">
              <svg
                width="77"
                height="42"
                viewBox="0 0 77 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0.354111V7.14974L38.0908 20.741L76.1816 7.14974V0.354111H0ZM0 13.9454V41.1279H76.1816V13.9454L38.0908 27.5366L0 13.9454Z"
                  fill="black"
                />
              </svg>
            </Link>
            <Link className="mainNav__link" href="/notify">
              <svg
                width="77"
                height="70"
                viewBox="0 0 77 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.09 0.0832901C27.6152 0.0832901 19.045 7.92908 19.045 17.5184C19.045 26.5846 14.0933 34.7791 6.28485 40.7071C2.38063 43.671 0 47.8554 0 52.3886H76.18C76.18 47.8554 73.8946 43.671 69.8951 40.7071C62.0867 34.7791 57.135 26.5846 57.135 17.5184C57.135 7.92908 48.66 0.0832901 38.09 0.0832901ZM28.5675 61.1061C28.5675 65.9008 32.8526 69.8237 38.09 69.8237C43.3274 69.8237 47.6125 65.9008 47.6125 61.1061H28.5675Z"
                  fill="black"
                />
              </svg>
            </Link>
            <Link className="mainNav__link" href="/">
              Admin 
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
