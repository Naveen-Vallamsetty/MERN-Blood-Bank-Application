import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";
import "../../styles/Analytics.css";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //life cycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  //get function
  const getRecentBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log("Recent trascation", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentBloodRecords();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex flex-row flex-wrap">
          {data?.map((record) => (
            <div
              className="card m-2 p-1"
              key={record._id}
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h1 className="card-title text-center mb-3">
                  {record.bloodGroup}
                </h1>
                <p className="card-text">
                  Total In : <b>{record.totalIn}</b> (ML)
                </p>
                <p className="card-text">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                Total Available : <b>{record.availableBlood}</b> (ML)
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container my-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">TIme & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
