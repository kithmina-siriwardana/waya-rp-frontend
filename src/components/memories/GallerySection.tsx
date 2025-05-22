"use client";

import { useState } from "react";
import Image from "next/image";
import { Memory } from "@/types/memories";
import Button from "@/components/ui/Button";
import MemoryDetailsModal from "./MemoryDetailsModal";

// interface GalleryModalProps {
//   memory: Memory;
//   isOpen: boolean;
//   onClose: () => void;
// }

// function GalleryModal({ memory, isOpen, onClose }: GalleryModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-semibold text-gray-900">
//             {memory.topic}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row gap-8">
//             {memory.imageUrl && (
//               <div className="md:w-1/2">
//                 <Image
//                   src={memory.imageUrl}
//                   alt={memory.topic}
//                   width={400}
//                   height={300}
//                   className="w-full h-auto rounded-lg object-cover shadow-md"
//                 />
//               </div>
//             )}
//             <div className="md:w-1/2 space-y-6">
//               <div className="space-y-2">
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   {memory.topic}
//                 </h3>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <span>
//                     {new Date(memory.date).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <span>
//                     Created{" "}
//                     {memory.createdAt
//                       ? new Date(memory.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })
//                       : "N/A"}
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-sm font-medium text-gray-500 mb-2">
//                   Description
//                 </h3>
//                 <p className="text-gray-900 leading-relaxed">
//                   {memory.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function GallerySection({ memories }: { memories: Memory[] }) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div className="space-y-6">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <div
            key={memory._id}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => setSelectedMemory(memory)}
          >
            {memory.imageUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={memory.imageUrl}
                  alt={memory.topic}
                  width={500}
                  height={500}
                  className="object-cover w-full h-48"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {memory.topic}
                </h3>
                <p className="text-white mb-4">
                  {new Date(memory.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <button
                  className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={() => setSelectedMemory(memory)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      {selectedMemory && (
        <>
          <MemoryDetailsModal
            memory={selectedMemory}
            isModalVisible={!!selectedMemory}
            setIsModalVisible={() => setSelectedMemory(null)}
          />
          {/* <GalleryModal
            memory={selectedMemory}
            isOpen={!!selectedMemory}
            onClose={() => setSelectedMemory(null)}
          /> */}
        </>
      )}
    </div>
  );
}
