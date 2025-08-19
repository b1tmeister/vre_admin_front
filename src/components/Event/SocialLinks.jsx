import { useState } from "react";
import { useForm } from "react-hook-form";
import { Facebook, Instagram, Linkedin, Twitter, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SocialLinks = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Social links saved:", data);

    toast({
      title: "Social links saved",
      description: "Your social media links have been updated successfully.",
    });

    setIsLoading(false);
  };

  const socialPlatforms = [
    {
      name: "facebook",
      label: "Facebook",
      placeholder: "https://facebook.com/yourpage",
      icon: Facebook,
    },
    {
      name: "instagram",
      label: "Instagram",
      placeholder: "https://instagram.com/yourhandle",
      icon: Instagram,
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/yourprofile",
      icon: Linkedin,
    },
    {
      name: "twitter",
      label: "Twitter",
      placeholder: "https://twitter.com/yourhandle",
      icon: Twitter,
    },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Linkedin className="h-4 w-4 text-primary" />
          </div>
          Social Media Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div key={platform.name} className="space-y-2">
                <Label
                  htmlFor={platform.name}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {platform.label}
                </Label>
                <Input
                  id={platform.name}
                  type="url"
                  placeholder={platform.placeholder}
                  {...register(platform.name, {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message:
                        "Please enter a valid URL starting with http:// or https://",
                    },
                  })}
                  className={errors[platform.name] ? "border-destructive" : ""}
                />
                {errors[platform.name] && (
                  <p className="text-sm text-destructive">
                    {errors[platform.name]?.message}
                  </p>
                )}
              </div>
            );
          })}

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Social Links"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SocialLinks;
