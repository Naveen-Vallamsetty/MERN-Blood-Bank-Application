import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { toast } from "react-toastify";

const DonarList = () => {
  const [data, setData] = useState([]);

  // donar list records
  const getListOfDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfDonars();
  }, []);

  // Delete Donar Record Function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure? Do you want to delete this donar?",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-record/${id}`);
      toast.success(data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      return toast.error(error);
    }
  };

  return (
    <Layout>
      <table className="table m-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col"> Date & Time</th>
            <th scope="col"> Action </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisationName + " (ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.phone} </td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DonarList;
