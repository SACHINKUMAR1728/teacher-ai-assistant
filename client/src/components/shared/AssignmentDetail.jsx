import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Download, FileText, Paperclip } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { SubmissionItem } from './SubmissionItem';

export const AssignmentDetail = ({ 
  assignment, 
  viewType,
  onSubmit 
}) => {
  const isExpired = isPast(new Date(assignment.deadline));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{assignment.title}</h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Posted: {format(new Date(assignment.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>Due: {format(new Date(assignment.deadline), 'MMM d, yyyy')} at {format(new Date(assignment.deadline), 'h:mm a')}</span>
            </div>
          </div>
        </div>

        {isExpired ? (
          <Badge variant="destructive">Past Due</Badge>
        ) : (
          <Badge variant="outline">Open</Badge>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-3">Instructions</h3>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
          {assignment.instructions}
        </div>
      </div>

      {assignment.fileUrl && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Paperclip className="mr-2 h-4 w-4" />
              Attachment
            </h3>
            <div className="flex items-center justify-between p-3 bg-green-500 rounded-md">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-black"/>
                <span>{assignment.fileUrl.split('/').pop()}</span>
              </div>
              <a href={assignment.fileUrl} download className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                  <span>view</span>
                </Button>
              </a>
            </div>
          </div>
        </>
      )}


      {/* {viewType === 'teacher' && assignment.submissions.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-3">Submissions ({assignment.submissions.length})</h3>
            <div className="space-y-4">
              {assignment.submissions.map((submission) => (
                <SubmissionItem key={submission.id} submission={submission} />
              ))}
            </div>
          </div>
        </>
      )} */}

      {viewType === 'student' && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-3">Your Submission</h3>
           
          </div>
        </>
      )}

      {viewType === 'student' && (
        <div className="flex justify-end mt-6">
          <Button onClick={onSubmit} disabled={isExpired}>
            {/* {assignment.submissions.length > 0 ? "Resubmit Assignment" : "Submit Assignment"} */}
            Submit Assignment
          </Button>
        </div>
      )}
    </div>
  );
};
