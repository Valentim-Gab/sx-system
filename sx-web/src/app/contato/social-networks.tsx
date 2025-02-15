'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { getSiteConfig } from '@/services/siteConfigService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Contact {
  name: string
  icon: string
  href?: string
  classes: string
}

export default function SocialNetworks() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getSiteConfig()

      if (data) {
        const contacts: Contact[] = [
          {
            name: 'Instagram',
            icon: 'icon-[mdi--instagram]',
            href: data.instagramUrl,
            classes: 'btn-instagram',
          },
          {
            name: 'Facebook',
            icon: 'icon-[mdi--facebook]',
            href: data.facebookUrl,
            classes: 'btn-facebook',
          },
          {
            name: 'Google email',
            icon: 'icon-[logos--google-gmail]',
            href: data.gmailUrl,
            classes: 'btn-gmail',
          },
          {
            name: 'WhatsApp',
            icon: 'icon-[mdi--whatsapp]',
            href: data.whatsappUrl,
            classes: 'btn-whatsapp',
          },
        ]

        setContacts(contacts)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="bg-[#632a64da] w-full h-[50px] rounded-2xl shadow sm:h-[60px]"
          />
        ))}
      </>
    )
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="col-span-full w-full h-[50px] sm:h-[60px]">
        <h3 className="text-white">Redes-sociais não encontradas</h3>
      </div>
    )
  }

  return (
    <>
      {contacts
        .filter((contact: Contact) => contact.href)
        .map((contact, index) => (
          <Link
            key={index}
            href={contact.href || '#'}
            target="_blank"
            className={twMerge(
              'flex items-center justify-center gap-2 px-4 py-2 w-full h-[50px] rounded-2xl shadow sm:h-[60px]',
              contact.classes
            )}
          >
            <i
              className={`${contact.icon} w-6 h-6 text-white fill-white sm:w-8 sm:h-8`}
            ></i>
            <span className="font-medium sm:text-xl">{contact.name}</span>
          </Link>
        ))}
    </>
  )
}
