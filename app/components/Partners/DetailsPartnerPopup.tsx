import { Partners } from '@/app/(pages)/partners/page';
import { axiosInstance } from '@/app/lib/axiosIntance';
import React from 'react'


type PartnerDetailPopupProps = {
  formData: any;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  partner: Partners[];
  setPartner: React.Dispatch<React.SetStateAction<Partners[]>>;
  selectedFile: File | null;
  token: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCourse: (newPartner: Partners) => void;
};
export default function DetailsPartnerPopup({
  formData,
  handleChange,
  selectedFile,
  partner,
  setPartner,
  token,
  setIsAddModalOpen,
  handleFileChange,
  handleAddCourse,
}: PartnerDetailPopupProps) {

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const data = new FormData();
    
          data.append("partnerDescription", formData.partnerDescription);
    
          if (selectedFile) {
            data.append("img", selectedFile);
          }
    
          const response = await axiosInstance.post("/partners", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
      
          handleAddCourse(response.data);
    
          setIsAddModalOpen(false);
        } catch (error) {
          console.error("Error adding course:", error);
        }
      };
  return (
     <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="partnerDescription" className="block text-sm font-medium">
          Partner Description
        </label>
        <input
          id="partnerDescription"
          name="partnerDescription"
          value={formData.partnerDescription}
          onChange={handleChange}
          type="text"
          placeholder="e.g. UI/UX"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black text-gray-700 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium">
          Upload Image
        </label>
        <input
          id="images"
          name="images"
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          placeholder="Upload image"
          className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
        />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="submit"
          className="w-full bg-MainBg text-white py-2 px-4 rounded-md hover:bg-DarkGrey transition-all ease-in-out duration-300"
        >
          Add Partner
        </button>
      </div>
    </form>
  )
}
