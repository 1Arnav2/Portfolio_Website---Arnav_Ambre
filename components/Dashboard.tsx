import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, DashboardIcon, CustomersIcon, ReportsIcon, GeoIcon, ConversationsIcon, DealsIcon, ExportIcon, SettingsIcon, LogoutIcon, ChevronDownIcon, ArrowUpRightIcon, MoreHorizontalIcon, StarIcon, EditIcon, MessageIcon } from './icons/dashboard/DashboardIcons';

// --- Helper Components & Data ---

const useCountUp = (end: number, duration = 1500, start: boolean) => {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = (frame / totalFrames) ** 2; // Ease out
      const currentCount = Math.round(end * progress);
      setCount(currentCount > end ? end : currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, duration, start, totalFrames]);

  return count;
};

const DonutChart = ({ percentage, inView }: { percentage: number, inView: boolean }) => {
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(0);
    const count = useCountUp(percentage, 1500, inView);

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setProgress(percentage), 100);
            return () => clearTimeout(timer);
        } else {
            setProgress(0);
        }
    }, [percentage, inView]);

    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-blue-500"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        transition: 'stroke-dashoffset 1.5s ease-out'
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{count}%</span>
            </div>
        </div>
    );
};

const LineChart = ({ inView }: { inView: boolean }) => {
  const points = "10,80 50,60 90,70 130,50 170,60 210,40 250,55";
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className="h-40">
      <svg width="100%" height="100%" viewBox="0 0 260 100" preserveAspectRatio="none">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.3)' }} />
            <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0)' }} />
            </linearGradient>
        </defs>
        <path d={`M0,100 ${points} 260,100 Z`} fill="url(#gradient)" />
        <path
          ref={pathRef}
          d={`M${points}`}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={inView ? 'animate-dash' : ''}
          style={{
            strokeDasharray: length,
            strokeDashoffset: length,
          }}
        />
        <style>{`
            .animate-dash {
                animation: dash 1.5s ease-out forwards;
            }
            @keyframes dash {
                to {
                    stroke-dashoffset: 0;
                }
            }
        `}</style>
      </svg>
    </div>
  );
};

const customers = [
    { name: 'Chris Friedkly', company: 'Supermarket', avatar: 'placeholder' },
    { name: 'Maggie Johnson', company: 'Oasis Organic Inc.', avatar: 'placeholder', active: true },
    { name: 'Gael Harry', company: 'New York Finest Fruits', avatar: 'placeholder' },
    { name: 'Jenna Sullivan', company: 'Walmart', avatar: 'placeholder' },
    { name: 'John Smith', company: 'Whole Foods', avatar: 'placeholder' },
    { name: 'Anna Lee', company: 'Trader Joes', avatar: 'placeholder' },
];

const chats = [ { avatar: 'p1' }, { avatar: 'p2' }, { avatar: 'p3' }, { avatar: 'p4' }];

// --- View Components ---
const DummyView: React.FC<{ title: string }> = ({ title }) => (
    <div className="p-6 bg-gray-50 rounded-2xl w-full h-full flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
);

const CustomersCard: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
    <div className={`bg-gray-50 p-6 rounded-2xl ${className}`} style={style}>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-lg">Customers</h3>
            <button className="text-sm text-gray-500 flex items-center gap-1">Sort by Newest <ChevronDownIcon className="w-4 h-4" /></button>
        </div>
        <div className="space-y-2">
        {customers.map(c => (
            <div key={c.name} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${c.active ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                    <div>
                        <p className={`font-medium text-sm ${c.active ? 'text-gray-900' : 'text-gray-700'}`}>{c.name}</p>
                        <p className="text-xs text-gray-500">{c.company}</p>
                    </div>
                </div>
                {c.active && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <MessageIcon className="w-5 h-5 hover:text-blue-500 cursor-pointer"/>
                        <StarIcon className="w-5 h-5 hover:text-yellow-500 cursor-pointer"/>
                        <EditIcon className="w-5 h-5 hover:text-green-500 cursor-pointer"/>
                        <MoreHorizontalIcon className="w-5 h-5 hover:text-gray-800 cursor-pointer"/>
                    </div>
                )}
            </div>
        ))}
        </div>
         <a href="#" className="text-sm font-semibold text-blue-500 mt-4 inline-block">All customers &rarr;</a>
    </div>
);

