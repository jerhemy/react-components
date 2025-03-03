import './SchedulerDemo.css';

import React, { useCallback, useEffect, useState } from 'react';
import Scheduler, { Event, Resource, ViewType } from './Scheduler';
import Modal from './Modal';

// Generate a random ID
const generateId = (): string => {
    return Math.random().toString(36).substring(2, 11);
};

// Generate random color
const getRandomColor = (): string => {
    const colors = [
        '#3174ad', // Blue
        '#4caf50', // Green
        '#f44336', // Red
        '#ff9800', // Orange
        '#9c27b0', // Purple
        '#009688', // Teal
        '#795548', // Brown
        '#607d8b', // Blue Grey
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

// Generate random events
const generateEvents = (count: number, resources: Resource[]): Event[] => {
    const events: Event[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    for (let i = 0; i < count; i++) {
        // Random date within +/- 15 days from today
        const startDay = currentDate + Math.floor(Math.random() * 30) - 15;
        const startDate = new Date(currentYear, currentMonth, startDay);

        // Random start time between 8am and 5pm
        startDate.setHours(8 + Math.floor(Math.random() * 9));
        startDate.setMinutes(Math.floor(Math.random() * 4) * 15);

        // Random duration between 30 minutes and 3 hours
        const durationMinutes = (Math.floor(Math.random() * 6) + 1) * 30;
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

        // 20% chance of all-day event
        const isAllDay = Math.random() < 0.2;

        // Random resource
        const resource = resources[Math.floor(Math.random() * resources.length)].id;

        // Random event type
        const eventTypes = ['Meeting', 'Call', 'Appointment', 'Task', 'Reminder', 'Deadline'];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

        // Random location
        const locations = ['Office', 'Conference Room', 'Client Site', 'Home', 'Coffee Shop', 'Online'];
        const location = Math.random() < 0.7 ? locations[Math.floor(Math.random() * locations.length)] : undefined;

        // Create event
        events.push({
            id: generateId(),
            title: `${eventType} ${i + 1}`,
            start: isAllDay ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) : startDate,
            end: isAllDay ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) : endDate,
            allDay: isAllDay,
            color: getRandomColor(),
            description: Math.random() < 0.5 ? `Description for ${eventType} ${i + 1}` : undefined,
            location,
            resource,
        });
    }

    return events;
};

// Sample resources
const sampleResources: Resource[] = [
    { id: 'resource1', name: 'John Doe', color: '#3174ad' },
    { id: 'resource2', name: 'Jane Smith', color: '#4caf50' },
    { id: 'resource3', name: 'Bob Johnson', color: '#f44336' },
    { id: 'resource4', name: 'Alice Brown', color: '#ff9800' },
];

const SchedulerDemo: React.FC = () => {
    // State
    const [view, setView] = useState<ViewType>('week');
    const [date, setDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [resources, setResources] = useState<Resource[]>(sampleResources);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showWeekends, setShowWeekends] = useState(true);
    const [showAllDay, setShowAllDay] = useState(true);
    const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('18:00');
    const [firstDay, setFirstDay] = useState(0); // 0 = Sunday, 1 = Monday
    const [timeDisplayInterval, setTimeDisplayInterval] = useState(60); // Default to 60 minutes (1 hour)
    const [timeslotInterval, setTimeslotInterval] = useState(30); // Default to 30 minutes

    // Generate initial events
    useEffect(() => {
        setEvents(generateEvents(50, resources));
    }, []);

    // Handle event click
    const handleEventClick = useCallback((event: Event) => {
        setSelectedEvent(event);
        setShowEventModal(true);
    }, []);

    // Handle event creation
    const handleEventCreate = useCallback((event: Event) => {
        setEvents(prevEvents => [...prevEvents, event]);
    }, []);

    // Handle event update
    const handleEventUpdate = useCallback((updatedEvent: Event) => {
        setEvents(prevEvents =>
            prevEvents.map(event =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
    }, []);

    // Handle event deletion
    const handleEventDelete = useCallback((eventToDelete: Event) => {
        setEvents(prevEvents =>
            prevEvents.filter(event => event.id !== eventToDelete.id)
        );
    }, []);

    // Handle view change
    const handleViewChange = useCallback((newView: ViewType) => {
        setView(newView);
    }, []);

    // Handle date change
    const handleDateChange = useCallback((newDate: Date) => {
        setDate(newDate);
    }, []);

    // Handle theme change
    const handleThemeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value as 'light' | 'dark' | 'auto');
    }, []);

    // Handle first day change
    const handleFirstDayChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFirstDay(parseInt(e.target.value));
    }, []);

    // Handle start time change
    const handleStartTimeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setStartTime(e.target.value);
    }, []);

    // Handle end time change
    const handleEndTimeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setEndTime(e.target.value);
    }, []);

    // Handle show weekends toggle
    const handleShowWeekendsToggle = useCallback(() => {
        setShowWeekends(prev => !prev);
    }, []);

    // Handle show all-day toggle
    const handleShowAllDayToggle = useCallback(() => {
        setShowAllDay(prev => !prev);
    }, []);

    // Handle time display interval change
    const handleTimeDisplayIntervalChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeDisplayInterval(parseInt(e.target.value));
    }, []);

    // Handle timeslot interval change
    const handleTimeslotIntervalChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeslotInterval(parseInt(e.target.value));
    }, []);

    // Handle event modal close
    const handleCloseEventModal = useCallback(() => {
        setShowEventModal(false);
        setSelectedEvent(null);
    }, []);

    // Handle event deletion from modal
    const handleDeleteFromModal = useCallback(() => {
        if (selectedEvent) {
            handleEventDelete(selectedEvent);
            handleCloseEventModal();
        }
    }, [selectedEvent, handleEventDelete, handleCloseEventModal]);

    // Generate time options for dropdowns
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                options.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    return (
        <div className="scheduler-demo">
            <h2>Scheduler Component</h2>

            <div className="scheduler-demo-controls">
                <div className="scheduler-demo-control-group">
                    <label htmlFor="theme-select">Theme:</label>
                    <select
                        id="theme-select"
                        value={theme}
                        onChange={handleThemeChange}
                        className="scheduler-demo-select"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                    </select>
                </div>

                <div className="scheduler-demo-control-group">
                    <label htmlFor="first-day-select">First Day:</label>
                    <select
                        id="first-day-select"
                        value={firstDay}
                        onChange={handleFirstDayChange}
                        className="scheduler-demo-select"
                    >
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                    </select>
                </div>

                <div className="scheduler-demo-control-group">
                    <label htmlFor="start-time-select">Start Time:</label>
                    <select
                        id="start-time-select"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        className="scheduler-demo-select"
                    >
                        {timeOptions.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

                <div className="scheduler-demo-control-group">
                    <label htmlFor="end-time-select">End Time:</label>
                    <select
                        id="end-time-select"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        className="scheduler-demo-select"
                    >
                        {timeOptions.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

                <div className="scheduler-demo-control-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={showWeekends}
                            onChange={handleShowWeekendsToggle}
                        />
                        Show Weekends
                    </label>
                </div>

                <div className="scheduler-demo-control-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={showAllDay}
                            onChange={handleShowAllDayToggle}
                        />
                        Show All-Day Events
                    </label>
                </div>

                <div className="scheduler-demo-control-group">
                    <label htmlFor="time-display-interval-select">Time Labels:</label>
                    <select
                        id="time-display-interval-select"
                        value={timeDisplayInterval}
                        onChange={handleTimeDisplayIntervalChange}
                        className="scheduler-demo-select"
                    >
                        <option value="1">Every 1 min</option>
                        <option value="5">Every 5 min</option>
                        <option value="10">Every 10 min</option>
                        <option value="15">Every 15 min</option>
                        <option value="30">Every 30 min</option>
                        <option value="60">Every hour</option>
                        <option value="120">Every 2 hours</option>
                    </select>
                </div>
                
                <div className="scheduler-demo-control-group">
                    <label htmlFor="timeslot-interval-select">Time Slots:</label>
                    <select
                        id="timeslot-interval-select"
                        value={timeslotInterval}
                        onChange={handleTimeslotIntervalChange}
                        className="scheduler-demo-select"
                    >
                        <option value="1">1 min</option>
                        <option value="5">5 min</option>
                        <option value="10">10 min</option>
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="60">60 min</option>
                    </select>
                </div>
            </div>

            <div className="scheduler-container">
                <Scheduler
                    events={events}
                    resources={resources}
                    view={view}
                    date={date}
                    firstDay={firstDay}
                    startTime={startTime}
                    endTime={endTime}
                    showAllDay={showAllDay}
                    showWeekends={showWeekends}
                    timeDisplayInterval={timeDisplayInterval}
                    timeslotInterval={timeslotInterval}
                    onEventClick={handleEventClick}
                    onEventCreate={handleEventCreate}
                    onEventUpdate={handleEventUpdate}
                    onEventDelete={handleEventDelete}
                    onViewChange={handleViewChange}
                    onDateChange={handleDateChange}
                    dragToCreate={true}
                    dragToMove={true}
                    dragToResize={true}
                    theme={theme}
                    height="600px"
                />
            </div>

            {/* Event Modal */}
            {showEventModal && selectedEvent && (
                <Modal
                    isOpen={showEventModal}
                    onClose={handleCloseEventModal}
                    title={selectedEvent.title}
                    headerColor={selectedEvent.color || '#3174ad'}
                    footer={
                        <>
                            <button
                                className="modal-btn modal-danger-btn"
                                onClick={handleDeleteFromModal}
                            >
                                Delete
                            </button>
                            <button
                                className="modal-btn modal-secondary-btn"
                                onClick={handleCloseEventModal}
                            >
                                Close
                            </button>
                        </>
                    }
                >
                    <div className="event-modal-body">
                        <div className="event-modal-field">
                            <span className="event-modal-label">Date:</span>
                            <span className="event-modal-value">
                                {selectedEvent.allDay
                                    ? new Date(selectedEvent.start).toLocaleDateString()
                                    : `${new Date(selectedEvent.start).toLocaleDateString()}`
                                }
                            </span>
                        </div>

                        <div className="event-modal-field">
                            <span className="event-modal-label">Time:</span>
                            <span className="event-modal-value">
                                {selectedEvent.allDay
                                    ? 'All Day'
                                    : `${new Date(selectedEvent.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                           ${new Date(selectedEvent.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                                }
                            </span>
                        </div>

                        {selectedEvent.location && (
                            <div className="event-modal-field">
                                <span className="event-modal-label">Location:</span>
                                <span className="event-modal-value">{selectedEvent.location}</span>
                            </div>
                        )}

                        {selectedEvent.resource && (
                            <div className="event-modal-field">
                                <span className="event-modal-label">Resource:</span>
                                <span className="event-modal-value">
                                    {resources.find(r => r.id === selectedEvent.resource)?.name || selectedEvent.resource}
                                </span>
                            </div>
                        )}

                        {selectedEvent.description && (
                            <div className="event-modal-field">
                                <span className="event-modal-label">Description:</span>
                                <span className="event-modal-value">{selectedEvent.description}</span>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            <div className="scheduler-demo-info">
                <h3>Features</h3>
                <ul>
                    <li>Multiple views: Day, Week, Month, and Agenda</li>
                    <li>Customizable time range and first day of week</li>
                    <li>Adjustable time label display intervals (1 min to 2 hours)</li>
                    <li>Flexible time slot granularity (1 min to 60 min)</li>
                    <li>Dynamic timeline that adjusts based on interval settings</li>
                    <li>Support for all-day events</li>
                    <li>Event details modal</li>
                    <li>Light and dark themes</li>
                    <li>Resource support</li>
                    <li>Responsive design</li>
                </ul>

                <h3>Usage</h3>
                <p>
                    The Scheduler component provides a flexible and customizable calendar interface for displaying and managing events.
                    It supports various views, resource allocation, and event management features.
                </p>

                <h3>Implementation</h3>
                <p>
                    This component is built with React and TypeScript, using CSS for styling. It implements efficient rendering
                    techniques to handle large numbers of events and provides a responsive design that works on both desktop and mobile devices.
                    The timeline automatically adjusts its scale based on the selected time intervals, allowing for both high-level overviews
                    and detailed minute-by-minute scheduling.
                </p>
            </div>
        </div>
    );
};

export default SchedulerDemo; 