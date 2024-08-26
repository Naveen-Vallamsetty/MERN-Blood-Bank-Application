import React from "react";
import Layout from "./Layout/Layout";
import { useSelector } from "react-redux";
import { MdBloodtype } from "react-icons/md";
// import "../../styles/Info.css";

const InfoPage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container m-4">
        <div className="d-flex-column">
          <h1>
            Welcome <i className="text-success">{user?.name}</i>
          </h1>
          <hr />

          <p className="lh-lg mx-2 px-4">
            Blood Donation Is The Act Of Giving Blood To Someone Who Needs It.
            It Is Not Just About Giving Blood, But It Is An Act Of Kindness That
            Saves The Lives Of Hundreds Of People. These Fifteen Minutes Of Your
            Life Can Save Someone’s Entire Life. You Can’t Even Imagine That
            Donating One Bag Of Blood Can Be So Beneficial To The Human Race.
            Donating The Blood Without Expecting Or Asking For Any Money Or
            Gesture Is A Great Act Of Kindness, And If
            <em>
              <b> You Are 18 Years Old Or Above</b>
            </em>
            , You Should Definitely Take Part In This Act Of Kindness
          </p>
          <p className="fs-4">
            Please Contact your nearby Hospital or Organisation to donate blood
            <MdBloodtype color="red" />
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default InfoPage;
