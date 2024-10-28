import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="max-w-screen max-h-screen w-full h-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
