'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { getHotTag } from "@/apis/tag";
import { Tag } from "@/types/tag";

const TopTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(()=>{
    async function setDataTags(){
      const res = await getHotTag('tag/hot')
      setTags(res.data)
    }
    setDataTags()
  },[])

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Top tags:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            href={`/tag/${tag.slug}`}
            key={tag._id}
            className="px-3 py-1 text-black bg-gray-200 text-sm border border-gray-600 rounded hover:bg-gray-400 transition"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopTags;
