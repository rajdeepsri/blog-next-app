'use client'

import React, { FC, FormEvent, useRef, useState } from 'react'
import { Button } from './ui/button'
import { deletePost, editPost } from '@/server/actions'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Post } from './PostCard'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Loader2, Pencil, Trash2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const DeleteEditPostBtn: FC<{ post: Post }> = ({ post }) => {
  const [formData, setFormData] = useState<{
    title: string
    content: string
    tags: string
    image: File | null
  }>({
    title: post.title,
    content: post.content!,
    tags: post.tags?.join(',') || '',
    image: null,
  })
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleEdit = async (e: FormEvent) => {
    setEditLoading(true)
    e.preventDefault()
    try {
      await editPost(formData, post.id, post.imageUrl)
      setFormData({
        title: '',
        content: '',
        tags: '',
        image: null,
      })
      closeButtonRef.current?.click()
    } catch (error) {
      console.error('Failed to edit post:', error)
    } finally {
      setEditLoading(false)
    }
  }

  const handleDeletePost = async () => {
    setDeleteLoading(true)
    await deletePost(post)
    setDeleteLoading(false)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="dialog-overlay w-[94%] rounded-md px-2 py-3 sm:w-full">
          <DialogTitle className="mt-2 text-center text-2xl font-semibold sm:text-3xl">
            Edit Post
          </DialogTitle>
          <DialogDescription hidden>this is modal</DialogDescription>
          <DialogClose ref={closeButtonRef} hidden>
            close
          </DialogClose>
          <form
            className="flex flex-col space-y-2 sm:m-5 sm:min-w-[25rem] sm:space-y-3"
            onSubmit={handleEdit}
          >
            <Input
              className="text-sm sm:text-base"
              type="text"
              name="title"
              placeholder="Enter Post Title"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              className="text-sm sm:text-base"
              rows={10}
              name="content"
              placeholder="Enter your content here"
              required
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
            <Input
              className="text-sm sm:text-base"
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
            />
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                name="image"
                className="cursor-pointer text-sm sm:text-base"
                onChange={e => {
                  const file = e.target.files?.[0] || null
                  setFormData({ ...formData, image: file })
                }}
              />
              <button
                onClick={() => setFormData({ ...formData, image: null })}
                type="button"
                className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-neutral-800 p-1 text-sm transition-all duration-100 hover:bg-neutral-800 sm:text-base"
              >
                <X size={13} />
              </button>
            </div>
            {formData.image && (
              <Image
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                width={100}
                height={100}
                className="w-full"
                style={{ objectFit: 'cover' }}
                onLoad={() => {
                  // Create a temporary URL for the file and revoke it after the image is loaded
                  const tempUrl = URL.createObjectURL(formData.image!)
                  URL.revokeObjectURL(tempUrl)
                }}
              />
            )}
            <Button
              disabled={editLoading}
              className={editLoading ? 'cursor-not-allowed' : ''}
              type="submit"
            >
              {editLoading ? <Loader2 className="animate-spin" /> : 'Edit'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Trash2 size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] rounded-md px-2 py-6 sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold sm:text-2xl">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              This action cannot be undone. This will permanently delete your post.
            </DialogDescription>
            <div className="flex w-full items-center justify-center">
              <Button
                disabled={deleteLoading}
                className={cn('mt-4 w-1/2', deleteLoading ? 'cursor-not-allowed' : '')}
                onClick={handleDeletePost}
              >
                {deleteLoading ? <Loader2 className="animate-spin" /> : 'Delete'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteEditPostBtn
