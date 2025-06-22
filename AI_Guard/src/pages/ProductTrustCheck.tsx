
import { useState } from 'react';
import { ArrowLeft, Search, Shield, AlertTriangle, X, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';

interface TrustAnalysis {
  productId: string;
  productTitle: string;
  productImage: string;
  sellerName: string;
  trustScore: number;
  status: 'trustworthy' | 'suspicious' | 'high-risk';
  message: string;
  details: {
    counterfeiteriskScore: number;
    sellerRiskScore: number;
    reviewAuthenticityScore: number;
    flaggedReviews: number;
    totalReviews: number;
  };
}

const ProductTrustCheck = () => {
  const [productInput, setProductInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<TrustAnalysis | null>(null);
  const [error, setError] = useState('');

  const simulateAnalysis = async (input: string): Promise<TrustAnalysis> => {
    // Simulate API call - in real implementation, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on input for demo
    const isHighRisk = input.toLowerCase().includes('fake') || input.toLowerCase().includes('suspicious');
    const isSuspicious = input.toLowerCase().includes('warning') || input.toLowerCase().includes('caution');
    
    let status: 'trustworthy' | 'suspicious' | 'high-risk';
    let message: string;
    let trustScore: number;
    
    if (isHighRisk) {
      status = 'high-risk';
      message = '❌ High likelihood of counterfeit based on reviews and seller graph';
      trustScore = 23;
    } else if (isSuspicious) {
      status = 'suspicious';
      message = '⚠️ Suspicious seller behavior detected';
      trustScore = 67;
    } else {
      status = 'trustworthy';
      message = '✅ This product appears trustworthy';
      trustScore = 94;
    }

    return {
      productId: input,
      productTitle: 'Wireless Bluetooth Headphones',
      productImage: '/placeholder.svg',
      sellerName: 'TechGear Pro',
      trustScore,
      status,
      message,
      details: {
        counterfeiteriskScore: isHighRisk ? 85 : isSuspicious ? 45 : 12,
        sellerRiskScore: isHighRisk ? 78 : isSuspicious ? 52 : 8,
        reviewAuthenticityScore: isHighRisk ? 34 : isSuspicious ? 73 : 91,
        flaggedReviews: isHighRisk ? 47 : isSuspicious ? 12 : 3,
        totalReviews: 156
      }
    };
  };

  const handleAnalyze = async () => {
    if (!productInput.trim()) {
      setError('Please enter a product ID or URL');
      return;
    }

    setError('');
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const result = await simulateAnalysis(productInput);
      setAnalysis(result);
      
      // Log the query for audit purposes
      console.log('Trust check query logged:', {
        timestamp: new Date().toISOString(),
        input: productInput,
        result: result.status
      });
    } catch (err) {
      setError('Failed to analyze product. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trustworthy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'suspicious': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high-risk': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'trustworthy': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'suspicious': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'high-risk': return <X className="w-5 h-5 text-red-400" />;
      default: return <Shield className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <span>Product Trust Checker</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Verify product authenticity and seller trustworthiness before purchasing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter product ID or product URL..."
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Check Trust</span>
                    </div>
                  )}
                </Button>
              </div>

              {error && (
                <Alert className="bg-red-500/20 border-red-500/30">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {analysis && (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Trust Analysis Results</CardTitle>
                  <Badge variant="outline" className={getStatusColor(analysis.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(analysis.status)}
                      <span className="capitalize">{analysis.status.replace('-', ' ')}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={analysis.productImage} 
                      alt={analysis.productTitle}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-600"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{analysis.productTitle}</h3>
                      <p className="text-slate-400 text-sm">Seller: {analysis.sellerName}</p>
                      <p className="text-slate-400 text-sm">Product ID: {analysis.productId}</p>
                    </div>
                  </div>
                </div>

                <Alert className={`${
                  analysis.status === 'trustworthy' ? 'bg-green-500/20 border-green-500/30' :
                  analysis.status === 'suspicious' ? 'bg-yellow-500/20 border-yellow-500/30' :
                  'bg-red-500/20 border-red-500/30'
                }`}>
                  {getStatusIcon(analysis.status)}
                  <AlertDescription className={`${
                    analysis.status === 'trustworthy' ? 'text-green-300' :
                    analysis.status === 'suspicious' ? 'text-yellow-300' :
                    'text-red-300'
                  }`}>
                    {analysis.message}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Trust Score Breakdown</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Overall Trust Score</span>
                        <span className="text-white font-semibold">{analysis.trustScore}%</span>
                      </div>
                      <Progress value={analysis.trustScore} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Counterfeit Risk</span>
                        <span className="text-red-400">{analysis.details.counterfeiteriskScore}%</span>
                      </div>
                      <Progress value={analysis.details.counterfeiteriskScore} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Seller Risk</span>
                        <span className="text-yellow-400">{analysis.details.sellerRiskScore}%</span>
                      </div>
                      <Progress value={analysis.details.sellerRiskScore} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Review Authenticity</span>
                        <span className="text-green-400">{analysis.details.reviewAuthenticityScore}%</span>
                      </div>
                      <Progress value={analysis.details.reviewAuthenticityScore} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center mt-4">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-red-400">{analysis.details.flaggedReviews}</div>
                      <p className="text-slate-400 text-xs">Flagged Reviews</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-400">{analysis.details.totalReviews}</div>
                      <p className="text-slate-400 text-xs">Total Reviews</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTrustCheck;
