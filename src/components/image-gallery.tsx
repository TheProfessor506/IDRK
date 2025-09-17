"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

interface ImageGalleryProps {
  images: ImagePlaceholder[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="aspect-square w-full overflow-hidden rounded-lg cursor-zoom-in group shadow-lg">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={600}
                        height={600}
                        data-ai-hint={image.imageHint}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="p-0 border-0 max-w-5xl w-full h-auto bg-transparent shadow-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.imageUrl.replace('/600/600', '/1200/800')}
                      alt={image.description}
                      className="object-contain w-full h-auto max-h-[90vh] rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 -translate-x-1/2 md:-translate-x-12 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-0 translate-x-1/2 md:translate-x-12 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
