import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import StudentDashboard from '../components/student/StudentDashboard';
import { BookOpen, GraduationCap } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("teacher");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-black">Learning Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs 
          defaultValue="teacher" 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Teacher</span>
            </TabsTrigger>
            <TabsTrigger value="student" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Student</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="teacher">
            <TeacherDashboard />
          </TabsContent>
          
          <TabsContent value="student">
            <StudentDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
