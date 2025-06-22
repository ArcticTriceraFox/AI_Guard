
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Shield } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface TrustScorePanelProps {
  expanded?: boolean;
}

const TrustScorePanel = ({ expanded = false }: TrustScorePanelProps) => {
  const [overallTrustScore, setOverallTrustScore] = useState(87.3);
  const [topSellers] = useState([
    { name: 'TechPro Electronics', score: 96.8, trend: '+2.3', verified: true },
    { name: 'HomeGoods Plus', score: 94.2, trend: '+1.8', verified: true },
    { name: 'Fashion Forward', score: 91.7, trend: '-0.5', verified: true },
    { name: 'Gadget Galaxy', score: 89.4, trend: '+3.1', verified: false },
  ]);

  const getTrustColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTrustBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-400/20 text-green-400 border-green-400/30';
    if (score >= 70) return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
    return 'bg-red-400/20 text-red-400 border-red-400/30';
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700 backdrop-blur ${expanded ? 'col-span-full' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span>Trust Scores</span>
        </CardTitle>
        <CardDescription className="text-slate-400">
          Transparent seller and product trust metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className={`text-3xl font-bold ${getTrustColor(overallTrustScore)}`}>
            {overallTrustScore.toFixed(1)}
          </div>
          <p className="text-slate-400 text-sm">Platform Trust Score</p>
          <Progress value={overallTrustScore} className="h-2" />
        </div>

        {expanded && (
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Top Trusted Sellers</h4>
            {topSellers.map((seller, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-white">{seller.name}</span>
                    {seller.verified && (
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getTrustBadgeColor(seller.score)}>
                      {seller.score}
                    </Badge>
                    <span className={`text-sm ${seller.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {seller.trend}
                    </span>
                  </div>
                </div>
                <Progress value={seller.score} className="h-2" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrustScorePanel;
