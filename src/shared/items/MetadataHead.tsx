import React, { FC } from "react";
import Head from "next/head";

interface IMetadataProps {
  title: string;
  content: string;
}
//Functional component used to show the title of the content inside the webtab by setting the Head metadata for the page
const MetadataHead: FC<IMetadataProps> = ({ title, content }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href="https://i.ibb.co/Jx4RCxR/favicon.png" />
    </Head>
  );
};

export default MetadataHead;
