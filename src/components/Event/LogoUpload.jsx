import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit3, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LogoUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop&crop=center"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [tempPreviewUrl, setTempPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleEditClick = () => {
    setIsModalOpen(true);
    setTempPreviewUrl(previewUrl);
    setSelectedFile(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setTempPreviewUrl(url);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (selectedFile && tempPreviewUrl) {
      setPreviewUrl(tempPreviewUrl);
      toast({
        title: "Logo updated successfully",
        description: "Your new logo has been saved",
      });
    }
    setIsModalOpen(false);
    setSelectedFile(null);
    setTempPreviewUrl(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    if (tempPreviewUrl && tempPreviewUrl !== previewUrl) {
      URL.revokeObjectURL(tempPreviewUrl);
    }
    setTempPreviewUrl(null);
  };

  return (
    <>
      <Card className="relative group max-w-sm mx-auto overflow-hidden bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <div className="p-6">
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-muted/30 ring-2 ring-border/20 group-hover:ring-primary/30 transition-all duration-300">
              <img
                src={previewUrl}
                alt="Company Logo"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <Button
              onClick={handleEditClick}
              size="sm"
              variant="secondary"
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-1">Company Logo</h3>
            <p className="text-sm text-muted-foreground">
              Click edit to change
            </p>
          </div>
        </div>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Update Logo
            </DialogTitle>
            <DialogDescription>
              Choose a new logo for your company. Supported formats: JPG, PNG,
              SVG (max 5MB)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted/30 ring-2 ring-border/20">
                <img
                  src={tempPreviewUrl || previewUrl}
                  alt="Logo Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Choose File Button */}
            <Button
              onClick={handleChooseFile}
              variant="outline"
              className="w-full py-6 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors duration-200"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose New Logo
            </Button>

            {selectedFile && (
              <div className="text-center text-sm text-muted-foreground">
                Selected: {selectedFile.name}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!selectedFile}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoUpload;
