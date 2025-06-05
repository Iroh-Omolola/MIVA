"use client";
import Image from "next/image";
import Link from "next/link";
interface PageFrameProps {
  children: React.ReactNode;
}

const PageFrame = ({ children }: PageFrameProps) => {
  return (
    <div className="w-[100%] p-3">
      <div className="w-fit">
        <Link href="/students" className="">
          <img
            src="https://i.ibb.co/GpFLPNY/miva-logo.png"
            alt="miva-logo"
            width={"80px"}
            height={"80px"}
          />
        </Link>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default PageFrame;
