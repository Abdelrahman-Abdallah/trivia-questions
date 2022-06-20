import React from "react";
import { Container, Spinner } from "rendition";

const Loader = () => {
  return (
    <Container textAlign="center" maxHeight="80vh" minHeight="50vh">
      c
      <Spinner emphasized width="100%" />
    </Container>
  );
};

export default Loader;
