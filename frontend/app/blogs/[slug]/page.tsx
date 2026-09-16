import React from "react";
import BlogDetail from "@/components/Blog/Blogdetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetail slug={slug} />;
}
