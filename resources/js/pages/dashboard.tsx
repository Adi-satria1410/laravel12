import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ShoppingCart,
    Package,
    Users,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Eye,
    AlertCircle,
    Calendar,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle,
    XCircle,
    Loader
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Mock data - nanti bisa diganti dengan data dari props atau API
const dashboardData = {
    stats: {
        totalRevenue: 45231.89,
        totalOrders: 1234,
        totalProducts: 567,
        totalCustomers: 890,
        revenueChange: 20.1,
        ordersChange: 15.3,
        productsChange: -2.4,
        customersChange: 8.7
    },
    recentOrders: [
        { id: '#ORD-001', customer: 'John Doe', amount: 299.99, status: 'completed', time: '2 menit lalu' },
        { id: '#ORD-002', customer: 'Jane Smith', amount: 159.50, status: 'pending', time: '15 menit lalu' },
        { id: '#ORD-003', customer: 'Bob Johnson', amount: 89.99, status: 'processing', time: '1 jam lalu' },
        { id: '#ORD-004', customer: 'Alice Brown', amount: 449.99, status: 'completed', time: '2 jam lalu' },
        { id: '#ORD-005', customer: 'Charlie Wilson', amount: 199.99, status: 'cancelled', time: '3 jam lalu' },
    ],
    lowStockProducts: [
        { name: 'iPhone 15 Pro', stock: 3, minStock: 10, category: 'Electronics' },
        { name: 'Samsung Galaxy S24', stock: 1, minStock: 5, category: 'Electronics' },
        { name: 'MacBook Air M3', stock: 2, minStock: 8, category: 'Computers' },
        { name: 'AirPods Pro', stock: 4, minStock: 15, category: 'Accessories' },
    ]
};

