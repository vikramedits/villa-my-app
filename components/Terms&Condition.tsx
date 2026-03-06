import Link from "next/link";
import React from "react";

const TermsAndCondition = () => {
  return (
    
      <p className="py-4 text-gray-500 font-medium tracking-wide text-sm md:text-base text-start">
        By continuing, I agree to the
        <Link href={"/policies"} className="px-1 text-green-700">
          Terms of Use
        </Link>{" "}
        &
        <Link href={"/policies"} className="px-1 text-green-700">
          Privacy policy.{" "}
        </Link>
      </p>
    
  );
};

export default TermsAndCondition;
