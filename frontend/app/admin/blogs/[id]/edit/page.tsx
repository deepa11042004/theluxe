"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/admin/blogs/${id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setData(json.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="py-20 text-center text-xs text-gray-500">Loading blog post...</div>;
  if (!data) return <div className="py-20 text-center text-xs text-red-500">Blog post not found.</div>;

  return <BlogForm initialData={data} isEdit={true} />;
}
