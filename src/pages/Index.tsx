import { SingleImageUpload } from '@/components/SingleImageUpload';
import { MultipleImageUpload } from '@/components/MultipleImageUpload';
import { ImageIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-elegant">
              <ImageIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Image Upload Studio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your images seamlessly with our modern, intuitive interface. Choose between single or multiple file uploads.
          </p>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          <SingleImageUpload />
          <MultipleImageUpload />
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Built with React • Powered by modern web technologies</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
