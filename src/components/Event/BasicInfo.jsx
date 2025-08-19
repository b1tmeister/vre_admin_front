import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import { ChromePicker } from "react-color";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Edit3,
  Save,
  X,
  Copy,
  RefreshCw,
  Palette,
  Upload,
  Download,
} from "lucide-react";
import "react-quill/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const basicInfoSchema = z
  .object({
    eventTitle: z
      .string()
      .min(1, "Event title is required")
      .max(100, "Title too long"),
    eventSlug: z
      .string()
      .min(1, "Event slug is required")
      .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
    eventStartDate: z.date(),
    eventEndDate: z.date(),
    eventDetails: z.string().optional(),
    attendeeCount: z.number().min(0, "Must be a positive number"),
    speakersCount: z.number().min(0, "Must be a positive number"),
    exhibitorsCount: z.number().min(0, "Must be a positive number"),
  })
  .refine((data) => data.eventEndDate >= data.eventStartDate, {
    message: "End date must be after start date",
    path: ["eventEndDate"],
  });

const BasicInfo = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [eventDetails, setEventDetails] = useState("");
  const [color1, setColor1] = useState("#b30056");
  const [color2, setColor2] = useState("#5f3c90");
  const [showColorPicker1, setShowColorPicker1] = useState(false);
  const [showColorPicker2, setShowColorPicker2] = useState(false);
  const [previewGradient, setPreviewGradient] = useState(false);
  const pickerRef1 = useRef(null);
  const pickerRef2 = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      eventTitle: "Bengaluru Tech Summit",
      eventSlug: "bengaluru-tech-summit",
      eventStartDate: new Date("2025-11-21"),
      eventEndDate: new Date("2025-11-24"),
      eventDetails: "",
      attendeeCount: 1000,
      speakersCount: 100,
      exhibitorsCount: 50,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef1.current && !pickerRef1.current.contains(e.target)) {
        setShowColorPicker1(false);
      }
      if (pickerRef2.current && !pickerRef2.current.contains(e.target)) {
        setShowColorPicker2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setValue("eventTitle", title);
    setValue("eventSlug", generateSlug(title));
  };

  const copySlug = () => {
    navigator.clipboard.writeText(watchedValues.eventSlug);
    toast({ title: "Slug copied to clipboard!" });
  };

  const randomizeColors = () => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
      "#00d2d3",
      "#ff9f43",
    ];
    setColor1(colors[Math.floor(Math.random() * colors.length)]);
    setColor2(colors[Math.floor(Math.random() * colors.length)]);
  };

  const exportConfig = () => {
    const config = {
      ...watchedValues,
      eventDetails,
      gradientColors: { color1, color2 },
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${watchedValues.eventSlug}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Configuration exported successfully!" });
  };

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Event information saved!",
        description: "Your event details have been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error saving event",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div>
          <CardTitle className="text-2xl font-bold">
            Event Basic Information
          </CardTitle>
          <p className="text-muted-foreground mt-1">
            Configure your event details and visual branding
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportConfig}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant={isEditing ? "destructive" : "default"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                Edit
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!isEditing ? (
          // View Mode
          <div className="space-y-4">
            <InfoRow label="Event Title" value={watchedValues.eventTitle} />
            <InfoRow
              label="Event Slug"
              value={watchedValues.eventSlug}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copySlug}
                  className="gap-1"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
              }
            />
            <InfoRow
              label="Start Date"
              value={format(watchedValues.eventStartDate, "PPP")}
            />
            <InfoRow
              label="End Date"
              value={format(watchedValues.eventEndDate, "PPP")}
            />

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="Attendees"
                value={watchedValues.attendeeCount.toLocaleString()}
                color="bg-blue-500/10 text-blue-700 dark:text-blue-400"
              />
              <StatCard
                label="Speakers"
                value={watchedValues.speakersCount.toLocaleString()}
                color="bg-green-500/10 text-green-700 dark:text-green-400"
              />
              <StatCard
                label="Exhibitors"
                value={watchedValues.exhibitorsCount.toLocaleString()}
                color="bg-purple-500/10 text-purple-700 dark:text-purple-400"
              />
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-semibold mb-2 block">
                Event Details
              </Label>
              <div
                className="prose prose-sm max-w-none dark:prose-invert border rounded-md p-4 bg-muted/50"
                dangerouslySetInnerHTML={{
                  __html: eventDetails || "No details provided yet.",
                }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-semibold">Brand Colors</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewGradient(!previewGradient)}
                  className="gap-2"
                >
                  <Palette className="w-4 h-4" />
                  {previewGradient ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex gap-2">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
                    style={{ backgroundColor: color1 }}
                  />
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
                    style={{ backgroundColor: color2 }}
                  />
                </div>
                <div
                  className="flex-1 h-12 rounded-lg border-2 border-border shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                  }}
                />
              </div>

              {previewGradient && (
                <div
                  className="mt-4 h-32 rounded-lg border-2 border-border shadow-sm relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-xl font-bold drop-shadow-lg">
                      {watchedValues.eventTitle}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  {...register("eventTitle")}
                  onChange={handleTitleChange}
                  className={errors.eventTitle ? "border-destructive" : ""}
                />
                {errors.eventTitle && (
                  <p className="text-sm text-destructive">
                    {errors.eventTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventSlug">
                  Event Slug
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={copySlug}
                    className="ml-2 h-6 gap-1"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </Label>
                <Input
                  id="eventSlug"
                  {...register("eventSlug")}
                  className={errors.eventSlug ? "border-destructive" : ""}
                />
                {errors.eventSlug && (
                  <p className="text-sm text-destructive">
                    {errors.eventSlug.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedValues.eventStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedValues.eventStartDate ? (
                        format(watchedValues.eventStartDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watchedValues.eventStartDate}
                      onSelect={(date) => setValue("eventStartDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.eventStartDate && (
                  <p className="text-sm text-destructive">
                    {errors.eventStartDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedValues.eventEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedValues.eventEndDate ? (
                        format(watchedValues.eventEndDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watchedValues.eventEndDate}
                      onSelect={(date) => setValue("eventEndDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.eventEndDate && (
                  <p className="text-sm text-destructive">
                    {errors.eventEndDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Details</Label>
              <div className="border rounded-md">
                <ReactQuill
                  theme="snow"
                  value={eventDetails}
                  onChange={setEventDetails}
                  modules={quillModules}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attendeeCount">Attendee Count</Label>
                <Input
                  id="attendeeCount"
                  type="number"
                  {...register("attendeeCount", { valueAsNumber: true })}
                  className={errors.attendeeCount ? "border-destructive" : ""}
                />
                {errors.attendeeCount && (
                  <p className="text-sm text-destructive">
                    {errors.attendeeCount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="speakersCount">Speakers Count</Label>
                <Input
                  id="speakersCount"
                  type="number"
                  {...register("speakersCount", { valueAsNumber: true })}
                  className={errors.speakersCount ? "border-destructive" : ""}
                />
                {errors.speakersCount && (
                  <p className="text-sm text-destructive">
                    {errors.speakersCount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="exhibitorsCount">Exhibitors Count</Label>
                <Input
                  id="exhibitorsCount"
                  type="number"
                  {...register("exhibitorsCount", { valueAsNumber: true })}
                  className={errors.exhibitorsCount ? "border-destructive" : ""}
                />
                {errors.exhibitorsCount && (
                  <p className="text-sm text-destructive">
                    {errors.exhibitorsCount.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Brand Colors</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={randomizeColors}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Randomize
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative" ref={pickerRef1}>
                  <Label className="block mb-2">Primary Color</Label>
                  <div
                    className="w-full h-12 rounded-lg border-2 border-border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color1 }}
                    onClick={() => {
                      setShowColorPicker1(!showColorPicker1);
                      setShowColorPicker2(false);
                    }}
                  />
                  {showColorPicker1 && (
                    <div className="absolute z-50 mt-2">
                      <ChromePicker
                        color={color1}
                        onChange={(color) => setColor1(color.hex)}
                      />
                    </div>
                  )}
                </div>

                <div className="relative" ref={pickerRef2}>
                  <Label className="block mb-2">Secondary Color</Label>
                  <div
                    className="w-full h-12 rounded-lg border-2 border-border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color2 }}
                    onClick={() => {
                      setShowColorPicker2(!showColorPicker2);
                      setShowColorPicker1(false);
                    }}
                  />
                  {showColorPicker2 && (
                    <div className="absolute z-50 mt-2">
                      <ChromePicker
                        color={color2}
                        onChange={(color) => setColor2(color.hex)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className="mt-4 h-16 rounded-lg border-2 border-border shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
                }}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                <Save className="w-4 h-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

const InfoRow = ({ label, value, action }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50">
      <div className="font-medium text-muted-foreground w-1/3">{label}</div>
      <div className="flex items-center gap-2 w-2/3 justify-end">
        <div className="text-foreground font-medium">{value}</div>
        {action}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  return (
    <div className={cn("rounded-lg p-4 text-center", color)}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm font-medium mt-1">{label}</div>
    </div>
  );
};

export default BasicInfo;
