'use client'
import { toPng } from 'html-to-image'

interface ShareButtonsProps {
  receiptRef: React.RefObject<HTMLDivElement>
  username: string
}

export function ShareButtons({ receiptRef, username }: ShareButtonsProps) {
  const downloadImage = async () => {
    if (receiptRef.current) {
      const dataUrl = await toPng(receiptRef.current, { quality: 0.95 })
      const link = document.createElement('a')
      link.download = `github-receipt-${username}.png`
      link.href = dataUrl
      link.click()
    }
  }

  const shareReceipt = async () => {
    if (!receiptRef.current) return

    try {
      const dataUrl = await toPng(receiptRef.current)
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], 'github-receipt.png', { type: 'image/png' })

      if (navigator.share) {
        await navigator.share({
          title: 'My GitHub Receipt',
          text: `Check out my GitHub stats for ${username}!`,
          files: [file]
        })
      } else {
        // Fallback to download if share API is not available
        downloadImage()
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <button
        onClick={downloadImage}
        className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        title="Download receipt"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      <button
        onClick={shareReceipt}
        className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        title="Share receipt"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
    </div>
  )
}