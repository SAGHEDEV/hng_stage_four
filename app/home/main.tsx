import React from "react";
import FrameContainer from "./frameContainer";
import LinkContainer from "./linkContainer";

const MainPage = () => {
  return (
    <main className="my-[24px] flex justify-between items-start gap-6">
      <FrameContainer />
      <LinkContainer />
    </main>
  );
};

export default MainPage;
