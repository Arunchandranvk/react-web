import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CalendarPage = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/projects`, {
        headers: { "x-user-id": user?.id }
      });
      
      const transformedEvents = response.data.map(project => ({
        id: project.id,
        title: project.name,
        date: new Date(project.created_at),
        client: project.client,
        value: project.total_cost || 0,
        status: project.status,
      }));
      
      setEvents(transformedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthDays - i)
      });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i)
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i)
      });
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInMonth(currentDate);

  const upcomingEvents = events
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getStatusColor = (status) => {
    const colors = {
      estimating: "bg-blue-500",
      bidSubmitted: "bg-indigo-500",
      accepted: "bg-emerald-500",
      inProgress: "bg-amber-500",
      completed: "bg-violet-500",
      rejected: "bg-red-500",
    };
    return colors[status] || "bg-primary";
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Calendar</h1>
          <p className="text-muted-foreground">Track project deadlines and milestones</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={goToToday} className="rounded-none">
            Today
          </Button>
          <Link to="/projects/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          {/* Calendar Header */}
          <div className="bg-card border border-border mb-6">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)} className="rounded-none">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-bold min-w-[200px] text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)} className="rounded-none">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* View Mode Tabs */}
              <div className="hidden md:flex border border-border">
                {["Month", "Week", "Day", "Agenda"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode.toLowerCase())}
                    className={`
                      px-4 py-2 text-sm font-medium transition-colors border-r border-border last:border-r-0
                      ${viewMode === mode.toLowerCase() 
                        ? "bg-secondary text-secondary-foreground" 
                        : "bg-card text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-border">
              {dayNames.map((day) => (
                <div key={day} className="px-2 py-3 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day.fullDate);
                const isTodayDate = isToday(day.fullDate);
                
                return (
                  <div
                    key={index}
                    className={`
                      min-h-[120px] border-b border-r border-border p-2 last:border-r-0
                      ${!day.isCurrentMonth ? "bg-muted/30" : "bg-card"}
                      ${isTodayDate ? "bg-primary/5" : ""}
                    `}
                  >
                    <span className={`
                      inline-flex items-center justify-center w-7 h-7 text-sm font-medium
                      ${isTodayDate 
                        ? "bg-primary text-primary-foreground" 
                        : day.isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                      }
                    `}>
                      {day.date}
                    </span>
                    
                    {/* Events */}
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <Link
                          key={event.id}
                          to={`/projects/${event.id}`}
                          className={`block ${getStatusColor(event.status)} text-white text-xs px-2 py-1 truncate hover:opacity-90 transition-opacity`}
                          title={event.title}
                        >
                          {event.title}
                        </Link>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground px-2">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar Stats */}
          <div className="bg-card border border-border p-6">
            <h3 className="font-bold mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Events</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Deadlines</span>
                <span className="font-semibold">{events.filter(e => e.status === "estimating").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-semibold">{events.filter(e => e.status === "completed").length}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-card border border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold">Recent Projects</h3>
            </div>
            
            {loading ? (
              <div className="p-4 text-center text-muted-foreground text-sm">Loading...</div>
            ) : upcomingEvents.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">No projects</div>
            ) : (
              <div className="divide-y divide-border">
                {upcomingEvents.map((event) => (
                  <Link 
                    key={event.id} 
                    to={`/projects/${event.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-1 h-full min-h-[40px] ${getStatusColor(event.status)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        {event.client && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {event.client}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
