'use client'

import { getAllPosts } from '@/services/blogService'
import { environment } from '@/environments/environment'
import InnerHtmlContainer from '@/components/InnerHtmlContainer/InnerHtmlContainer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Post } from '@/interfaces/blog'

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getAllPosts()

      if (posts) {
        setPosts(posts)
      }
    }
    fetchPosts()
  }, [])

  if (!posts) {
    return <main>Carregando...</main>
  }

  return (
    <main className="flex-auto flex flex-col items-center bg-background-secondary">
      <section className="mt-8">
        <h1 className="text-2xl">Blog</h1>
      </section>
      <section className="main-container gap-6 w-full p-4 py-8 sm:p-8">
        {posts &&
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-card p-4 shadow-lg rounded-lg sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <Image
                  src={`${environment.API_URL}/site/main-avatar`}
                  alt="Foto de susana"
                  width={44}
                  height={44}
                  quality={50}
                  className="w-[44px] h-fit"
                />
                <div>
                  <p className="text-lg leading-5">
                    <strong>Susi Xavier</strong>
                  </p>
                  <p className="text-sm font-light">
                    {post.formatDate.date} - {post.formatDate.time}
                  </p>
                </div>
              </div>
              <InnerHtmlContainer html={post.message} />
            </div>
          ))}
      </section>
    </main>
  )
}
