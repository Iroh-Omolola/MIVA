'use client';

interface AuthFrameProps {
  children: React.ReactNode;
}

const AuthFrame = ({ children }: AuthFrameProps) => {
  return (
    <div className="min-h-screen w-[100%] flex justify-center items-center">
      <div className=" w-[85%] md:w-[40%] bg-white z-10 p-6 shadow-lg rounded-md">
        {children}
      </div>
    </div>
  );
};

export default AuthFrame;
