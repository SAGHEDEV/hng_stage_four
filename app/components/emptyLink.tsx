import Image from "next/image";

const EmptyLink = () => {
  return (
    <div className="py-[46.5px] md:py-[82.5px] lg:py-[62.5px] px-[20px] bg-[#FAFAFA] flex items-center flex-col  rounded-xl ">
      <Image
        src="/empty-link.png"
        alt="Create your link!"
        width={249.53}
        height={160}
      />
      <h2 className="text-[32px] text-center font-bold text-[#333333] mt-10 mb-6 ">
        Let’s get you started!
      </h2>
      <p className="text-[16px] text-center text-[#737373]">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
};

export default EmptyLink;
