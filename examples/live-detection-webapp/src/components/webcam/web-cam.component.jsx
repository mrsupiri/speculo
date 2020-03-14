import React from "react";
import Webcam from "react-webcam";
import "./web-cam.style.scss";
import { Button } from "../button/button.component";
import ImageCanvas from "../image-canvas/image-canvas.component";

export default class WebCamComponent extends React.Component {
  //constructor
  constructor() {
    super();

    //properties required for demonstration
    this.state = {
      isCanvasVisible: false,
      imageSource: "",
      truncatedImgSrc: "",
      faceData: [],
      isDataRecieved: false,
      displayComponent: true
    };
  }

  componentDidMount() {
    if (this.state.displayComponent) {
      setInterval(() => {
        this.capture();
        console.log("captured is " + this.state.displayComponent);
      }, 1000);
    }
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  //method used to capture the webcam screenshot
  capture = async () => {
    const imageSrc = this.webcam.getScreenshot();
    if (imageSrc != null) {
      this.setState(
        {
          isCanvasVisible: true
        },
        () => {
          var newImageSource = this.splitImageValue(imageSrc)[1];
          this.setState({
            truncatedImgSrc: newImageSource,
            imageSource: imageSrc
          });
          this.fetchFaceData(newImageSource);
        }
      );
    }
  };

  //Method used to fetch data from the endpoint
  fetchFaceData = async imageSrc => {
    if (imageSrc != null) {
      fetch("http://speculo.isala.me/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          image: imageSrc
        })
      })
        .then(response => response.json())
        .then(data => this.setState({ faceData: data, isDataRecieved: true }))
        .catch(err => console.log(err));
      // .then(() => console.log(this.state.faceData));
    } else {
      console.log("image is null");
    }
  };

  splitImageValue = imageSrc => {
    var newImageStringArr = imageSrc.split(",");
    return newImageStringArr;
  };

  render() {
    const {
      isCanvasVisible,
      imageSource,
      faceData,
      isDataRecieved
    } = this.state;

    const webcamConstraints = {
      width: 1080,
      height: 720
    };

    return (
      <>
        <div className="webcam-component">
          <Webcam
            audio={false}
            height={720}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={1200}
            videoConstraints={webcamConstraints}
          />
        </div>

        <Button
          buttonStyle={captureScreenshotBtnStyle}
          className="grab-webcam-screenshot"
          onClickHandler={() => {
            if (this.state.displayComponent) {
              console.log("display component is false");
              this.setState({ displayComponent: false });
            } else {
              console.log("display component is true");
              this.setState({ displayComponent: true });
            }
          }}
          buttonTitle="Screenshot!"
        />

        {/* ternary operator to display the "CanvasComponent" */}
        {isCanvasVisible &&
        imageSource !== "" &&
        isDataRecieved &&
        this.state.displayComponent ? (
          //canvas component
          <div className="canvas-component">
            <ImageCanvas imgSrc={imageSource} analysedFaceData={faceData} />
          </div>
        ) : null}
      </>
    );
  }
}

const captureScreenshotBtnStyle = {
  backgroundColor: "#808080",
  borderRadius: 5,
  padding: 20,
  width: "20%",
  fontStyle: "30",
  ":hover": {
    backgroundColor: "#00ff00"
  }
};
