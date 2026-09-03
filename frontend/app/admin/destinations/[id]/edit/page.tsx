"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DestinationForm from "@/components/admin/DestinationForm";

export default function EditDestinationPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/admin/destinations/${id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setData(json.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-500">Loading destination...</div>;
  }

  if (!data) {
    return <div className="py-20 text-center text-xs text-red-500">Destination not found.</div>;
  }

  return <DestinationForm initialData={data} isEdit={true} />;
}
