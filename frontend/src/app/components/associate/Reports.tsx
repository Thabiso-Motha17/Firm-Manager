import { Card, CardContent, CardHeader, CardTitle } from '../ui/Cards';
import { Badge } from '../ui/Badges';
import { Button } from '../ui/Buttons';
import { 
  BarChart3, 
  Download,
  Calendar,
  DollarSign,
  Briefcase,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';

export function Reports() {
  const quarterlyStats = {
    revenue: '$342,500',
    revenueChange: '+12.5%',
    cases: 24,
    casesChange: '+3',
    clients: 187,
    clientsChange: '+12',
    winRate: '87%',
    winRateChange: '+2%'
  };

  const casesByType = [
    { type: 'Estate Planning', count: 8, percentage: 33, color: 'bg-primary' },
    { type: 'Corporate Law', count: 6, percentage: 25, color: 'bg-accent' },
    { type: 'Contract Disputes', count: 5, percentage: 21, color: 'bg-warning' },
    { type: 'Real Estate', count: 3, percentage: 13, color: 'bg-success' },
    { type: 'Other', count: 2, percentage: 8, color: 'bg-muted' }
  ];

  const monthlyRevenue = [
    { month: 'Jul', amount: 28500 },
    { month: 'Aug', amount: 32100 },
    { month: 'Sep', amount: 29800 },
    { month: 'Oct', amount: 35200 },
    { month: 'Nov', amount: 38400 },
    { month: 'Dec', amount: 42500 },
    { month: 'Jan', amount: 45200 }
  ];

  const topClients = [
    { name: 'TechCo Industries', revenue: '$45,200', cases: 3 },
    { name: 'Anderson Corp', revenue: '$38,500', cases: 2 },
    { name: 'Smith LLC', revenue: '$32,100', cases: 4 },
    { name: 'Martinez Estate', revenue: '$28,750', cases: 1 },
    { name: 'Thompson Family', revenue: '$24,300', cases: 2 }
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.amount));

  return (
    <div className="p-6 md:p-8 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track firm performance and key metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Date Range</span>
          </Button>
          <Button variant="primary" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="success" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                {quarterlyStats.revenueChange}
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">{quarterlyStats.revenue}</h3>
            <p className="text-sm text-muted-foreground">Quarterly Revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <Badge variant="success" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                {quarterlyStats.casesChange}
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">{quarterlyStats.cases}</h3>
            <p className="text-sm text-muted-foreground">Active Cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <Badge variant="success" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                {quarterlyStats.clientsChange}
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">{quarterlyStats.clients}</h3>
            <p className="text-sm text-muted-foreground">Total Clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <Badge variant="success" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                {quarterlyStats.winRateChange}
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-1">{quarterlyStats.winRate}</h3>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend (Last 7 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">{data.month}</span>
                      <span className="text-foreground font-semibold">
                        ${(data.amount / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                        style={{ width: `${(data.amount / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cases by Type */}
          <Card>
            <CardHeader>
              <CardTitle>Cases by Practice Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {casesByType.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{item.count} cases</span>
                        <span className="text-sm font-semibold text-foreground w-12 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Clients */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Clients by Revenue</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {topClients.map((client, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{client.name}</h4>
                          <p className="text-xs text-muted-foreground">{client.cases} active cases</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{client.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Generate Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Case Summary Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <DollarSign className="w-4 h-4" />
                Financial Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Client Activity Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BarChart3 className="w-4 h-4" />
                Performance Metrics
              </Button>
            </CardContent>
          </Card>

          {/* Report Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Monthly Summary</p>
                <p className="text-xs text-muted-foreground">Every 1st of the month</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Quarterly Review</p>
                <p className="text-xs text-muted-foreground">Every quarter end</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Client Updates</p>
                <p className="text-xs text-muted-foreground">Weekly on Fridays</p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Manage Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
