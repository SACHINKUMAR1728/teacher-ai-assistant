import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from 'lucide-react';
import { toast } from "sonner";

const SubmitAssignment = ({ assignment, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Only image files (PNG, JPEG, JPG) are allowed.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please attach an image file.");
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("assignmentId", assignment.id);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/student/submit", {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("Failed to submit assignment");
      
      toast.success("Assignment submitted successfully");
      setFile(null);

      // Fetch feedback
      const feedbackResponse = await fetch(`http://localhost:5000/api/evaluate/${assignment.id}`);
      if (!feedbackResponse.ok) throw new Error("Failed to fetch feedback");
      
      const feedback = await feedbackResponse.json();
      onSubmit({ file, feedback });
      toast.success("Feedback received successfully");
    } catch (error) {
      toast.error(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <Label htmlFor="file-upload">Upload Image</Label>
        <div className="mt-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-primary/50 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-primary">Click to upload</span> or drag and drop
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
              </div>
            </div>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {file && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Selected File:</h4>
            <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
              <span className="truncate max-w-xs">{file.name}</span>
              <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSubmit} disabled={!file || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Assignment"}
        </Button>
      </div>
    </div>
  );
};

export default SubmitAssignment;
