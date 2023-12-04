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

const Listing = () => {
  const [listing, setListing] = useState([]);
  useEffect(() => {
    const getListing = async () => {
      const res = await publicRequest.get(`/listing`);
      setListing(res.data.listing);
    };
    getListing();
  }, [listing]);
  // console.log(Listing);

  // const handleUpdate = async (id) => {
  //   try {
  //     await userRequest.put(`/listing/${id}`, {
  //       confirm: true,
  //     });
  //     alert("Đã xác nhận");
  //     setListing([]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/listing/${id}`);
      alert("Đã xoá Listing này");
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
        <span>Admin</span> / Danh sách địa điểm
      </h4>
      {/* <h5 className="addlisting_item">Thêm sản phẩm +</h5> */}

      <div className="table">
        <div className="table__tableHeader">Danh sách địa điểm</div>
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Tiêu đề</td>
              <td>Hình ảnh</td>
              <td>Mô tả</td>
              <td>Thể loại</td>
              <td>Số phòng</td>
              <td>Phòng tấm</td>
              <td>Số lượng khách</td>
              <td>Địa điểm</td>
              <td>Giá</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {listing?.map((listing_item, index) => (
              <tr key={index}>
                <td data-label="#">
                  <span>{index}</span>
                </td>
                <td data-label="Tiêu đề">
                  <span>{listing_item.title}</span>
                </td>
                <td data-label="Hình ảnh">
                  <span>
                    <Image
                      src={listing_item?.imageSrc}
                      width={72}
                      height={72}
                      alt=""
                    />
                  </span>
                </td>
                <td data-label="Mô tả">
                  <span>{listing_item.description}</span>
                </td>
                <td data-label="Thể loại">
                  <span>{listing_item.category}</span>
                </td>
                <td data-label="Số phòng">
                  <span>{listing_item.roomCount}</span>
                </td>
                <td data-label="Phòng tấm">
                  <span>{listing_item.bathroomCount}</span>
                </td>
                <td data-label="Số lượng khách">
                  <span>{listing_item.guestCount}</span>
                </td>
                <td data-label="Địa điểm">
                  <span>{listing_item.locationValue}</span>
                </td>
                <td data-label="Địa điểm">
                  <span>{listing_item.price}</span>
                </td>
                <td className="actions">
                  <div
                    className="trash"
                    onClick={() => handleDelete(listing_item._id)}
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

export default Listing;
