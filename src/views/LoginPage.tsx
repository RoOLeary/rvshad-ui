import Login from '@/components/login';

export const LoginPage = () => {
  return (
    <div className="grid grid-cols-5 w-full h-screen">
      {/* Left Panel: 3/5 of the width */}
      <div className="col-span-3 bg-[#395fa7] flex items-center justify-center">
        <p className="text-lg font-semibold">Left Panel</p>
      </div>

      {/* Right Panel: 2/5 of the width */}
      <div className="col-span-2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
