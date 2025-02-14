import { useState, useEffect } from "react";



export default function MediaSlider({ medias, staticPath }) {
    const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

    const [currentIndex, setCurrentIndex] = useState(0);



   

    return (
        <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg h-[200px]">
            {/* Slider Container */}
            <div className="flex transition-transform duration-500 ease-in-out w-full h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {
                medias.length>=1
                ?
                medias.map((media, index) => (
                    // console.log(media)
                    (media.includes('.mp4'))
                        ?
                        <video key={index} autoPlay={true}
                        className="min-w-full min-h-full object-contain my-3 rounded-lg hover:scale-[1.3] duration-[1s]">
                            <source src={APIBaseUrl+staticPath+media} type={`video/mp4`} />
                            Your browser does not support the video tag.
                        </video>
                        :
                        <img key={index} src={APIBaseUrl+staticPath+media} alt="Post" 
                        className="min-w-full min-h-full object-contain my-3 rounded-lg hover:scale-[1.3] duration-[1s]" />

                ))
                :
                ''
            }
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {medias.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === index ? "bg-red-500 scale-125" : "bg-gray-400"}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

          
        </div>
    );
}
