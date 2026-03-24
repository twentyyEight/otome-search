import { useEffect, useRef } from "react";

export default function Carousel({ images }) {

    const containerRef = useRef(null);
    const imgsRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const imgs = imgsRef.current;

        let animationId;

        const scroll = () => {

            container.scrollLeft += 10;

            if (container.scrollLeft + container.offsetWidth >= imgs.scrollWidth) {

                const newImages = Array.from(imgs.children).slice(0, images.length);
                newImages.forEach((img) => {
                    const clone = img.cloneNode(true);
                    imgs.appendChild(clone);
                });

            }

            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationId);
    }, [images]);

    return (
        <div
            ref={containerRef}
            className="w-full h-[33vh] overflow-hidden scroll-smooth"
        >
            <div ref={imgsRef} className="flex h-full">
                {images?.map(img => (
                    <img
                        key={img.id}
                        src={img.image.url}
                        className="object-cover h-full m-1 rounded-md"
                    />
                ))}
            </div>
        </div>
    )
}