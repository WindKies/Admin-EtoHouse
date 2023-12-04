import React, { useEffect, useState } from "react";
import Head from "next/head";
// import Image from "next/image";
import ImgPlaceHolder from "../assets/images/placeholder.jpg";
console.log(ImgPlaceHolder);
import { userRequest, publicRequest } from "../requestMethods";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getusers = async () => {
      const res = await publicRequest.get(`/users`);
      setUsers(res.data.users);
    };
    getusers();
  }, [users]);
  // console.log(users);

  // const handleUpdate = async (id) => {
  //   try {
  //     await userRequest.put(`/users/${id}`, {
  //       confirm: true,
  //     });
  //     alert("Đã xác nhận");
  //     setUsers([]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/users/${id}`);
      alert("Đã xoá người dùng này");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Admin</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        ></link>
      </Head>
      <h4 className="panelTilte">
        <span>Admin</span> / Danh sách người dùng
      </h4>
      {/* <h5 className="addusers_item">Thêm sản phẩm +</h5> */}

      <div className="table">
        <div className="table__tableHeader">Danh sách người dùng</div>
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Ảnh đại diện</td>
              <td>Tên</td>
              <td>Email</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users?.map((users_item, index) => (
              <tr key={index}>
                <td data-label="#">
                  <span>{index}</span>
                </td>
                <td data-label="Ảnh đại diện">
                  <span>
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "100%",
                      }}
                      src={users_item.image || ImgPlaceHolder.src}
                      alt=""
                    />
                  </span>
                </td>
                <td data-label="Tên">
                  <span>{users_item.name}</span>
                </td>
                <td data-label="Email">
                  <span>{users_item.email}</span>
                </td>

                <td className="actions">
                  <div
                    className="trash"
                    onClick={() => handleDelete(users_item._id)}
                  >
                    <i className="fas fa-trash fa-xs"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
