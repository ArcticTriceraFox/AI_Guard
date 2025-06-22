
import { Shield, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  activeThreats: number;
  processedRefunds: number;
}

const DashboardHeader = ({ activeThreats, processedRefunds }: DashboardHeaderProps) => {
  return (
    <div className="bg-slate-900/95 backdrop-blur border-b border-slate-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Amazon TrustGuard</h1>
                <p className="text-slate-400 text-sm">AI-Powered Trust & Safety Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="text-right">
                <div className="text-white font-semibold">{activeThreats.toLocaleString()}</div>
                <div className="text-slate-400 text-xs">Active Threats</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <div className="text-right">
                <div className="text-white font-semibold">{processedRefunds.toLocaleString()}</div>
                <div className="text-slate-400 text-xs">Refunds Today</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div className="text-right">
                <div className="text-white font-semibold">87ms</div>
                <div className="text-slate-400 text-xs">Avg Response</div>
              </div>
            </div>

            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              System Online
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
