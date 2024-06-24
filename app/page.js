"use client";

import * as React from "react";
import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="w-full h-full min-h-screen grid grid-cols-1 grid-rows-2 gap-16 p-8 content-center lg:grid-cols-2 lg:grid-rows-1">
      <Form />
    </main>
  );
}
