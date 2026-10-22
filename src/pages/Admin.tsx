import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Search,
  Bell,
  Menu,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  HeartPulse,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Revenue',
    value: '$48,250',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Total Orders',
    value: '1,829',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
  },
  {
    label: 'Total Products',
    value: '89',
    change: '+3.1%',
    trend: 'up',
    icon: Package,
  },
  {
    label: 'Total Patients',
    value: '2,340',
    change: '-1.4%',
    trend: 'down',
    icon: Users,
  },
];

const orders = [
  {
    id: '#ORD-7841',
    customer: 'James Anderson',
    product: 'Prosthetic Leg – Carbon Fiber',
    date: 'Oct 21, 2026',
    amount: '$2,450',
    status: 'Delivered',
  },
  {
    id: '#ORD-7840',
    customer: 'Sarah Mitchell',
    product: 'Knee Orthosis Brace',
    date: 'Oct 20, 2026',
    amount: '$320',
    status: 'Shipped',
  },
  {
    id: '#ORD-7839',
    customer: 'Robert Chen',
    product: 'Wheelchair – Lightweight',
    date: 'Oct 19, 2026',
    amount: '$890',
    status: 'Processing',
  },
  {
    id: '#ORD-7838',
    customer: 'Emily Johnson',
    product: 'Ankle Foot Orthosis',
    date: 'Oct 18, 2026',
    amount: '$175',
    status: 'Delivered',
  },
  {
    id: '#ORD-7837',
    customer: 'Michael Brown',
    product: 'Rehab Therapy Kit',
    date: 'Oct 17, 2026',
    amount: '$540',
    status: 'Cancelled',
  },
  {
    id: '#ORD-7836',
    customer: 'Jessica Williams',
    product: 'Prosthetic Arm – Myoelectric',
    date: 'Oct 16, 2026',
    amount: '$3,200',
    status: 'Shipped',
  },
];

const statusColors: Record<string, string> = {
  Delivered: 'bg-emerald-50 text-emerald-600',
  Shipped: 'bg-navy-50 text-navy',
  Processing: 'bg-amber-50 text-amber-600',
  Cancelled: 'bg-primary/10 text-primary',
};

function MedicalPlusLogo({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative inline-flex items-center justify-center rounded-full bg-pink shrink-0"
      style={{ width: size, height: size }}
    >
      <Plus
        className="text-primary"
        strokeWidth={3}
        style={{ width: size * 0.5, height: size * 0.5 }}
      />
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Package, label: 'Products', active: false },
    { icon: ShoppingBag, label: 'Orders', active: false },
    { icon: Users, label: 'Patients', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-navy text-white z-50 transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-2.5 px-6 h-16 border-b border-white/10">
          <MedicalPlusLogo size={36} />
          <span className="text-lg font-extrabold tracking-tight">MobilityOne</span>
        </div>
        <nav className="px-4 py-6 space-y-1 flex-1">
          {links.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                link.active
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </a>
          ))}
        </nav>
        <div className="px-4 pb-6">
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold">Clinic Status</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              All systems operational. 3 appointments pending today.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-soft">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-navy"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-navy">Dashboard</h1>
              <p className="text-xs text-navy/40 hidden sm:block">
                Welcome back, Dr. Admin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-pink-50 rounded-xl">
              <Search className="w-4 h-4 text-primary" />
              <input
                placeholder="Search..."
                className="bg-transparent text-sm text-navy/70 outline-none w-32 lg:w-48"
              />
            </div>
            <button className="relative p-2 text-navy/50 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>
            <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card hover:shadow-hover transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                      stat.trend === 'up'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-extrabold text-navy">{stat.value}</p>
                <p className="text-sm text-navy/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-extrabold text-navy">Recent Orders</h2>
                <p className="text-sm text-navy/40">
                  Latest patient orders and their status
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-primary/25">
                <Plus className="w-4 h-4" strokeWidth={3} />
                Add Product
              </button>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="text-left text-xs font-bold text-navy/40 uppercase tracking-wider">
                    <th className="px-5 py-3">Order ID</th>
                    <th className="px-5 py-3">Patient</th>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-pink-50/40 transition-colors">
                      <td className="px-5 py-4 text-sm font-bold text-primary">
                        {order.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-xs font-bold text-primary">
                            {order.customer.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-navy">
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-navy/50">
                        {order.product}
                      </td>
                      <td className="px-5 py-4 text-sm text-navy/50">
                        {order.date}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-navy">
                        {order.amount}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 border-t border-gray-100 text-center">
              <a
                href="#"
                className="text-sm font-bold text-primary hover:text-primary-dark transition-colors"
              >
                View All Orders →
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
