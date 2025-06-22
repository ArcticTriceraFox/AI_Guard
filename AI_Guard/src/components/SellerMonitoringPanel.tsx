
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AlertCircle, TrendingDown } from 'lucide-react';

interface SellerMonitoringPanelProps {
  expanded?: boolean;
}

const SellerMonitoringPanel = ({ expanded = false }: SellerMonitoringPanelProps) => {
  const flaggedSellers = [
    { name: 'QuickDeals Store', violations: 23, risk: 'high', penalty: 'Suspended' },
    { name: 'Bargain Electronics', violations: 8, risk: 'medium', penalty: 'Warning' },
    { name: 'Flash Sales Co', violations: 12, risk: 'medium', penalty: 'Review Hold' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      default: return 'bg-green-400/20 text-green-400 border-green-400/30';
    }
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700 backdrop-blur ${expanded ? 'col-span-full' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Users className="w-5 h-5 text-orange-400" />
          <span>Seller Monitoring</span>
        </CardTitle>
        <CardDescription className="text-slate-400">
          Dynamic seller penalty and accountability system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-orange-400">47</div>
            <p className="text-slate-400 text-xs">Flagged Sellers</p>
          </div>
          <div>
            <div className="text-lg font-bold text-red-400">12</div>
            <p className="text-slate-400 text-xs">Active Penalties</p>
          </div>
        </div>

        {expanded && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Recent Actions</h4>
            {flaggedSellers.map((seller, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white">{seller.name}</span>
                  <Badge variant="outline" className={getRiskColor(seller.risk)}>
                    {seller.risk} risk
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-slate-400">{seller.violations} violations</span>
                  </div>
                  <span className="text-red-400">{seller.penalty}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SellerMonitoringPanel;
