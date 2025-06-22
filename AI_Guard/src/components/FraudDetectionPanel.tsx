
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Eye, Ban, CheckCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface FraudDetectionPanelProps {
  expanded?: boolean;
}

const FraudDetectionPanel = ({ expanded = false }: FraudDetectionPanelProps) => {
  const [detectionRate, setDetectionRate] = useState(94.7);
  const [recentDetections, setRecentDetections] = useState([
    { id: 1, type: 'Counterfeit Product', product: 'iPhone 15 Pro', confidence: 98.5, status: 'blocked' },
    { id: 2, type: 'Fake Reviews', product: 'Wireless Earbuds', confidence: 87.2, status: 'investigating' },
    { id: 3, type: 'Price Manipulation', product: 'Gaming Console', confidence: 92.1, status: 'blocked' },
    { id: 4, type: 'Duplicate Listing', product: 'Smart Watch', confidence: 95.8, status: 'blocked' },
  ]);

  useEffect(() => {
    if (expanded) {
      const interval = setInterval(() => {
        setDetectionRate(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 0.2));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [expanded]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-red-400 bg-red-400/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-green-400 bg-green-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'blocked': return <Ban className="w-4 h-4" />;
      case 'investigating': return <Eye className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700 backdrop-blur ${expanded ? 'col-span-full' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span>Fraud Detection Engine</span>
        </CardTitle>
        <CardDescription className="text-slate-400">
          Real-time AI-powered fraud detection and prevention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Detection Accuracy</span>
          <span className="text-green-400 font-semibold">{detectionRate.toFixed(1)}%</span>
        </div>
        <Progress value={detectionRate} className="h-2" />
        
        <Alert className="bg-red-500/20 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            47 counterfeit listings blocked in the last hour
          </AlertDescription>
        </Alert>

        {expanded && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Recent Detections</h4>
            {recentDetections.map((detection) => (
              <div key={detection.id} className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(detection.status)}
                    <span className="text-white font-medium">{detection.type}</span>
                  </div>
                  <Badge className={getStatusColor(detection.status)}>
                    {detection.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{detection.product}</span>
                  <span className="text-green-400">{detection.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FraudDetectionPanel;
