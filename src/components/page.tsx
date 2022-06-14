import { FC, ReactNode } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

const PageComponent = styled.div`
  height: 100vh;
  background-color: ##eee;
`;

interface PageProps {
  title: string;
  children?: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }) => {
  return (
    <PageComponent>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </PageComponent>
  );
};

export default Page;
