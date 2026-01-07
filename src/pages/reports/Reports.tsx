import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, FileText, TrendingUp, Users } from 'lucide-react';

const Reports: React.FC = () => {
  const reportTypes = [
    {
      id: 'user-report',
      title: 'User Analytics Report',
      description: 'Detailed breakdown of user registrations, activity, and engagement',
      icon: Users,
      color: 'bg-teal/10 text-teal',
    },
    {
      id: 'course-report',
      title: 'Course Performance Report',
      description: 'Enrollment rates, completion rates, and course feedback analysis',
      icon: TrendingUp,
      color: 'bg-success/10 text-success',
    },
    {
      id: 'revenue-report',
      title: 'Revenue Report',
      description: 'Financial summary including transactions, refunds, and projections',
      icon: BarChart3,
      color: 'bg-warning/10 text-warning',
    },
    {
      id: 'admin-report',
      title: 'Admin Activity Report',
      description: 'Summary of administrative actions and system changes',
      icon: FileText,
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground">
          Generate and download platform reports
        </p>
      </div>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2">
        {reportTypes.map(report => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${report.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;
