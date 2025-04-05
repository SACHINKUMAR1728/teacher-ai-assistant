import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, FileText, ThumbsUp, Download } from 'lucide-react';
import { format } from 'date-fns';

export const SubmissionItem = ({ submission }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const feedback = submission.feedback || {
    content: "This is a well-structured submission. You've demonstrated a good understanding of the concepts. Consider adding more examples to illustrate the practical applications of these ideas in future submissions.",
    rating: 4,
    generatedAt: new Date().toISOString()
  };

  return (
    <Card>
      <CardHeader className="py-3">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">
            Submitted on {format(new Date(submission.submittedAt), 'MMM d, yyyy')} at {format(new Date(submission.submittedAt), 'h:mm a')}
          </h4>
          {submission.feedback && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-primary"
              onClick={() => setFeedbackOpen(true)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>View Feedback</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="py-2">
        {submission.comments && (
          <div className="mb-3">
            <p className="text-sm text-gray-600">{submission.comments}</p>
          </div>
        )}
        {submission.files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md my-1">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{file.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-2 pb-3">
        {!submission.feedback ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setFeedbackOpen(true)}
          >
            Generate AI Feedback
          </Button>
        ) : (
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span>{feedback.rating}/5 Rating</span>
            </div>
            <span>Feedback generated on {format(new Date(feedback.generatedAt), 'MMM d')}</span>
          </div>
        )}
      </CardFooter>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm">{feedback.content}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span className="font-medium">Rating: {feedback.rating}/5</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Generated on {format(new Date(feedback.generatedAt), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
