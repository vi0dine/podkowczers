import React, { useState } from 'react';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import './Slideshow.styles.scss';
import useInterval from "@use-it/interval";

export const Slideshow = ({images, delay}) => {
    const [index, setIndex] = useState(0);

    useInterval(() => {
        if (index < images.length-1) {
            setIndex(index+1)
        } else {
            setIndex(0)
        }
    }, delay);

    return (
        <div className={'Slideshow'} >
            <Gallery
                index={index}
                onRequestChange={i => {
                    setIndex(i);
                }}
            >
                {images.map(img => (
                    <GalleryImage objectFit="cover" key={img.src} src={img.src} />
                ))}
            </Gallery>
        </div>
    );
};