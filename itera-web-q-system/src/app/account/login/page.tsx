import React, { Suspense } from "react";
import LoginPage from "../../components/account/LoginPage";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default page;
