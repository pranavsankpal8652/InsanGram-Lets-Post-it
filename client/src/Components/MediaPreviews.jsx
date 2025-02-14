import React from 'react'
import { FaTimes } from 'react-icons/fa';

export default function MediaPreviews({ preview, removeMedia, previewType }) {
    return (
        <>
            <div className="flex  flex-wrap gap-4 overflow-auto max-h-[200px] md:max-h-none ">
                {
                    preview.map((prev, index) => {
                        const previewMedia = (typeof prev === "string" || previewType === 'URL') ? prev : URL.createObjectURL(prev);

                        // Determine if it's an image or video
                        const isImage = (typeof prev === "string" || previewType === 'URL')
                            ? !prev.includes('.mp4') && !prev.includes('.webm') && !prev.includes('.mov')
                            : prev.type.includes('image');
                        return (

                            <div className="mt-3 w-fit relative" key={index}>
                                {   isImage
                                     ?
                                        <img src={previewMedia} alt="preview" className="w-35 h-35 object-cover rounded-lg" />
                                        :
                                        <video src={previewMedia} alt="Preview" className="w-35 h-35 object-cover rounded-lg" autoPlay={true} />

                                }
                                <button className=" absolute top-0 right-1 bg-gray-800 text-white rounded-full p-1">
                                    <FaTimes onClick={() => removeMedia(prev)} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
