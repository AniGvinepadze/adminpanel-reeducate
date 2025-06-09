import React from 'react'

type BlogMainPopupProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};
export default function MainBlogPopup({ formData,
  handleChange,
  handleFileChange,
  handleSubmit}:BlogMainPopupProps) {

    
  return (
 
  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="Enter course name"
              className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
            />
          </div>
          <div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mt-4"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                type="text"
                placeholder="Enter course name"
                className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-black sm:text-sm p-2"
              />
                <div className='mt-5'>
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

            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-MainBg text-white py-2 px-4 rounded-md hover:bg-DarkGrey transition-all ease-in-out duration-300"
              >
                Add Blog
              </button>
            </div>
          </div>
        </form> 
  )
}
