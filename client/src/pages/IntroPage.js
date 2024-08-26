import React from "react";
import { Link } from "react-router-dom";
import "../styles/Intro.css";

const IntroPage = () => {
  return (
    <div className="main">
      <div className="container m-4">
        <div className="d-flex-column">
          <h1 className="heading">Welcome To Blood Bank 🙏🙏</h1>
          <br />

          <p className="lh-lg mx-2 px-4 content">
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
          <br />
          <p className="fs-4">
            Please register here to become a donar. &nbsp;
            <Link className="link" to={"/register"}>
              Register
            </Link>
          </p>
          <br />
          <p className="fs-4">
            Already a donar? Please login. &nbsp;
            <Link className="link" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
