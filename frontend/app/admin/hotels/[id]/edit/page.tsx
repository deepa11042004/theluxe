"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HotelForm from "@/components/admin/HotelForm";

export default function EditHotelPage() {
  const params = useParams();
  const id = params.id as string;
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/admin/hotels/${id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setHotel(json.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-gray-500">
        Loading hotel details...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="py-20 text-center text-xs text-red-500 font-semibold">
        Hotel not found.
      </div>
    );
  }

  return <HotelForm initialData={hotel} isEdit={true} />;
}
