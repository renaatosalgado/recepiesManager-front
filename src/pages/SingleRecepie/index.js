import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../../components/Header";
import RecepieCover from "./RecepieCover";
import Method from "./Method";
import Ingredients from "./Ingredients";
import Footer from "../../components/Footer";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const post1 = { name: "eai" };
const post2 = { name: "ea2" };
const post3 = { name: "ea3" };

const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
};

export default function Blog() {
  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <main>
          <RecepieCover post={mainFeaturedPost} />

          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Ingredients
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
            <Method title="From the firehose" posts={posts} />
          </Grid>
        </main>
      </Container>
      <Footer />
    </>
  );
}
