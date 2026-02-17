import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your platform's performance.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value="$45,231.89"
                    change="+20.1% from last month"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Active Users"
                    value="+2350"
                    change="+180.1% from last month"
                    icon={Users}
                />
                <StatsCard
                    title="Courses Sold"
                    value="+12,234"
                    change="+19% from last month"
                    icon={BookOpen}
                />
                <StatsCard
                    title="Active Now"
                    value="+573"
                    change="+201 since last hour"
                    icon={TrendingUp}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-col gap-1">
                        <h3 className="text-lg font-semibold leading-none tracking-tight">Recent Sales</h3>
                        <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
                    </div>
                    <div className="p-6 pt-0">
                        {/* Placeholder for a list of recent sales */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        JD
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">John Doe</p>
                                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                                    </div>
                                    <div className="ml-auto font-medium">+$19.99</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-col gap-1">
                        <h3 className="text-lg font-semibold leading-none tracking-tight">Popular Courses</h3>
                        <p className="text-sm text-muted-foreground">Most viewed courses this month.</p>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Advanced React Patterns</p>
                                        <p className="text-sm text-muted-foreground">1.2k enrollees</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, change, icon: Icon }: any) {
    return (
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </div>
        </div>
    );
}
