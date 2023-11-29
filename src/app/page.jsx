"use client";

import { Avatar, Button, Container } from "@mui/material";
import Header from "./components/header";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CheckInModal from "./components/modal";
import { format } from 'date-fns';
import {
  db,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "@/app/config/firebase";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "checkIns"), orderBy("timestamp", "desc")),
      (querySnapshot) => {
        const postData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Header />
      <Container className="hero-container">
        <div className="inner-box">
          <div className="content-box">
            <h1 className="hero-heading">Hi! 👋 James Doe</h1>
            <p className="hero-para">
              Lorem ipsus dolor sit amen, something important to say here
            </p>
            <Button
              onClick={() => setModalOpen(true)}
              disableElevation
              className="nav-btn"
              variant="contained"
            >
              Add Check In
            </Button>
          </div>
        </div>
      </Container>
      <Container className="cards-display-container">
        <h1>Added CheckIns</h1>
        <div className="cards-area">
          {posts.map((v, i) => (
            <div className="card" key={i}>
              {console.log(v.img)}
              <Image
                className="card-img"
                src={`${v.img}`}
                alt="card img"
                width={270}
                height={160}
              />
              <h4>{v.title}</h4>
              <p className="card-date">{format((v.timestamp.toDate()), 'dd MMM, yyyy')}</p>
              <div>
                <Avatar />
                <p className="card-author">Owner: John Doe</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <CheckInModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
