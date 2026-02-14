import { useEffect, useState, useRef } from 'react';

export function useCanvasVideo(canvasRef, frameCount = 278, options = {}) {
    const {
        imageFolder = "/frames/",
        imagePrefix = "ezgif-frame-",
        imageExtension = ".jpg",
        usePadding = true
    } = options;

    const [images, setImages] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);

    // We use a ref to store images to avoid re-renders on every load
    const savedImages = useRef([]);

    // Preload images on mount
    useEffect(() => {
        const loadedImages = [];
        let loadCounter = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Pad numbers if usePadding is true (001, 002, etc.)
            const padNumber = (num) => usePadding ? num.toString().padStart(3, '0') : num.toString();
            const filename = `${imagePrefix}${padNumber(i)}${imageExtension}`;
            img.src = `${imageFolder}${filename}`;

            img.onload = () => {
                loadCounter++;
                setLoadedCount(loadCounter);
            };

            savedImages.current[i - 1] = img; // Store in order
            loadedImages.push(img);
        }

        // Sort logic not strictly needed if we access by index, but good for array state
        // We use a ref for immediate access in the loop anyway
    }, [frameCount]);

    // Draw function - Memoized to prevent re-renders
    const drawFrame = useCallback((index, fitMode = 'cover') => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d', {
            alpha: false,
            colorSpace: 'display-p3'
        });
        if (!context) return;

        // High-DPI Support - Calculated efficiently
        const dpr = window.devicePixelRatio || 1;

        // Check if resize is actually needed to avoid layout thrashing
        // accessing clientWidth/Height is cheaper than getBoundingClientRect
        const rectWidth = canvas.clientWidth;
        const rectHeight = canvas.clientHeight;

        const targetWidth = Math.floor(rectWidth * dpr);
        const targetHeight = Math.floor(rectHeight * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            context.scale(dpr, dpr);
        }

        // Logical width/height for calculations (CSS pixels)
        const width = rectWidth;
        const height = rectHeight;

        const imgIndex = Math.min(frameCount - 1, Math.max(0, Math.round(index)));
        const img = savedImages.current[imgIndex];

        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Object Fit: Cover/Contain Logic
        const vW = img.naturalWidth;
        const vH = img.naturalHeight;
        const rW = width / vW;
        const rH = height / vH;

        // Use Math.max for cover, Math.min for contain
        let ratio = fitMode === 'contain' ? Math.min(rW, rH) : Math.max(rW, rH);

        // MANUALLY INCREASE SIZE HERE:
        let heightStretch = 1;
        if (window.innerWidth < 768) {
            ratio = ratio * 1.75; // Zoom (Width)

            // DYNAMIC HEIGHT STRETCH:
            // Keeps Logo (frames 0-30) perfect. Stretches later frames for immersion.
            const stretchStart = 30;
            const maxStretch = 1.05; // Decreased from 1.5 - Change this to tweak intensity

            if (index > stretchStart) {
                const progress = Math.min(1, (index - stretchStart) / 60); // Ramp up stretch over 60 frames
                heightStretch = 1 + (progress * (maxStretch - 1));
            }
        }

        const newW = vW * ratio;
        const newH = vH * ratio * heightStretch;
        const x = (width - newW) / 2;
        const y = (height - newH) / 2;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        context.clearRect(0, 0, width, height);
        context.drawImage(img, x, y, newW, newH);
    }, [frameCount, canvasRef]); // Dependencies

    return {
        progress: (loadedCount / frameCount) * 100,
        isLoading: loadedCount < frameCount,
        drawFrame
    };
}
