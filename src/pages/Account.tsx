import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { useLocation } from "react-router-dom";

const Account = () => {
  const { user, signOut } = useAuth();
  const { orders } = useOrders();
  const location = useLocation();
  
  // Get current route to highlight active nav item
  const currentPath = location.pathname;
  
  const recentOrders = orders.slice(0, 3); // Show only 3 most recent orders
  
  const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0);

  const breadcrumbItems = [
    { label: "My Account" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-success-foreground";
      case "shipped":
      case "processing":
        return "bg-primary text-primary-foreground";
      case "confirmed":
        return "bg-warning text-warning-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getNavItemClass = (path: string) => {
    return currentPath === path
      ? "flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
      : "flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors";
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in to access your account</h2>
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Check if we should render Orders component - remove this since we have separate routes
  // if (currentPath === "/account/orders") {
  //   const Orders = require("./Orders").default;
  //   return <Orders />;
  // }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="p-6 text-center border-b">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-lg">
                      {user.email?.split('@')[0].charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold mb-1">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
                  <Badge variant="secondary">
                    Member since {new Date(user.created_at).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </Badge>
                </div>
                
                <nav className="p-2">
                  <div className="space-y-1">
                    <Link
                      to="/account"
                      className={getNavItemClass("/account")}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/account/orders"
                      className={getNavItemClass("/account/orders")}
                    >
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/account/wishlist"
                      className={getNavItemClass("/account/wishlist")}
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      to="/account/addresses"
                      className={getNavItemClass("/account/addresses")}
                    >
                      <MapPin className="h-5 w-5" />
                      <span>Addresses</span>
                    </Link>
                    <Link
                      to="/account/payments"
                      className={getNavItemClass("/account/payments")}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Payment Methods</span>
                    </Link>
                    <Link
                      to="/account/settings"
                      className={getNavItemClass("/account/settings")}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-destructive w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Account Overview */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Account Overview</h1>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {orders.length}
                    </div>
                    <p className="text-muted-foreground">Total Orders</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-success mb-2">
                      ₹{totalSpent.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Total Spent</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">
                      5
                    </div>
                    <p className="text-muted-foreground">Wishlist Items</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-lg font-medium">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <p className="text-lg font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <p className="text-lg font-medium">
                      {user.user_metadata?.phone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <p className="text-lg font-medium">
                      {new Date(user.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button asChild variant="outline">
                    <Link to="/account/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                      <Button asChild className="mt-4">
                        <Link to="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">Order {order.order_number}</p>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? 's' : ''} • Placed on {new Date(order.created_at).toLocaleDateString('en-IN')}
                          </p>
                          <p className="font-semibold">₹{order.total_amount.toLocaleString()}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/order/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/account/orders">
                      <Package className="h-6 w-6 mb-2" />
                      Track Orders
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/account/wishlist">
                      <Heart className="h-6 w-6 mb-2" />
                      My Wishlist
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/account/addresses">
                      <MapPin className="h-6 w-6 mb-2" />
                      Manage Addresses
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/account/payments">
                      <CreditCard className="h-6 w-6 mb-2" />
                      Payment Methods
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;