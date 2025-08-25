import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Crop, RotateCw, Check } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  type: 'profile' | 'cover' | 'class';
  title: string;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  type,
  title
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRecommendations = () => {
    switch (type) {
      case 'profile':
        return {
          size: '400x400px',
          format: 'JPG, PNG',
          maxSize: '2MB',
          aspectRatio: '1:1 (Square)',
          description: 'A clear, professional headshot works best. Make sure your face is well-lit and clearly visible.'
        };
      case 'cover':
        return {
          size: '1200x300px',
          format: 'JPG, PNG',
          maxSize: '5MB',
          aspectRatio: '4:1 (Wide)',
          description: 'Use a high-quality image that represents your teaching style or subject area. Avoid cluttered backgrounds.'
        };
      case 'class':
        return {
          size: '800x600px',
          format: 'JPG, PNG',
          maxSize: '3MB',
          aspectRatio: '4:3 (Standard)',
          description: 'Choose an image that relates to your class content. Educational or subject-specific images work well.'
        };
      default:
        return {
          size: '800x600px',
          format: 'JPG, PNG',
          maxSize: '3MB',
          aspectRatio: '4:3',
          description: 'Choose a high-quality image.'
        };
    }
  };

  const recommendations = getRecommendations();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > parseInt(recommendations.maxSize) * 1024 * 1024) {
        alert(`File size must be less than ${recommendations.maxSize}`);
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUpload(selectedFile);
      onClose();
      resetModal();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Recommended Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">Dimensions:</span>
                <p className="text-blue-700">{recommendations.size}</p>
              </div>
              <div>
                <span className="font-medium text-blue-800">Aspect Ratio:</span>
                <p className="text-blue-700">{recommendations.aspectRatio}</p>
              </div>
              <div>
                <span className="font-medium text-blue-800">Format:</span>
                <p className="text-blue-700">{recommendations.format}</p>
              </div>
              <div>
                <span className="font-medium text-blue-800">Max Size:</span>
                <p className="text-blue-700">{recommendations.maxSize}</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="font-medium text-blue-800">Tips:</span>
              <p className="text-blue-700 text-sm">{recommendations.description}</p>
            </div>
          </div>

          {/* Upload Area */}
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-coral-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop your image here or click to browse
              </h3>
              <p className="text-gray-600 mb-4">
                Supports {recommendations.format} up to {recommendations.maxSize}
              </p>
              <button className="bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors">
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={previewUrl!}
                  alt="Preview"
                  className={`w-full object-cover ${
                    type === 'profile' ? 'h-64' : type === 'cover' ? 'h-32' : 'h-48'
                  }`}
                />
              </div>

              {/* File Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Crop Tools (Placeholder) */}
              <div className="flex items-center justify-center space-x-4 py-4 border-t border-gray-200">
                <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                  <Crop className="h-4 w-4 mr-2" />
                  Crop
                </button>
                <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Rotate
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex items-center px-6 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Upload Photo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadModal;