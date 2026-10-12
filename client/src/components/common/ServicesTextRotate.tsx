import React from "react";
import { Preview } from "@/components/ui/demo";

interface ServicesTextRotateProps {
  onSelectServiceModal?: (service: any) => void;
}

export const ServicesTextRotate: React.FC<ServicesTextRotateProps> = () => {
  return (
    <div className="w-full">
      <Preview />
    </div>
  );
};

export default ServicesTextRotate;
