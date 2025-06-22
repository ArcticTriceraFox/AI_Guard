
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Brain, CheckCircle, X } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface ReviewAnalysisPanelProps {
  expanded?: boolean;
}

const ReviewAnalysisPanel = ({ expanded = false }: ReviewAnalysisPanelProps) => {
  const [authenticityRate] = useState(91.2);
  const [reviewSamples] = useState([
    { 
      id: 1, 
      text: "Amazing product! Best purchase ever made! 5 stars!", 
      authenticity: 23.4, 
      flags: ['Generic praise', 'Repetitive language'],
      status: 'flagged'
    },
    { 
      id: 2, 
      text: "Good quality headphones, sound is clear but bass could be better. Comfortable for long use.", 
      authenticity: 94.7, 
      flags: [],
      status: 'authentic'
    },
    { 
      id: 3, 
      text: "Product works as described. Shipping was fast and packaging was secure.", 
      authenticity: 87.3, 
      flags: ['Generic structure'],
      status: 'authentic'
    },
  ]);

  const getAuthenticityColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status: string) => {
    return status === 'authentic' ? 
      <CheckCircle className="w-4 h-4 text-green-400" /> : 
      <X className="w-4 h-4 text-red-400" />;
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700 backdrop-blur ${expanded ? 'col-span-full' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span>Review Analysis</span>
        </CardTitle>
        <CardDescription className="text-slate-400">
          AI-powered review authenticity verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Authenticity Rate</span>
          <span className="text-green-400 font-semibold">{authenticityRate}%</span>
        </div>
        <Progress value={authenticityRate} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-400">2,847</div>
            <p className="text-slate-400 text-xs">Authentic Reviews</p>
          </div>
          <div>
            <div className="text-lg font-bold text-red-400">341</div>
            <p className="text-slate-400 text-xs">Flagged Reviews</p>
          </div>
        </div>

        {expanded && (
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Review Samples</h4>
            {reviewSamples.map((review) => (
              <div key={review.id} className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <p className="text-slate-300 text-sm flex-1 mr-4">"{review.text}"</p>
                  {getStatusIcon(review.status)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">Authenticity:</span>
                    <span className={`font-semibold ${getAuthenticityColor(review.authenticity)}`}>
                      {review.authenticity}%
                    </span>
                  </div>
                  <Badge variant="outline" className={
                    review.status === 'authentic' ? 
                    'bg-green-400/20 text-green-400 border-green-400/30' :
                    'bg-red-400/20 text-red-400 border-red-400/30'
                  }>
                    {review.status}
                  </Badge>
                </div>
                {review.flags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {review.flags.map((flag, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                        {flag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewAnalysisPanel;