const TopStatesCard: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
    <div className={`bg-gray-50 p-6 rounded-2xl ${className}`} style={style}>
        <h3 className="font-semibold text-gray-800 mb-4">Top states</h3>
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-gray-600">NY</span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
                <span className="text-sm font-semibold text-gray-800">120k</span>
            </div>
             <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-gray-600">MA</span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '55%'}}></div>
                </div>
                <span className="text-sm font-semibold text-gray-800">80k</span>
            </div>
             <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-gray-600">NH</span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
                <span className="text-sm font-semibold text-gray-800">70k</span>
            </div>
        </div>
    </div>
);

const ChatsCard: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
     <div className={`bg-gray-50 p-6 rounded-2xl ${className}`} style={style}>
        <h3 className="font-semibold text-gray-800">Chats</h3>
        <p className="text-sm text-gray-400 mb-4">2 unread messages</p>
        <div className="flex -space-x-2">
        {chats.map(c => <div key={c.avatar} className="w-9 h-9 rounded-full bg-gray-200 border-2 border-gray-50"></div>)}
        </div>
    </div>
);

const NewDealsCard: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
    <div className={`bg-gray-50 p-6 rounded-2xl ${className}`} style={style}>
        <h3 className="font-semibold text-gray-800 mb-4">New deals</h3>
        <div className="flex flex-wrap gap-2">
            <button className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">Fruit2go</button>
            <button className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">Marshal's MKT</button>
            <button className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">CCNT</button>
            <button className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">Joana MIN-market</button>
        </div>
    </div>
);


// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');

    const revenue = useCountUp(15, 1500, inView && isLoggedIn);
    const lostDeals = useCountUp(4, 1500, inView && isLoggedIn);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.15 } // Trigger animation slightly earlier
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
          if(currentRef) observer.unobserve(currentRef);
        }
    }, []);

    const handleLogout = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsLoggedIn(false);
            setIsAnimatingOut(false);
            setActiveView('dashboard');
        }, 1000); // Match duration-1000
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'customers', label: 'Customers', icon: CustomersIcon },
        { id: 'reports', label: 'All reports', icon: ReportsIcon },
        { id: 'geography', label: 'Geography', icon: GeoIcon },
        { id: 'conversations', label: 'Conversations', icon: ConversationsIcon },
        { id: 'deals', label: 'Deals', icon: DealsIcon },
        { id: 'export', label: 'Export', icon: ExportIcon },
    ];


  return (
    <section 
      ref={sectionRef} 
      id="dashboard" 
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
        <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                Dashboard Preview
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                An interactive demonstration of a data analytics dashboard.
            </p>
        </div>
        {isLoggedIn ? (
        <div style={{ perspective: '1500px' }}>
            <div className={`max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-3xl shadow-2xl border border-gray-200/80 transition-all duration-1000 ease-out ${(inView && !isAnimatingOut) ? 'opacity-100 rotate-x-0 rotate-y-0 scale-100' : 'opacity-0 rotate-x-[10deg] -rotate-y-[8deg] scale-95'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <span className="text-2xl font-bold text-gray-800">Alytics</span>
                            </div>

                            <div className="relative mb-6">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Search" className="w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 transition"/>
                            </div>
                            
                            <nav className="space-y-2">
                                {navItems.map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setActiveView(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors ${activeView === item.id ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <item.icon className="w-5 h-5" /> {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div>
                                    <p className="font-semibold text-gray-800">Arnav Ambre</p>
                                </div>
                             </div>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><SettingsIcon className="w-5 h-5" /> Settings</a>
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left"><LogoutIcon className="w-5 h-5" /> Log out</button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main>
                       {activeView === 'dashboard' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                <div className={`bg-gray-50 p-6 rounded-2xl transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '100ms' }}>
                                    <h3 className="font-semibold text-gray-500">Revenues</h3>
                                    <p className="text-4xl font-bold text-gray-800 my-3 flex items-center gap-2">{revenue}% <ArrowUpRightIcon className="w-6 h-6 text-green-500" /></p>
                                    <p className="text-sm text-gray-400">Increase compared to last week</p>
                                    <a href="#" className="text-sm font-semibold text-blue-500 mt-4 inline-block">Recent and report &rarr;</a>
                                </div>
                                <div className={`bg-gray-50 p-6 rounded-2xl transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '200ms' }}>
                                    <h3 className="font-semibold text-gray-500">Lost deals</h3>
                                    <p className="text-4xl font-bold text-gray-800 my-3">{lostDeals}%</p>
                                    <p className="text-sm text-gray-400">You closed 96 out of 100 deals</p>
                                    <a href="#" className="text-sm font-semibold text-blue-500 mt-4 inline-block">All deals &rarr;</a>
                                </div>
                                <div className={`bg-gray-50 p-6 rounded-2xl flex flex-col items-center justify-between transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                                    <h3 className="font-semibold text-gray-500 w-full">Quarter goal</h3>
                                    <DonutChart percentage={84} inView={inView && isLoggedIn} />
                                    <a href="#" className="text-sm font-semibold text-blue-500 mt-2 inline-block">All goals &rarr;</a>
                                </div>
                                <CustomersCard className={`md:col-span-2 xl:col-span-1 transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '400ms' }}/>
                                <div className={`md:col-span-2 bg-gray-50 p-6 rounded-2xl transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '500ms' }}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold text-gray-800 text-lg">Growth</h3>
                                         <button className="text-sm text-gray-500 flex items-center gap-1">Yearly <ChevronDownIcon className="w-4 h-4" /></button>
                                    </div>
                                    <LineChart inView={inView && isLoggedIn} />
                                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-xs text-gray-400">Top month</p>
                                            <p className="font-bold text-blue-500 text-lg">November</p>
                                            <p className="text-xs text-gray-400">2019</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Top year</p>
                                            <p className="font-bold text-blue-500 text-lg">2023</p>
                                            <p className="text-xs text-gray-400">96k sold so far</p>
                                        </div>
                                         <div>
                                            <p className="text-xs text-gray-400">Top buyer</p>
                                            <div className="flex items-center justify-center gap-2 mt-1">
                                                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                                                <p className="text-sm font-semibold text-gray-800">Maggie J.</p>
                                            </div>
                                            <p className="text-xs text-gray-400">Oasis Organic Inc.</p>
                                        </div>
                                    </div>
                                </div>
                                <ChatsCard className={`transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '600ms' }} />
                                <TopStatesCard className={`transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '700ms' }} />
                                <NewDealsCard className={`transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '800ms' }} />
                           </div>
                       )}
                       {activeView === 'customers' && <CustomersCard className="h-full" />}
                       {activeView === 'reports' && <DummyView title="All Reports" />}
                       {activeView === 'geography' && <TopStatesCard className="h-full" />}
                       {activeView === 'conversations' && <ChatsCard className="h-full" />}
                       {activeView === 'deals' && <NewDealsCard className="h-full" />}
                       {activeView === 'export' && <DummyView title="Export Data" />}
                    </main>
                </div>
            </div>
        </div>
        ) : (
            <div className="text-center fade-in" style={{ animationDelay: '300ms' }}>
                <button 
                    onClick={() => setIsLoggedIn(true)}
                    className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-0.5"
                >
                    Click to Login
                </button>
            </div>
        )}
    </section>
  );
};

export default Dashboard;