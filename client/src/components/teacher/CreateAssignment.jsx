import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

export const CreateAssignment = ({ onCreateAssignment }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    defaultValues: { title: "", instructions: "" },
  });

  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = form;

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(`File type not supported: ${file.name}`);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error(`File too large (max 10MB): ${file.name}`);
      return;
    }

    setSelectedFile(file); // Store the selected file
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input field
  };

  const onSubmit = async (data) => {
    if (!deadline) {
      setError("deadline", { type: "manual", message: "Please select a deadline" });
      return;
    }
    clearErrors("deadline");

    // Create FormData object
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("instructions", data.instructions);
    formData.append("deadline", deadline.toISOString());
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/teacher/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload assignment");

      toast.success("Assignment submitted successfully! 🎉");
      window.alert("Assignment submitted successfully! ✅");

      // Reset form and clear selections
      reset();
      setDeadline(null);
      removeFile();
    } catch (error) {
      console.error("Error uploading assignment:", error);
      toast.error("Failed to create assignment");
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormItem>
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter assignment title"
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 5, message: "Title must be at least 5 characters" },
                  })}
                />
              </FormControl>
              <FormMessage>{errors.title?.message}</FormMessage>
            </FormItem>

            {/* Deadline */}
            <FormItem className="flex flex-col">
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button type="button" variant="outline" className={cn(
                      "w-full pl-3 text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}>
                      {deadline ? format(deadline, "PPP") : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage>{errors.deadline?.message}</FormMessage>
            </FormItem>

            {/* Instructions */}
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-32"
                  placeholder="Enter detailed instructions"
                  {...register("instructions", {
                    required: "Instructions are required",
                    minLength: { value: 10, message: "Instructions must be at least 10 characters" },
                  })}
                />
              </FormControl>
              <FormMessage>{errors.instructions?.message}</FormMessage>
            </FormItem>

            {/* File Upload */}
            <div>
              <FormLabel>Attachment Files</FormLabel>
              <div className="mt-2">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-primary/50 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">JPEG, PNG, GIF, BMP, WEBP up to 10MB</p>
                    </div>
                  </div>
                  <input ref={fileInputRef} id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
              </div>

              {selectedFile && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Selected File:</h4>
                  <div className="flex items-center justify-between text-sm p-2 bg-green-500 rounded">
                    <span className="truncate max-w-xs">{selectedFile.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={removeFile} className="text-destructive hover:text-destructive/90">
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">Create Assignment</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
