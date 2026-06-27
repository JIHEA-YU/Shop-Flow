import Image from "next/image";

interface ProductImageGalleryProps {
  title: string;
  thumbnail: string;
  images: string[];
}

export function ProductImageGallery({ title, thumbnail, images }: ProductImageGalleryProps) {
  const mainImage = images[0] || thumbnail || null;
  const thumbnails = images.length > 0 ? images : thumbnail ? [thumbnail] : [];

  if (!mainImage) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-zinc-100 text-sm text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500">
        이미지가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={mainImage}
          alt={title}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
      {thumbnails.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {thumbnails.map((src, index) => (
            <div
              key={src}
              className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900"
            >
              <Image
                src={src}
                alt={`${title} ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
