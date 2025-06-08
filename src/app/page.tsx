"use client";

import { useParams } from "next/navigation";
import Home from "../components/Home";
import * as React from "react";

export default function Page() {
  const params = useParams();
  const menuSlug = params?.menuSlug;
  const isHomePage = !menuSlug || menuSlug === "home";

  return (
    <div>
      {isHomePage ? (
        <Home />
      ) : (
        <div>
          <h1>صفحه {menuSlug}</h1>
          <p>محتوای این صفحه بر اساس مسیر {menuSlug} نمایش داده می‌شود.</p>
        </div>
      )}
    </div>
  );
}
