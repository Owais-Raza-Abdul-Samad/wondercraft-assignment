"use client";

import { Button, Modal } from "antd";
import Input from "antd/es/input/Input";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import {
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../config/firebase";
const { Dragger } = Upload;

const CheckInModal = ({ modalOpen, setModalOpen }) => {
  const [title, setTitle] = useState("");
  const [postImage, setPostImage] = useState("");

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const mountainsRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(mountainsRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const props = {
    name: "file",
    multiple: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status, response } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);

        // Call the uploadFile function with the uploaded file
        uploadFile(info.file.originFileObj)
          .then((url) => {
            // Log the URL
            setPostImage(url);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const addCheckIn = async (title) => {
    try {
      const docRef = await addDoc(collection(db, "checkIns"), {
        title: title,
        img: postImage,
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Modal
        title="Add Check In"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            className="modal-btn-cancel"
            key="back"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setModalOpen(false);
              addCheckIn(title);
            }}
              className="modal-btn-add"
              disabled={!postImage}
          >
            Add
          </Button>,
        ]}
      >
        <h2 className="modal-headings">Title</h2>
        <Input
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="modal-headings">Upload Image</h2>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="upload-icon" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </>
  );
};
export default CheckInModal;
