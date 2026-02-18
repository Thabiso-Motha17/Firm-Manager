import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Cards';
import { Badge } from '../ui/Badges';
import { Button } from '../ui/Buttons';
import { Calendar as CalendarWidget } from '../ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  User,
  Video,
  Plus,
  Search,
  Filter,
  Edit,
  Trash,
  X,
  FileText
} from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import type{ Event } from '../types/types';



export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [filterType, setFilterType] = useState<'all' | Event['type']>('all');
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedEventDetail, setSelectedEventDetail] = useState<Event | null>(null);

  // Mock events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Initial Consultation - New Estate Planning Client',
      type: 'consultation',
      date: new Date(2026, 1, 5),
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      location: 'Conference Room A',
      client: 'Robert Williams',
      attendees: ['Sarah Mitchell', 'Alex Rodriguez'],
      status: 'scheduled',
      priority: 'high',
      notes: 'High-value estate, complex family structure'
    },
    {
      id: 2,
      title: 'Court Hearing - Johnson v. State',
      type: 'hearing',
      date: new Date(2026, 1, 5),
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      location: 'District Court, Room 403',
      caseNumber: 'CAS-2026-001',
      client: 'John Johnson',
      attendees: ['Sarah Mitchell', 'Alex Rodriguez', 'Judge Thompson'],
      status: 'scheduled',
      priority: 'high',
      notes: 'Final hearing for estate distribution'
    },
    {
      id: 3,
      title: 'Partner Strategy Meeting',
      type: 'internal',
      date: new Date(2026, 1, 5),
      startTime: '4:30 PM',
      endTime: '5:30 PM',
      isVirtual: true,
      attendees: ['All Partners', 'Senior Associates'],
      status: 'scheduled',
      priority: 'medium',
      notes: 'Q1 review and planning'
    },
    {
      id: 4,
      title: 'Contract Filing Deadline - TechCo Merger',
      type: 'deadline',
      date: new Date(2026, 1, 7),
      startTime: '5:00 PM',
      endTime: '5:00 PM',
      caseNumber: 'CAS-2026-003',
      client: 'TechCo Industries',
      status: 'scheduled',
      priority: 'high',
      notes: 'SEC filing deadline - critical'
    },
    {
      id: 5,
      title: 'Client Deposition - Smith Contract Dispute',
      type: 'consultation',
      date: new Date(2026, 1, 8),
      startTime: '10:00 AM',
      endTime: '1:00 PM',
      location: 'Main Conference Room',
      caseNumber: 'CAS-2025-087',
      client: 'Smith LLC',
      attendees: ['Michael Chen', 'Alex Rodriguez', 'Opposing Counsel', 'Court Reporter'],
      status: 'scheduled',
      priority: 'high',
      notes: 'Key witness testimony'
    },
    {
      id: 6,
      title: 'Team Case Review Meeting',
      type: 'meeting',
      date: new Date(2026, 1, 6),
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      location: 'Conference Room B',
      caseNumber: 'CAS-2026-001',
      attendees: ['Sarah Mitchell', 'Alex Rodriguez', 'Paralegal Team'],
      status: 'scheduled',
      priority: 'medium',
      notes: 'Weekly case status update'
    },
    {
      id: 7,
      title: 'Mediation Session - Corporate Dispute',
      type: 'hearing',
      date: new Date(2026, 1, 10),
      startTime: '9:00 AM',
      endTime: '12:00 PM',
      location: 'Mediation Center, Suite 200',
      caseNumber: 'CAS-2026-004',
      client: 'Anderson Corp',
      attendees: ['Sarah Mitchell', 'Mediator', 'Opposing Counsel'],
      status: 'scheduled',
      priority: 'high',
      notes: 'Settlement negotiation attempt'
    },
    {
      id: 8,
      title: 'Bar Association Networking Event',
      type: 'internal',
      date: new Date(2026, 1, 12),
      startTime: '6:00 PM',
      endTime: '9:00 PM',
      location: 'Grand Hotel Ballroom',
      status: 'scheduled',
      priority: 'low',
      notes: 'Annual mixer and CLE opportunity'
    }
  ]);

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    type: 'meeting',
    date: selectedDate,
    startTime: '',
    endTime: '',
    location: '',
    caseNumber: '',
    client: '',
    priority: 'medium',
    status: 'scheduled',
    notes: ''
  });

  const getEventsForDate = (date: Date) => {
    let filtered = filterType === 'all' 
      ? events 
      : events.filter(e => e.type === filterType);

    if (searchQuery) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.caseNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.client?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getWeekEvents = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    return events.filter(event => 
      event.date >= weekStart && event.date <= weekEnd
    );
  };

  console.log('Week Events:', getWeekEvents());

  const handleCreateEvent = () => {
    const event: Event = {
      id: Math.max(...events.map(e => e.id), 0) + 1,
      title: newEvent.title || 'New Event',
      type: newEvent.type || 'meeting',
      date: newEvent.date || selectedDate,
      startTime: newEvent.startTime || '9:00 AM',
      endTime: newEvent.endTime || '10:00 AM',
      location: newEvent.location,
      caseNumber: newEvent.caseNumber,
      client: newEvent.client,
      attendees: [],
      status: 'scheduled',
      priority: newEvent.priority || 'medium',
      notes: newEvent.notes
    };
    setEvents([...events, event]);
    setShowEventDialog(false);
    resetNewEvent();
  };

  const handleUpdateEvent = () => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
      setEditingEvent(null);
      setShowEventDialog(false);
    }
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
      setSelectedEventDetail(null);
    }
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: '',
      type: 'meeting',
      date: selectedDate,
      startTime: '',
      endTime: '',
      location: '',
      caseNumber: '',
      client: '',
      priority: 'medium',
      status: 'scheduled',
      notes: ''
    });
  };

  const todayEvents = getEventsForDate(selectedDate);
  const upcomingEvents = events
    .filter(e => e.date >= new Date() && e.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 6);

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'hearing':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'deadline':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'consultation':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'internal':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getEventTypeBadge = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return 'Meeting';
      case 'hearing':
        return 'Hearing';
      case 'deadline':
        return 'Deadline';
      case 'consultation':
        return 'Consultation';
      case 'internal':
        return 'Internal';
    }
  };

  const eventStats = {
    total: events.filter(e => e.status === 'scheduled').length,
    hearings: events.filter(e => e.type === 'hearing' && e.status === 'scheduled').length,
    deadlines: events.filter(e => e.type === 'deadline' && e.status === 'scheduled').length,
    consultations: events.filter(e => e.type === 'consultation' && e.status === 'scheduled').length,
    meetings: events.filter(e => e.type === 'meeting' && e.status === 'scheduled').length,
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8);
    return (
      <Card>
        <CardHeader>
          <CardTitle>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {hours.map(hour => {
              const hourEvents = todayEvents.filter(e => {
                const eventHour = parseInt(e.startTime.split(':')[0]);
                const isPM = e.startTime.includes('PM');
                const adjustedHour = isPM && eventHour !== 12 ? eventHour + 12 : eventHour;
                return adjustedHour === hour || (hour === 12 && eventHour === 12 && !isPM);
              });

              return (
                <div key={hour} className="flex gap-4 min-h-[60px] border-b border-border pb-2">
                  <div className="w-20 text-sm text-muted-foreground font-medium">
                    {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                  </div>
                  <div className="flex-1 space-y-2">
                    {hourEvents.map(event => (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg border ${getEventTypeColor(event.type)} cursor-pointer hover:shadow-md transition-all`}
                        onClick={() => setSelectedEventDetail(event)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs opacity-70">{event.startTime} - {event.endTime}</p>
                            {event.client && <p className="text-xs opacity-70 mt-1">{event.client}</p>}
                          </div>
                          <Badge variant="default" className="text-xs">
                            {getEventTypeBadge(event.type)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = eachDayOfInterval({ start: weekStart, end: endOfWeek(selectedDate) });

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {format(weekStart, 'MMM d')} - {format(endOfWeek(selectedDate), 'MMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => {
              const dayEvents = getEventsForDate(day);
              const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

              return (
                <div
                  key={day.toString()}
                  className={`border rounded-lg p-3 min-h-[140px] cursor-pointer transition-colors ${
                    isSelected ? 'border-primary bg-primary/5' : 
                    isToday ? 'border-accent bg-accent/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={`text-center mb-2 font-medium ${isToday ? 'text-accent' : 'text-foreground'}`}>
                    <div className="text-xs">{format(day, 'EEE')}</div>
                    <div className="text-lg">{format(day, 'd')}</div>
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1.5 rounded truncate ${getEventTypeColor(event.type)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEventDetail(event);
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground pl-1">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-2">Calendar & Schedule</h1>
          <p className="text-muted-foreground">Manage firm calendar, hearings, and important deadlines</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Button 
            variant="primary" 
            className="gap-2"
            onClick={() => {
              setEditingEvent(null);
              setShowEventDialog(true);
            }}
          >
            <Plus className="w-4 h-4" />
            New Event
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events by title, case number, or client..."
                className="flex-1 bg-transparent border-none outline-none text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Mode & Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'month' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'week' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'day' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Day
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select 
                className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              >
                <option value="all">All Events</option>
                <option value="hearing">Hearings</option>
                <option value="deadline">Deadlines</option>
                <option value="consultation">Consultations</option>
                <option value="meeting">Meetings</option>
                <option value="internal">Internal</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Calendar Section */}
        <div className="xl:col-span-2 space-y-6">
          {viewMode === 'month' && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      {format(selectedDate, 'MMMM yyyy')}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date())}
                    >
                      Today
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CalendarWidget
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Events for Selected Date */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Schedule for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todayEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No events scheduled</h3>
                      <p className="text-muted-foreground mb-4">You have no events for this day</p>
                      <Button 
                        variant="primary" 
                        className="gap-2"
                        onClick={() => setShowEventDialog(true)}
                      >
                        <Plus className="w-4 h-4" />
                        Add Event
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`p-5 rounded-lg border ${getEventTypeColor(event.type)} transition-all hover:shadow-md cursor-pointer`}
                          onClick={() => setSelectedEventDetail(event)}
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="font-semibold text-base">{event.title}</h3>
                                <Badge variant="default" className="text-xs">
                                  {getEventTypeBadge(event.type)}
                                </Badge>
                                {event.priority === 'high' && (
                                  <Badge variant="error" className="text-xs">High Priority</Badge>
                                )}
                              </div>
                              {event.caseNumber && (
                                <p className="text-sm opacity-80 mb-1">{event.caseNumber}</p>
                              )}
                              {event.client && (
                                <p className="text-sm opacity-80">Client: {event.client}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingEvent(event);
                                  setShowEventDialog(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteEvent(event.id);
                                }}
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 opacity-70 flex-shrink-0" />
                              <span>{event.startTime} - {event.endTime}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2">
                                {event.isVirtual ? (
                                  <>
                                    <Video className="w-4 h-4 opacity-70 flex-shrink-0" />
                                    <span>Virtual Meeting</span>
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="w-4 h-4 opacity-70 flex-shrink-0" />
                                    <span>{event.location}</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {event.attendees && event.attendees.length > 0 && (
                            <div className="flex items-start gap-2 text-sm mb-3">
                              <User className="w-4 h-4 opacity-70 flex-shrink-0 mt-0.5" />
                              <span className="flex-1">{event.attendees.join(', ')}</span>
                            </div>
                          )}

                          {event.notes && (
                            <div className="pt-3 border-t border-current/10">
                              <p className="text-sm opacity-80 italic">{event.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Calendar Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-semibold text-foreground">{eventStats.total}</p>
                <p className="text-sm text-muted-foreground">Scheduled Events</p>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-lg font-medium text-foreground">{eventStats.hearings}</p>
                    <p className="text-xs text-muted-foreground">Hearings</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">{eventStats.deadlines}</p>
                    <p className="text-xs text-muted-foreground">Deadlines</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">{eventStats.consultations}</p>
                    <p className="text-xs text-muted-foreground">Consultations</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">{eventStats.meetings}</p>
                    <p className="text-xs text-muted-foreground">Meetings</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedEventDetail(event)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        event.priority === 'high' ? 'bg-destructive' :
                        event.priority === 'medium' ? 'bg-warning' : 'bg-muted-foreground'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground mb-1 truncate">{event.title}</h4>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {format(event.date, 'EEE, MMM d')} at {event.startTime}
                          </p>
                          {event.caseNumber && (
                            <p className="text-xs text-muted-foreground">{event.caseNumber}</p>
                          )}
                          {event.client && (
                            <p className="text-xs text-muted-foreground">{event.client}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Type Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/30" />
                <span className="text-foreground">Court Hearings</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-warning/20 border border-warning/30" />
                <span className="text-foreground">Filing Deadlines</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-accent/20 border border-accent/30" />
                <span className="text-foreground">Client Consultations</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" />
                <span className="text-foreground">Team Meetings</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-success/20 border border-success/30" />
                <span className="text-foreground">Internal Events</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Creation/Edit Dialog */}
      {showEventDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowEventDialog(false);
                    setEditingEvent(null);
                    resetNewEvent();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Event Title *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter event title"
                  value={editingEvent ? editingEvent.title : newEvent.title}
                  onChange={(e) => editingEvent 
                    ? setEditingEvent({...editingEvent, title: e.target.value})
                    : setNewEvent({...newEvent, title: e.target.value})
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Event Type</label>
                  <select
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={editingEvent ? editingEvent.type : newEvent.type}
                    onChange={(e) => editingEvent
                      ? setEditingEvent({...editingEvent, type: e.target.value as Event['type']})
                      : setNewEvent({...newEvent, type: e.target.value as Event['type']})
                    }
                  >
                    <option value="meeting">Meeting</option>
                    <option value="hearing">Hearing</option>
                    <option value="deadline">Deadline</option>
                    <option value="consultation">Consultation</option>
                    <option value="internal">Internal</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Priority</label>
                  <select
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={editingEvent ? editingEvent.priority : newEvent.priority}
                    onChange={(e) => editingEvent
                      ? setEditingEvent({...editingEvent, priority: e.target.value as Event['priority']})
                      : setNewEvent({...newEvent, priority: e.target.value as Event['priority']})
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Start Time</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="9:00 AM"
                    value={editingEvent ? editingEvent.startTime : newEvent.startTime}
                    onChange={(e) => editingEvent
                      ? setEditingEvent({...editingEvent, startTime: e.target.value})
                      : setNewEvent({...newEvent, startTime: e.target.value})
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">End Time</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="10:00 AM"
                    value={editingEvent ? editingEvent.endTime : newEvent.endTime}
                    onChange={(e) => editingEvent
                      ? setEditingEvent({...editingEvent, endTime: e.target.value})
                      : setNewEvent({...newEvent, endTime: e.target.value})
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Conference Room A or Virtual"
                  value={editingEvent ? editingEvent.location : newEvent.location}
                  onChange={(e) => editingEvent
                    ? setEditingEvent({...editingEvent, location: e.target.value})
                    : setNewEvent({...newEvent, location: e.target.value})
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Case Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="CAS-2026-001"
                    value={editingEvent ? editingEvent.caseNumber : newEvent.caseNumber}
                    onChange={(e) => editingEvent
                      ? setEditingEvent({...editingEvent, caseNumber: e.target.value})
                      : setNewEvent({...newEvent, caseNumber: e.target.value})
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Client Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Client name"
                    value={editingEvent ? editingEvent.client : newEvent.client}
                    onChange={(e) => editingEvent
                      ? setEditingEvent({...editingEvent, client: e.target.value})
                      : setNewEvent({...newEvent, client: e.target.value})
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
                <textarea
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                  placeholder="Add any additional notes..."
                  value={editingEvent ? editingEvent.notes : newEvent.notes}
                  onChange={(e) => editingEvent
                    ? setEditingEvent({...editingEvent, notes: e.target.value})
                    : setNewEvent({...newEvent, notes: e.target.value})
                  }
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEventDialog(false);
                    setEditingEvent(null);
                    resetNewEvent();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Event Detail Dialog */}
      {selectedEventDetail && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Event Details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedEventDetail(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{selectedEventDetail.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="default">{getEventTypeBadge(selectedEventDetail.type)}</Badge>
                  {selectedEventDetail.priority === 'high' && (
                    <Badge variant="error">High Priority</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{format(selectedEventDetail.date, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedEventDetail.startTime} - {selectedEventDetail.endTime}</span>
                </div>
                {selectedEventDetail.location && (
                  <div className="flex items-center gap-2">
                    {selectedEventDetail.isVirtual ? (
                      <>
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">Virtual Meeting</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedEventDetail.location}</span>
                      </>
                    )}
                  </div>
                )}
                {selectedEventDetail.caseNumber && (
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedEventDetail.caseNumber}</span>
                  </div>
                )}
                {selectedEventDetail.client && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedEventDetail.client}</span>
                  </div>
                )}
                {selectedEventDetail.attendees && selectedEventDetail.attendees.length > 0 && (
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs mb-1">Attendees:</p>
                      <p className="text-foreground">{selectedEventDetail.attendees.join(', ')}</p>
                    </div>
                  </div>
                )}
                {selectedEventDetail.notes && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-muted-foreground text-xs mb-1">Notes:</p>
                    <p className="text-foreground">{selectedEventDetail.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button 
                  variant="primary" 
                  className="flex-1 gap-2"
                  onClick={() => {
                    setEditingEvent(selectedEventDetail);
                    setSelectedEventDetail(null);
                    setShowEventDialog(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Edit Event
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleDeleteEvent(selectedEventDetail.id);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
