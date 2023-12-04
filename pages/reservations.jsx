import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { userRequest, publicRequest } from "../requestMethods";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const getReservations = async () => {
      const res = await publicRequest.get(`/reservations`);
      setReservations(res.data.reservations);
    };
    getReservations();
  }, [reservations]);
  // console.log(Reservations);

  // const handleUpdate = async (id) => {
  //   try {
  //     await userRequest.put(`/reservations/${id}`, {
  //       confirm: true,
  //     });
  //     alert("Đã xác nhận");
  //     setReservations([]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/reservations/${id}`);
      alert("Đã xoá chỗ đặt này");
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
        <span>Admin</span> / Danh sách đặt chỗ
      </h4>
      {/* <h5 className="addreservations_item">Thêm sản phẩm +</h5> */}

      <div className="table">
        <div className="table__tableHeader">Danh sách đặt chỗ</div>
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Khách hàng</td>
              <td>Địa điểm</td>
              <td>Ngày bất đầu</td>
              <td>Ngầy kết thúc</td>
              <td>Tổng giá</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {reservations?.map((reservations_item, index) => (
              <tr key={index}>
                <td data-label="#">
                  <span>{index}</span>
                </td>
                <td data-label="Khách hàng">
                  <span>{reservations_item.userId?.name}</span>
                </td>
                <td data-label="listing">
                  <span>{reservations_item.listingId?.title}</span>
                </td>
                <td data-label="Ngày bất đầu">
                  <span>{dayjs(reservations_item.startDate).format("LL")}</span>
                </td>
                <td data-label="Ngầy kết thúc">
                  <span>{dayjs(reservations_item.endDate).format("LL")}</span>
                </td>
                <td data-label="Tổng giá">
                  <span>{reservations_item.totalPrice}</span>
                </td>

                <td className="actions">
                  <div
                    className="trash"
                    onClick={() => handleDelete(reservations_item._id)}
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

export default Reservations;
