import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";

const Account = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    avatar: "",
    joinDate: "January 2023",
    totalOrders: 12,
    totalSpent: 85420,
  });

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 23990,
      items: 2,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&h=100&fit=crop"
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      status: "In Transit",
      total: 15999,
      items: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Delivered",
      total: 45499,
      items: 3,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop"
    },
  ];

  const breadcrumbItems = [
    { label: "My Account" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-success text-success-foreground";
      case "In Transit":
        return "bg-warning text-warning-foreground";
      case "Processing":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                  <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
                  <Badge variant="secondary">Member since {user.joinDate}</Badge>
                </div>
                
                <nav className="p-2">
                  <div className="space-y-1">
                    <Link
                      to="/account"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/account/orders"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/account/wishlist"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      to="/account/addresses"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>Addresses</span>
                    </Link>
                    <Link
                      to="/account/payments"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Payment Methods</span>
                    </Link>
                    <Link
                      to="/account/settings"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <button className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-destructive w-full">
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
                      {user.totalOrders}
                    </div>
                    <p className="text-muted-foreground">Total Orders</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-success mb-2">
                      ₹{user.totalSpent.toLocaleString()}
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
                    <p className="text-lg font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <p className="text-lg font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <p className="text-lg font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                    <p className="text-lg font-medium">March 15, 1990</p>
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
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={order.image}
                        alt="Order item"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Order {order.id}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {order.items} item{order.items !== 1 ? 's' : ''} • Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/order/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  ))}
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