const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    format = 'number',
    color = 'blue'
}: {
    title: string;
    value: number;
    change: number;
    icon: any;
    format?: 'currency' | 'number';
    color?: 'blue' | 'green' | 'purple' | 'orange';
}) => {
    const isPositive = change > 0;
    const formattedValue = format === 'currency'
        ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        : value.toLocaleString('id-ID');

    const colorClasses = {
        blue: 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30',
        green: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30',
        purple: 'bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/30',
        orange: 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/30',
    };

    const iconColorClasses = {
        blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        green: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
        purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
        orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    };

    return (
        <div className={`relative overflow-hidden rounded-xl border ${colorClasses[color]} bg-white dark:bg-gray-800/50 p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{formattedValue}</p>
                    <div className="flex items-center gap-1">
                        {isPositive ? (
                            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm font-semibold ${
                            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                            {isPositive ? '+' : ''}{change}%
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">vs bulan lalu</span>
                    </div>
                </div>
                <div className={`p-3 rounded-xl ${iconColorClasses[color]}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
};

const OrderStatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
        completed: {
            class: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30',
            icon: CheckCircle,
            label: 'Selesai'
        },
        pending: {
            class: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30',
            icon: Clock,
            label: 'Menunggu'
        },
        processing: {
            class: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30',
            icon: Loader,
            label: 'Diproses'
        },
        cancelled: {
            class: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30',
            icon: XCircle,
            label: 'Dibatalkan'
        },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.class}`}>
            <IconComponent className="h-3 w-3" />
            {config.label}
        </span>
    );
};

const QuickActionButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
    >
        <Icon className="h-4 w-4" />
        {label}
    </button>
);

export default function Dashboard() {
    const currentTime = new Date().toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Toko Online" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-x-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Selamat datang kembali! Berikut ringkasan toko Anda hari ini.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            {currentTime}
                        </div>
                        <div className="flex gap-2">
                            <QuickActionButton 
                                icon={BarChart3} 
                                label="Laporan" 
                                onClick={() => console.log('Laporan')} 
                            />
                            <QuickActionButton 
                                icon={Eye} 
                                label="Analitik" 
                                onClick={() => console.log('Analitik')} 
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Pendapatan"
                        value={dashboardData.stats.totalRevenue}
                        change={dashboardData.stats.revenueChange}
                        icon={DollarSign}
                        format="currency"
                        color="green"
                    />
                    <StatCard
                        title="Total Pesanan"
                        value={dashboardData.stats.totalOrders}
                        change={dashboardData.stats.ordersChange}
                        icon={ShoppingCart}
                        color="blue"
                    />
                    <StatCard
                        title="Total Produk"
                        value={dashboardData.stats.totalProducts}
                        change={dashboardData.stats.productsChange}
                        icon={Package}
                        color="purple"
                    />
                    <StatCard
                        title="Total Pelanggan"
                        value={dashboardData.stats.totalCustomers}
                        change={dashboardData.stats.customersChange}
                        icon={Users}
                        color="orange"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {dashboardData.recentOrders.length} pesanan terbaru
                                    </p>
                                </div>
                                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                    <Eye className="h-4 w-4" />
                                    Lihat Semua
                                </button>
                            </div>
                            <div className="space-y-3">
                                {dashboardData.recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                                                <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">{order.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.amount)}
                                                </p>
                                            </div>
                                            <OrderStatusBadge status={order.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                               <div className="lg:col-span-1">
                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Stok Menipis</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {dashboardData.lowStockProducts.length} produk perlu restok
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {dashboardData.lowStockProducts.map((product, index) => {
                                    const stockPercentage = (product.stock / product.minStock) * 100;
                                    const isUrgent = stockPercentage <= 30;
                                    const isCritical = stockPercentage <= 10;
                                    
                                    return (
                                        <div key={index} className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
                                            isCritical 
                                                ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30' 
                                                : isUrgent 
                                                    ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800/30'
                                                    : 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/30'
                                        }`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {product.category}
                                                    </p>
                                                </div>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                    isCritical 
                                                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                                        : isUrgent 
                                                            ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
                                                            : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                                                }`}>
                                                    {isCritical ? 'Kritis' : isUrgent ? 'Urgent' : 'Rendah'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Sisa: <span className="font-semibold">{product.stock}</span>
                                                </span>
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Min: <span className="font-semibold">{product.minStock}</span>
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-300 ${
                                                            isCritical 
                                                                ? 'bg-red-500' 
                                                                : isUrgent 
                                                                    ? 'bg-orange-500'
                                                                    : 'bg-yellow-500'
                                                        }`}
                                                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <span>0</span>
                                                    <span>{Math.round(stockPercentage)}%</span>
                                                    <span>{product.minStock}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors border border-orange-200 dark:border-orange-800/30">
                                    Kelola Stok Produk
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Sales Chart */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Grafik Penjualan</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Tren penjualan 30 hari terakhir
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    <option>7 Hari</option>
                                    <option>30 Hari</option>
                                    <option>90 Hari</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative h-64">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        Grafik penjualan akan ditampilkan di sini
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                                        Integrasi dengan chart library
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Metrik Performa</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Ringkasan performa toko bulan ini
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Tingkat Konversi', value: '3.2%', change: '+0.5%', positive: true },
                                { label: 'Rata-rata Nilai Order', value: 'Rp 245.000', change: '+12%', positive: true },
                                { label: 'Tingkat Return', value: '2.1%', change: '-0.3%', positive: true },
                                { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', positive: true },
                            ].map((metric, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {metric.label}
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {metric.value}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                                            metric.positive 
                                                ? 'text-emerald-600 dark:text-emerald-400' 
                                                : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {metric.positive ? (
                                                <TrendingUp className="h-3 w-3" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3" />
                                            )}
                                            {metric.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Aksi Cepat</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Akses fitur yang sering digunakan
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { icon: Package, label: 'Tambah Produk', color: 'blue' },
                            { icon: ShoppingCart, label: 'Kelola Pesanan', color: 'green' },
                            { icon: Users, label: 'Data Pelanggan', color: 'purple' },
                            { icon: BarChart3, label: 'Laporan', color: 'orange' },
                            { icon: AlertCircle, label: 'Notifikasi', color: 'red' },
                            { icon: Eye, label: 'Analitik', color: 'indigo' },
                        ].map((action, index) => (
                            <button
                                key={index}
                                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                            >
                                <div className={`p-3 rounded-xl transition-colors ${
                                    action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30' :
                                    action.color === 'green' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/30' :
                                    action.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30' :
                                    action.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30' :
                                    action.color === 'red' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/30' :
                                    'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/30'
                                }`}>
                                    <action.icon className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                    {action.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
         