import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { toast } from "react-toastify";
import moment from "moment";

const OrgList = () => {
  const [data, setData] = useState([]);

  // ORG list records
  const getListOfOrganisations = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfOrganisations();
  }, []);

  // Delete ORG Record Function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure? Do you want to delete this organisation record?",
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
              <td>{record.organisationName}</td>
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

export default OrgList;
