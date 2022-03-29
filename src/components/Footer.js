import React from "react";

function Footer() {
  console.log("footer");
  return (
    <footer className="relative flex items-center justify-center text-white mb-10">
      <span>
        <a href="/" className="text-blue-600 underline">
          Privacy Policy
        </a>
      </span>
      <span>&nbsp;</span>
      <span>| © 2022 Highradius Corporation. All rights reserved. </span>
    </footer>
  );
}

export default React.memo(Footer);
