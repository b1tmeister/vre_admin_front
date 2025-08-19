import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

const referenceImages = [
  {
    id: 1,
    url: "https://res.cloudinary.com/testvre/image/upload/v1753686333/banners/c5bjrfku2vnblcluk2zl.jpg",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/testvre/image/upload/v1753686592/banners/nyy4piiqxazjlqknwywk.png",
  },
];

const WebsiteBanner = ({ onSave }) => {
  const [selectedImages, setSelectedImages] = useState([null, null]);
  const [texts, setTexts] = useState(["", ""]);

  const handleImageSelect = (img) => {
    const updated = [...selectedImages];

    // Fill first empty or replace first
    const emptyIndex = updated.findIndex((i) => i === null);
    if (emptyIndex !== -1) {
      updated[emptyIndex] = img;
    } else {
      updated[0] = img;
    }

    setSelectedImages(updated);
  };

  const handleRemove = (index) => {
    const updated = [...selectedImages];
    updated[index] = null;
    setSelectedImages(updated);
  };

  const handleTextChange = (value, index) => {
    const updated = [...texts];
    updated[index] = value;
    setTexts(updated);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        selectedImages,
        texts,
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Website Banner
        </h3>
        <p className="text-muted-foreground">
          Create and customize your event banners
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {selectedImages.map((img, index) => (
          <div key={index} className="flex-1 max-w-sm">
            {img ? (
              <div className="relative group">
                <img
                  src={img.url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg border-2 border-border"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemove(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="w-full h-40 bg-muted border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">No Image Selected</span>
              </div>
            )}

            <Input
              type="text"
              placeholder="Enter your banner text here"
              value={texts[index]}
              onChange={(e) => handleTextChange(e.target.value, index)}
              className="mt-3"
            />

            <Button variant="outline" className="w-full mt-3" disabled={!img}>
              Configure Banner
            </Button>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold text-foreground mb-4">
          Reference Images
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {referenceImages.map((img) => (
            <Card
              key={img.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/20 group"
              onClick={() => handleImageSelect(img)}
            >
              <img
                src={img.url}
                alt={`Reference ${img.id}`}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-card">
                <p className="text-sm text-muted-foreground">
                  Click to select this banner template
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-6">
          Save Changes
        </Button>
      </div>
    </Card>
  );
};

export default WebsiteBanner;
