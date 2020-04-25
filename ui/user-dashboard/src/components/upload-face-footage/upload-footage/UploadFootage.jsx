import React, { Component } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { footageUploadEndpoint } from "../../../endpoints";
import "../upload.scss";

class UploadFootage extends Component {
  // state={
  //   video: null
  // };
    
render(){

  const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const text = files.length > 0 ? "Add more files" : "Choose files";

    return (
      <label className="upload-label">
        {text}
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    );
  };

    const MyVideoUploader = () => {         // react-dropzone-uploader
        // specify upload params and url for files
        const getUploadParams = ({ meta }) => { return { url: footageUploadEndpoint } }
        
        // called every time a file's `status` changes
        const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
        
        // receives array of files that are done uploading when submit button is clicked
        const handleSubmit = (files, allFiles) => {
          const file = files[0].file;
          
          // console.log(files[0]);
          // const objURL = URL.createObjectURL(files[0].file);
          // console.log(objURL);
          // Save data to sessionStorage
          // sessionStorage.setItem('videoURL', JSON.stringify({src: URL.createObjectURL(file), type: file.type}));

          // this.setState( {video: URL.createObjectURL(file)});
          
          
          
          allFiles.forEach(f => f.remove())
        }
        
        return (
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="video/*"      // allow only video files to be uploaded
                maxFiles = "1"
                inputContent={"Drag a video file or Click to browse"}
            />
          )
    }

    
    return(
        <div>
          <MyVideoUploader />
            {/* {!this.state.video &&
              <MyVideoUploader />}


            {this.state.video && <video width="320" height="240" controls>
              <source src={this.state.video} type="video/mp4"/>
            </video>} */}
        </div>
    )
}
}

export default UploadFootage;
