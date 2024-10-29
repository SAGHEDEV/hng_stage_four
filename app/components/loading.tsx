import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="max-w-screen max-h-screen w-full h-full flex justify-center items-center my-10">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
