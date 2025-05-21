"use client";

import { useState } from "react";
import { Memory } from "@/types/memories";
import MemoriesTable from "./MemoriesTable";
import MemoryDetailsModal from "./MemoryDetailsModal";

export default function MemoriesSection({ memories }: { memories: Memory[] }) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRowClick = (memoryId: string) => {
    const memory = memories.find((m) => m._id === memoryId);
    if (memory) {
      setSelectedMemory(memory);
      setIsModalVisible(true);
    }
  };

  return (
    <div className="space-y-6">
      <MemoriesTable tableData={memories} handleRowClick={handleRowClick} />

      {selectedMemory && (
        <MemoryDetailsModal
          memory={selectedMemory}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
}
