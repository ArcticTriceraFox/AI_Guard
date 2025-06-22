
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface RefundProcessingPanelProps {
  expanded?: boolean;
}

const RefundProcessingPanel = ({ expanded = false }: RefundProcessingPanelProps) => {
  const [avgProcessingTime, setAvgProcessingTime] = useState(87);
  const [recentRefunds] = useState([
    { id: 'RF001', amount: 299.99, reason: 'Counterfeit Product', time: '23ms', status: 'completed' },
    { id: 'RF002', amount: 45.50, reason: 'Fake Reviews Detected', time: '156ms', status: 'processing' },
    { id: 'RF003', amount: 127.00, reason: 'Quality Mismatch', time: '89ms', status: 'completed' },
    { id: 'RF004', amount: 89.99, reason: 'Seller Violation', time: '45ms', status: 'completed' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'processing': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700 backdrop-blur ${expanded ? 'col-span-full' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span>Instant Refunds</span>
        </CardTitle>
        <CardDescription className="text-slate-400">
          Ultra-fast automated refund processing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{avgProcessingTime}ms</div>
            <p className="text-slate-400 text-sm">Avg Processing Time</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">99.8%</div>
            <p className="text-slate-400 text-sm">Success Rate</p>
          </div>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Target: &lt;100ms achieved</span>
          </div>
        </div>

        {expanded && (
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Recent Refunds</h4>
            {recentRefunds.map((refund) => (
              <div key={refund.id} className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium">${refund.amount}</span>
                  </div>
                  <Badge className={getStatusColor(refund.status)}>
                    {refund.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{refund.reason}</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400">{refund.time}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Refund ID: {refund.id}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RefundProcessingPanel;
