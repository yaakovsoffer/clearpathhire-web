import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, CreditCard, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const mockInvoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    amount: 4500.00,
    status: "paid",
    description: "Professional Staffing Services - January 2024",
  },
  {
    id: "INV-2024-002",
    date: "2024-02-15",
    dueDate: "2024-03-15",
    amount: 4500.00,
    status: "paid",
    description: "Professional Staffing Services - February 2024",
  },
  {
    id: "INV-2024-003",
    date: "2024-03-15",
    dueDate: "2024-04-15",
    amount: 4750.00,
    status: "pending",
    description: "Professional Staffing Services - March 2024",
  },
  {
    id: "INV-2024-004",
    date: "2024-04-15",
    dueDate: "2024-05-15",
    amount: 4750.00,
    status: "overdue",
    description: "Professional Staffing Services - April 2024",
  },
];

const ClientDashboardContent = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const statusConfig = {
    paid: { label: t("dashboard.paid"), icon: CheckCircle, className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    pending: { label: t("dashboard.pending"), icon: Clock, className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    overdue: { label: t("dashboard.overdue"), icon: AlertCircle, className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  };

  const filteredInvoices = filter === "all" 
    ? mockInvoices 
    : mockInvoices.filter(inv => inv.status === filter);

  const totalOutstanding = mockInvoices
    .filter(inv => inv.status !== "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <main id="main-content" role="main" aria-labelledby="dashboard-heading">
        <section className="py-20 bg-gradient-hero min-h-screen">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h1 id="dashboard-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {t("dashboard.welcome")}
                </h1>
                <p className="text-muted-foreground">
                  {user?.email ? `Logged in as ${user.email}` : t("dashboard.subtitle")}
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <DollarSign className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("dashboard.totalOutstanding")}</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(totalOutstanding)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("dashboard.paidInvoices")}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {mockInvoices.filter(inv => inv.status === "paid").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("dashboard.pendingInvoices")}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {mockInvoices.filter(inv => inv.status !== "paid").length}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {totalOutstanding > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <Button variant="hero" size="lg" asChild>
                  <Link to="/payment">
                    <CreditCard className="mr-2 h-5 w-5" aria-hidden="true" />
                    {t("dashboard.payOutstanding")} ({formatCurrency(totalOutstanding)})
                  </Link>
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-xl border border-border shadow-sm"
            >
              <div className="p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-foreground">{t("dashboard.invoices")}</h2>
                  <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter invoices">
                    {(["all", "pending", "paid", "overdue"] as const).map((status) => (
                      <Button
                        key={status}
                        variant={filter === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(status)}
                        aria-pressed={filter === status}
                      >
                        {t(`dashboard.${status}`)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {filteredInvoices.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    {t("dashboard.noInvoices")}
                  </div>
                ) : (
                  filteredInvoices.map((invoice) => {
                    const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon;
                    return (
                      <article
                        key={invoice.id}
                        className="p-6 hover:bg-muted/50 transition-colors"
                        aria-labelledby={`invoice-${invoice.id}`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-muted rounded-lg">
                              <FileText className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                            </div>
                            <div>
                              <h3 id={`invoice-${invoice.id}`} className="font-semibold text-foreground">
                                {invoice.id}
                              </h3>
                              <p className="text-sm text-muted-foreground">{invoice.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" aria-hidden="true" />
                                  <span>{t("dashboard.issued")}: {formatDate(invoice.date)}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" aria-hidden="true" />
                                  <span>{t("dashboard.due")}: {formatDate(invoice.dueDate)}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 lg:gap-6">
                            <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].className}>
                              <StatusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                              {statusConfig[invoice.status as keyof typeof statusConfig].label}
                            </Badge>
                            <p className="text-xl font-bold text-foreground min-w-[100px] text-right">
                              {formatCurrency(invoice.amount)}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                aria-label={`Download invoice ${invoice.id}`}
                              >
                                <Download className="h-4 w-4" aria-hidden="true" />
                              </Button>
                              {invoice.status !== "paid" && (
                                <Button variant="hero" size="sm" asChild>
                                  <Link to={`/payment?invoice=${invoice.id}`}>
                                    {t("dashboard.payNow")}
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

const ClientDashboard = () => {
  return (
    <ProtectedRoute>
      <ClientDashboardContent />
    </ProtectedRoute>
  );
};

export default ClientDashboard;
