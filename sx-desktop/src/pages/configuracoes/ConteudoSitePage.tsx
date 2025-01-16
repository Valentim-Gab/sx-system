import { environment } from '@/environments/environment'
import { useToast } from '@/hooks/use-toast'
import { SiteConfigService } from '@/services/SiteConfigService'
import { useRef, useState } from 'react'
import BackLinkBtn from '@/components/buttons/BackLinkBtn'

export default function ConteudoSitePage() {
  const siteConfigService = new SiteConfigService()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [newAvatar, setNewAvatar] = useState<File | null>(null)
  const { toast } = useToast()

  const changeAvatar = () => {
    inputFileRef.current?.click()

    inputFileRef.current?.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement

      if (!target.files) {
        return
      }

      const file = target.files.item(0)

      if (file) {
        setNewAvatar(file)
      }
    })
  }

  const cancelChangeAvatar = () => {
    setNewAvatar(null)

    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  const acceptChangeAvatar = async () => {
    if (!newAvatar) {
      return
    }

    const isSuccess = await siteConfigService.uploadMainAvatar(newAvatar)

    if (isSuccess) {
      setNewAvatar(null)
      toast({
        title: 'Avatar atualizado',
        variant: 'positive',
      })
    } else {
      toast({
        title: 'Erro ao atualizar avatar',
        variant: 'destructive',
      })
    }
  }

  return (
    <main className="main-container flex flex-col gap-4 p-4">
      <section>
        <BackLinkBtn to="/dashboard/configuracoes" />
      </section>
      <section className="flex-auto section p-8 flex flex-col items-center gap-8">
        <h1>Avatar principal do site</h1>
        <div className="relative w-fit">
          <div className="rounded-full w-full aspect-square overflow-hidden sm:min-w-[300px] sm:max-w-[400px]">
            {!newAvatar && (
              <img
                src={`${environment.apiUrl}/site/main-avatar`}
                onErrorCapture={(event) => {
                  const target = event.target as HTMLImageElement
                  target.src = '/imgs/default-avatar.png'
                }}
                alt="Avatar"
                className="h-full object-cover object-top"
              />
            )}
            {newAvatar && (
              <img
                src={URL.createObjectURL(newAvatar)}
                alt="Avatar"
                className="w-full h-full object-cover object-top"
              />
            )}
          </div>
          <span
            className="flex items-center justify-center p-2 bg-primary text-white rounded-full absolute right-[13%] bottom-[5%] cursor-pointer"
            onClick={changeAvatar}
          >
            <i className="icon-[solar--gallery-edit-bold] text-2xl"></i>
          </span>
          {newAvatar && (
            <span
              className="flex items-center justify-center p-2 bg-positive text-white rounded-full absolute right-[2%] bottom-[18%] cursor-pointer"
              onClick={acceptChangeAvatar}
            >
              <i className="icon-[f7--checkmark-alt] text-2xl"></i>
            </span>
          )}
          {newAvatar && (
            <span
              className="flex items-center justify-center p-2 bg-destructive text-white rounded-full absolute right-[28%] bottom-[-4%] cursor-pointer"
              onClick={cancelChangeAvatar}
            >
              <i className="icon-[f7--xmark] text-2xl"></i>
            </span>
          )}
          <input
            ref={inputFileRef}
            type="file"
            accept="image/png, image/jpeg, image/bmp, image/gif"
            className="hidden"
          />
        </div>
      </section>
    </main>
  )
}
