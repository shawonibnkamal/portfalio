import React from "react";
import Lottie from "react-lottie";
import animationData from "./assets/home-animation.json";

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttonStyle = {
      display: "block",
      margin: "10px auto",
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie options={defaultOptions} />
      </div>
    );
  }
}
