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
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const DeleteEditPostBtn: FC<{ post: Post }> = ({ post }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content!,
    tags: post.tags?.join(','),
  })
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleEdit = async (e: FormEvent) => {
    setEditLoading(true)
    e.preventDefault()
    try {
      await editPost(formData, post.id)
      setFormData({
        title: '',
        content: '',
        tags: '',
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
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <DialogTitle className="mt-5 text-center text-3xl font-semibold">Edit Post</DialogTitle>
          <DialogDescription hidden>this is modal</DialogDescription>
          <DialogClose ref={closeButtonRef} hidden>
            close
          </DialogClose>
          <form className="m-5 flex min-w-[25rem] flex-col space-y-3" onSubmit={handleEdit}>
            <Input
              type="text"
              name="title"
              placeholder="Enter Post Title"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              rows={10}
              name="content"
              placeholder="Enter your content here"
              required
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
            <Input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
            />
            <Input type="file" accept="image/*" name="image" className="cursor-pointer" />
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
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
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
