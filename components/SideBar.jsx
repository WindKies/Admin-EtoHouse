import React from "react";
import ActiveLink from "./ActiveLink";

const SideBar = () => {
  return (
    <section className="sideBar">
      <div className="sideBar__wrapper">
        <div className="sideBar__links">
          <ActiveLink activeClassName="activeLink" href="/listing">
            <a className="sideBar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="91"
                height="66"
                fill="none"
                viewBox="0 0 91 66"
              >
                <path
                  fill="#fff"
                  d="M45.5 0L0 28.286h11.375V66h22.75V47.143h22.75V66h22.75V28.003L91 28.286 45.5 0z"
                ></path>
              </svg>
              Quản lý địa điểm (Listing)
            </a>
          </ActiveLink>
          <ActiveLink activeClassName="activeLink" href="/reservations">
            <a className="sideBar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="91"
                height="31"
                fill="none"
                viewBox="0 0 91 31"
              >
                <g fill="#fff" clipPath="url(#clip0_293_184)">
                  <path d="M0 29.063h91V31H0v-1.938z"></path>
                  <path d="M0 0h5.688v31H0V0zm51.188 15.5L34.694 9.687l-23.319 7.75v9.688H91V1.744L51.187 15.5z"></path>
                </g>
                <defs>
                  <clipPath id="clip0_293_184">
                    <path fill="#fff" d="M0 0H91V31H0z"></path>
                  </clipPath>
                </defs>
              </svg>
              Danh sách đặt chỗ
            </a>
          </ActiveLink>

          <ActiveLink activeClassName="activeLink" href="/users">
            <a className="sideBar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="91"
                height="59"
                fill="none"
                viewBox="0 0 91 59"
              >
                <path
                  stroke="#F8F8F8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="5.759"
                  strokeWidth="2"
                  d="M11.375 7.375v39.333c0 1.304.799 2.555 2.221 3.477 1.422.922 3.351 1.44 5.362 1.44h60.667"
                ></path>
                <path
                  stroke="#F8F8F8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="5.759"
                  strokeWidth="2"
                  d="M26.542 34.417l15.167-9.834 15.166 9.834 22.75-14.75"
                ></path>
                <path
                  stroke="#F8F8F8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M68.25 19.667h11.375v7.375"
                ></path>
              </svg>
              Khách hàng
            </a>
          </ActiveLink>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
