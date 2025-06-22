
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import FraudDetectionPanel from '../components/FraudDetectionPanel';
import TrustScorePanel from '../components/TrustScorePanel';
import RefundProcessingPanel from '../components/RefundProcessingPanel';
import ReviewAnalysisPanel from '../components/ReviewAnalysisPanel';
import SellerMonitoringPanel from '../components/SellerMonitoringPanel';

const Index = () => {
  const [activeThreats, setActiveThreats] = useState(247);
  const [processedRefunds, setProcessedRefunds] = useState(1834);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveThreats(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setProcessedRefunds(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <DashboardHeader 
        activeThreats={activeThreats}
        processedRefunds={processedRefunds}
      />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/product-trust-check">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Shield className="w-4 h-4 mr-2" />
              Check Product Trust
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 backdrop-blur">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
            <TabsTrigger value="fraud-detection" className="text-white data-[state=active]:bg-blue-600">Fraud Detection</TabsTrigger>
            <TabsTrigger value="trust-scores" className="text-white data-[state=active]:bg-blue-600">Trust Scores</TabsTrigger>
            <TabsTrigger value="refunds" className="text-white data-[state=active]:bg-blue-600">Instant Refunds</TabsTrigger>
            <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-blue-600">Review Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <FraudDetectionPanel />
              <TrustScorePanel />
              <RefundProcessingPanel />
              <ReviewAnalysisPanel />
              <SellerMonitoringPanel />
            </div>
          </TabsContent>

          <TabsContent value="fraud-detection">
            <FraudDetectionPanel expanded={true} />
          </TabsContent>

          <TabsContent value="trust-scores">
            <TrustScorePanel expanded={true} />
          </TabsContent>

          <TabsContent value="refunds">
            <RefundProcessingPanel expanded={true} />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewAnalysisPanel expanded={true} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
