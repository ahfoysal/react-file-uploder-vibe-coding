import { useState, useRef } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = 'https://api.foysal.softvenceomega.com';

export const MultipleImageUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFilesSelect = (selectedFiles: FileList) => {
    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      toast({
        title: 'Invalid file type',
        description: 'Please select image files',
        variant: 'destructive',
      });
      return;
    }

    setFiles(imageFiles);

    const newPreviews: string[] = [];
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === imageFiles.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/aws-uploads`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadedImages(data);
      toast({
        title: 'Success!',
        description: `${data.length} image${data.length > 1 ? 's' : ''} uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload images. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPreviews([]);
    setUploadedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Multiple Images Upload
        </h2>
        <p className="text-muted-foreground">Upload multiple images to AWS S3</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFilesSelect(e.target.files)}
        />

        {previews.length === 0 ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium mb-1">Drop multiple images here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline">
              Select Images
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleUpload} disabled={isUploading} className="bg-gradient-to-r from-primary to-accent">
                {isUploading ? 'Uploading...' : `Upload ${files.length} Image${files.length > 1 ? 's' : ''}`}
              </Button>
              <Button onClick={handleReset} variant="outline">
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="space-y-3 p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Check className="w-4 h-4" />
            Upload Successful - {uploadedImages.length} Images
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={index} className="space-y-2">
                <img src={url} alt={`Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                <p className="text-xs text-muted-foreground break-all">{url}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
