import './Scheduler.css';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Types
export type ViewType = 'day' | 'week' | 'month' | 'agenda';

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  description?: string;
  location?: string;
  resource?: string | string[];
  recurrence?: RecurrenceRule;
  status?: 'busy' | 'free' | 'tentative' | 'away';
}

export interface Resource {
  id: string;
  name: string;
  color?: string;
  image?: string;
  group?: string;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval?: number;
  count?: number;
  until?: Date;
  byDay?: string[];
  byMonth?: number[];
  byMonthDay?: number[];
  excludeDates?: Date[];
}

export interface SchedulerProps {
  events: Event[];
  resources?: Resource[];
  view?: ViewType;
  date?: Date;
  firstDay?: number; // 0 = Sunday, 1 = Monday, etc.
  startTime?: string; // Format: "HH:mm"
  endTime?: string; // Format: "HH:mm"
  timeslotInterval?: number; // In minutes
  showAllDay?: boolean;
  showWeekends?: boolean;
  showHeader?: boolean;
  showToolbar?: boolean;
  height?: string | number;
  onEventClick?: (event: Event) => void;
  onEventCreate?: (event: Event) => void;
  onEventUpdate?: (event: Event) => void;
  onEventDelete?: (event: Event) => void;
  onViewChange?: (view: ViewType) => void;
  onDateChange?: (date: Date) => void;
  dragToCreate?: boolean;
  dragToMove?: boolean;
  dragToResize?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

// Helper functions
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const getDayName = (date: Date, short = false): string => {
  return date.toLocaleDateString([], {
    weekday: short ? 'short' : 'long'
  });
};

const getMonthName = (date: Date): string => {
  return date.toLocaleDateString([], { month: 'long' });
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getTimeSlots = (startTime: string, endTime: string, interval: number): string[] => {
  const slots: string[] = [];
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  for (let minutes = start; minutes < end; minutes += interval) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  }

  return slots;
};

// Function to calculate event overlaps and positions
const calculateEventPositions = (events: Event[]): { event: Event; width: number; left: number }[] => {
  if (events.length === 0) return [];

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => {
    const aStart = new Date(a.start).getTime();
    const bStart = new Date(b.start).getTime();
    return aStart - bStart;
  });

  // Create groups of overlapping events
  const groups: Event[][] = [];
  let currentGroup: Event[] = [sortedEvents[0]];

  for (let i = 1; i < sortedEvents.length; i++) {
    const event = sortedEvents[i];
    const eventStart = new Date(event.start).getTime();
    const eventEnd = new Date(event.end).getTime();

    // Check if this event overlaps with any event in the current group
    let overlaps = false;
    for (const groupEvent of currentGroup) {
      const groupEventStart = new Date(groupEvent.start).getTime();
      const groupEventEnd = new Date(groupEvent.end).getTime();

      if (
        (eventStart >= groupEventStart && eventStart < groupEventEnd) ||
        (eventEnd > groupEventStart && eventEnd <= groupEventEnd) ||
        (eventStart <= groupEventStart && eventEnd >= groupEventEnd)
      ) {
        overlaps = true;
        break;
      }
    }

    if (overlaps) {
      currentGroup.push(event);
    } else {
      groups.push(currentGroup);
      currentGroup = [event];
    }
  }

  // Add the last group
  groups.push(currentGroup);

  // Calculate positions for each event
  const eventPositions: { event: Event; width: number; left: number }[] = [];

  groups.forEach(group => {
    const groupSize = group.length;

    group.forEach((event, index) => {
      // Each event gets an equal portion of the column width
      const width = 100 / groupSize;
      const left = width * index;

      eventPositions.push({
        event,
        width,
        left
      });
    });
  });

  return eventPositions;
};

// Main component
const Scheduler: React.FC<SchedulerProps> = ({
  events = [],
  resources = [],
  view = 'week',
  date = new Date(),
  firstDay = 0,
  startTime = '08:00',
  endTime = '18:00',
  timeslotInterval = 30,
  showAllDay = true,
  showWeekends = true,
  showHeader = true,
  showToolbar = true,
  height = '600px',
  onEventClick,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  onViewChange,
  onDateChange,
  dragToCreate = true,
  dragToMove = true,
  dragToResize = true,
  theme = 'light',
}) => {
  // State
  const [currentView, setCurrentView] = useState<ViewType>(view);
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const [resizedEvent, setResizedEvent] = useState<Event | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Update state when props change
  useEffect(() => {
    setCurrentView(view);
  }, [view]);

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  // Calculate visible days based on current view and date
  const visibleDays = useMemo(() => {
    const days: Date[] = [];
    let startDate: Date;
    let daysToShow: number;

    switch (currentView) {
      case 'day':
        return [new Date(currentDate)];
      case 'week':
        // Calculate the first day of the week
        startDate = new Date(currentDate);
        const dayOfWeek = startDate.getDay();
        const diff = dayOfWeek - firstDay;
        startDate.setDate(startDate.getDate() - diff);
        daysToShow = showWeekends ? 7 : 5;

        for (let i = 0; i < daysToShow; i++) {
          if (!showWeekends && (i + firstDay) % 7 === 0 || (i + firstDay) % 7 === 6) {
            continue;
          }
          days.push(addDays(startDate, i));
        }
        return days;
      case 'month':
        // Get the first day of the month
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDayOfMonth = startDate.getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        // Add days from previous month to align with first day of week
        const daysFromPrevMonth = (firstDayOfMonth - firstDay + 7) % 7;
        for (let i = 0; i < daysFromPrevMonth; i++) {
          days.push(addDays(startDate, -daysFromPrevMonth + i));
        }

        // Add days of current month
        for (let i = 0; i < daysInMonth; i++) {
          days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1));
        }

        // Add days from next month to complete the grid (6 rows of 7 days)
        const remainingDays = 42 - days.length;
        for (let i = 0; i < remainingDays; i++) {
          days.push(addDays(new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth), i + 1));
        }
        return days;
      case 'agenda':
        // Show 14 days for agenda view
        startDate = new Date(currentDate);
        for (let i = 0; i < 14; i++) {
          days.push(addDays(startDate, i));
        }
        return days;
      default:
        return [new Date(currentDate)];
    }
  }, [currentView, currentDate, firstDay, showWeekends]);

  // Get time slots for day and week views
  const timeSlots = useMemo(() => {
    return getTimeSlots(startTime, endTime, timeslotInterval);
  }, [startTime, endTime, timeslotInterval]);

  // Filter events for visible days
  const visibleEvents = useMemo(() => {
    return events.filter(event => {
      // For day and week views, show events that overlap with visible days
      if (currentView === 'day' || currentView === 'week') {
        return visibleDays.some(day => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          return (
            (isSameDay(eventStart, day) || isSameDay(eventEnd, day)) ||
            (eventStart < day && eventEnd > day)
          );
        });
      }

      // For month view, show all events in the visible days
      if (currentView === 'month') {
        return visibleDays.some(day => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          return (
            isSameDay(eventStart, day) ||
            isSameDay(eventEnd, day) ||
            (eventStart < day && eventEnd > day)
          );
        });
      }

      // For agenda view, show all events in the date range
      if (currentView === 'agenda') {
        const rangeStart = visibleDays[0];
        const rangeEnd = visibleDays[visibleDays.length - 1];
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        return (
          (eventStart >= rangeStart && eventStart <= rangeEnd) ||
          (eventEnd >= rangeStart && eventEnd <= rangeEnd) ||
          (eventStart <= rangeStart && eventEnd >= rangeEnd)
        );
      }

      return false;
    });
  }, [events, visibleDays, currentView]);

  // Handle view change
  const handleViewChange = (newView: ViewType) => {
    setCurrentView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  };

  // Handle date navigation
  const handleDateChange = (amount: number) => {
    const newDate = new Date(currentDate);

    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() + amount);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + amount * 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + amount);
        break;
      case 'agenda':
        newDate.setDate(newDate.getDate() + amount * 14);
        break;
    }

    setCurrentDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  // Handle event click
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  // Handle drag start
  const handleDragStart = (event: Event, e: React.MouseEvent) => {
    if (!dragToMove) return;

    // Calculate offset from the top-left corner of the event element
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setDraggedEvent(event);
    setIsDragging(true);

    // Add event listeners to handle drag and drop
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    // Prevent default browser behavior
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drag move
  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !draggedEvent) return;

    // Update cursor to indicate dragging
    document.body.style.cursor = 'grabbing';

    // Prevent default browser behavior
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drag end
  const handleDragEnd = (e: MouseEvent) => {
    // Clean up event listeners first to prevent multiple calls
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.body.style.cursor = '';

    if (!isDragging || !draggedEvent) {
      setIsDragging(false);
      setDraggedEvent(null);
      return;
    }

    // Get the element under the cursor
    const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);

    if (currentView === 'month') {
      // For month view, find the month cell
      const monthCell = elementsUnderCursor.find(el =>
        el.classList.contains('scheduler-month-cell')
      ) as HTMLElement;

      if (monthCell) {
        // Find the date associated with this cell
        const dateIndex = Array.from(monthCell.parentElement?.parentElement?.querySelectorAll('.scheduler-month-cell') || [])
          .indexOf(monthCell);

        if (dateIndex >= 0 && dateIndex < visibleDays.length) {
          const newDate = new Date(visibleDays[dateIndex]);

          // Keep the same time, just change the date
          const originalStart = new Date(draggedEvent.start);
          const originalEnd = new Date(draggedEvent.end);

          // Calculate duration
          const durationMs = originalEnd.getTime() - originalStart.getTime();

          // Create new start date with same time
          const newStart = new Date(newDate);
          newStart.setHours(
            originalStart.getHours(),
            originalStart.getMinutes(),
            originalStart.getSeconds()
          );

          // Create new end date
          const newEnd = new Date(newStart.getTime() + durationMs);

          // Create updated event
          const updatedEvent: Event = {
            ...draggedEvent,
            start: newStart,
            end: newEnd
          };

          // Call the onEventUpdate callback
          if (onEventUpdate) {
            onEventUpdate(updatedEvent);
          }
        }
      }
    } else if (currentView === 'agenda') {
      // For agenda view, find the agenda day
      const agendaDay = elementsUnderCursor.find(el =>
        el.classList.contains('scheduler-agenda-day')
      ) as HTMLElement;

      if (agendaDay) {
        // Find the date associated with this day
        const dateStr = agendaDay.getAttribute('data-date');
        if (dateStr) {
          const newDate = new Date(dateStr);

          // Keep the same time, just change the date
          const originalStart = new Date(draggedEvent.start);
          const originalEnd = new Date(draggedEvent.end);

          // Calculate duration
          const durationMs = originalEnd.getTime() - originalStart.getTime();

          // Create new start date with same time
          const newStart = new Date(newDate);
          newStart.setHours(
            originalStart.getHours(),
            originalStart.getMinutes(),
            originalStart.getSeconds()
          );

          // Create new end date
          const newEnd = new Date(newStart.getTime() + durationMs);

          // Create updated event
          const updatedEvent: Event = {
            ...draggedEvent,
            start: newStart,
            end: newEnd
          };

          // Call the onEventUpdate callback
          if (onEventUpdate) {
            onEventUpdate(updatedEvent);
          }
        }
      }
    } else {
      // For day and week views, find the time cell
      const timeCell = elementsUnderCursor.find(el =>
        el.classList.contains('scheduler-time-cell') ||
        el.classList.contains('scheduler-day-column')
      ) as HTMLElement;

      if (timeCell) {
        // Calculate new time based on drop position
        const rect = timeCell.getBoundingClientRect();
        const dayColumn = timeCell.closest('.scheduler-day-column') as HTMLElement;

        if (dayColumn) {
          // Get the day index from the column
          const dayColumns = Array.from(dayColumn.parentElement?.children || []);
          const dayIndex = dayColumns.indexOf(dayColumn);

          // Calculate new time
          const [startHour, startMinute] = startTime.split(':').map(Number);
          const startTimeMinutes = startHour * 60 + startMinute;

          // Calculate minutes from top of the grid
          const relativeY = e.clientY - rect.top - dragOffset.y;
          const cellHeight = 30; // Height of a time slot in pixels
          const minutesPerPixel = timeslotInterval / cellHeight;
          const minutesFromTop = Math.floor(relativeY * minutesPerPixel);

          // Create new start and end times
          const newStartMinutes = startTimeMinutes + Math.max(0, minutesFromTop);
          const newStartHour = Math.floor(newStartMinutes / 60);
          const newStartMinute = newStartMinutes % 60;

          // Calculate duration of the original event
          const originalStart = new Date(draggedEvent.start);
          const originalEnd = new Date(draggedEvent.end);
          const durationMinutes =
            (originalEnd.getHours() * 60 + originalEnd.getMinutes()) -
            (originalStart.getHours() * 60 + originalStart.getMinutes());

          // Create new start date
          let newStart: Date;

          if (currentView === 'day') {
            // In day view, we only change the time, not the date
            newStart = new Date(currentDate);
            newStart.setHours(newStartHour, newStartMinute);
          } else if (currentView === 'week') {
            // In week view, we change both the day and time
            newStart = new Date(visibleDays[dayIndex]);
            newStart.setHours(newStartHour, newStartMinute);
          } else {
            // For other views, just use the original date with new time
            newStart = new Date(draggedEvent.start);
            newStart.setHours(newStartHour, newStartMinute);
          }

          // Create new end date
          const newEnd = new Date(newStart);
          newEnd.setMinutes(newEnd.getMinutes() + durationMinutes);

          // Create updated event
          const updatedEvent: Event = {
            ...draggedEvent,
            start: newStart,
            end: newEnd
          };

          // Call the onEventUpdate callback
          if (onEventUpdate) {
            onEventUpdate(updatedEvent);
          }
        }
      }
    }

    // Clean up event listeners
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.body.style.cursor = '';
    setIsDragging(false);
    setDraggedEvent(null);

    // Prevent default browser behavior
    e.preventDefault();
  };

  // Handle resize start
  const handleResizeStart = (event: Event, e: React.MouseEvent) => {
    if (!dragToResize) return;

    // Prevent the event from triggering drag start
    e.stopPropagation();

    setResizedEvent(event);
    setIsResizing(true);

    // Add event listeners to handle resize
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);

    // Prevent default browser behavior
    e.preventDefault();
  };

  // Handle resize move
  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !resizedEvent) return;

    // Update cursor to indicate resizing
    document.body.style.cursor = 's-resize';

    // Prevent default browser behavior
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle resize end
  const handleResizeEnd = (e: MouseEvent) => {
    // Clean up event listeners first to prevent multiple calls
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = '';

    if (!isResizing || !resizedEvent) {
      setIsResizing(false);
      setResizedEvent(null);
      return;
    }

    // Get the element under the cursor
    const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);

    if (currentView === 'day' || currentView === 'week') {
      // For day and week views, find the time cell
      const timeCell = elementsUnderCursor.find(el =>
        el.classList.contains('scheduler-time-cell')
      ) as HTMLElement;

      if (timeCell) {
        // Calculate new end time based on resize position
        const rect = timeCell.getBoundingClientRect();

        // Calculate new time
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const startTimeMinutes = startHour * 60 + startMinute;

        // Calculate minutes from top of the grid
        const cellsFromTop = Array.from(timeCell.parentElement?.children || [])
          .filter(el => el.classList.contains('scheduler-time-cell'))
          .indexOf(timeCell);

        // Calculate new end time
        const newEndMinutes = startTimeMinutes + (cellsFromTop + 1) * timeslotInterval;
        const newEndHour = Math.floor(newEndMinutes / 60);
        const newEndMinute = newEndMinutes % 60;

        // Create new end date
        const newEnd = new Date(resizedEvent.start);
        newEnd.setHours(newEndHour, newEndMinute);

        // Ensure the end time is after the start time
        if (newEnd <= new Date(resizedEvent.start)) {
          newEnd.setMinutes(newEnd.getMinutes() + timeslotInterval);
        }

        // Create updated event
        const updatedEvent: Event = {
          ...resizedEvent,
          end: newEnd
        };

        // Call the onEventUpdate callback
        if (onEventUpdate) {
          onEventUpdate(updatedEvent);
        }
      }
    }

    // Clean up event listeners
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = '';
    setIsResizing(false);
    setResizedEvent(null);

    // Prevent default browser behavior
    e.preventDefault();
  };

  // Render toolbar
  const renderToolbar = () => {
    if (!showToolbar) return null;

    return (
      <div className="scheduler-toolbar">
        <div className="scheduler-toolbar-nav">
          <button onClick={() => handleDateChange(-1)} className="scheduler-btn">
            &lt;
          </button>
          <button onClick={() => handleDateChange(1)} className="scheduler-btn">
            &gt;
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="scheduler-btn scheduler-today-btn">
            Today
          </button>
        </div>

        <div className="scheduler-toolbar-title">
          {currentView === 'day' && (
            <span>{formatDate(currentDate)} ({getDayName(currentDate)})</span>
          )}
          {currentView === 'week' && (
            <span>
              {formatDate(visibleDays[0])} - {formatDate(visibleDays[visibleDays.length - 1])}, {getMonthName(currentDate)} {currentDate.getFullYear()}
            </span>
          )}
          {currentView === 'month' && (
            <span>{getMonthName(currentDate)} {currentDate.getFullYear()}</span>
          )}
          {currentView === 'agenda' && (
            <span>
              {formatDate(visibleDays[0])} - {formatDate(visibleDays[visibleDays.length - 1])}, {getMonthName(currentDate)} {currentDate.getFullYear()}
            </span>
          )}
        </div>

        <div className="scheduler-toolbar-views">
          <button
            onClick={() => handleViewChange('day')}
            className={`scheduler-btn ${currentView === 'day' ? 'scheduler-btn-active' : ''}`}
          >
            Day
          </button>
          <button
            onClick={() => handleViewChange('week')}
            className={`scheduler-btn ${currentView === 'week' ? 'scheduler-btn-active' : ''}`}
          >
            Week
          </button>
          <button
            onClick={() => handleViewChange('month')}
            className={`scheduler-btn ${currentView === 'month' ? 'scheduler-btn-active' : ''}`}
          >
            Month
          </button>
          <button
            onClick={() => handleViewChange('agenda')}
            className={`scheduler-btn ${currentView === 'agenda' ? 'scheduler-btn-active' : ''}`}
          >
            Agenda
          </button>
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    // Get all-day events
    const allDayEvents = visibleEvents.filter(
      event => {
        // Check if it's explicitly marked as all-day
        if (event.allDay) return isSameDay(new Date(event.start), currentDate);

        // Check if it spans multiple days (implicit all-day)
        const start = new Date(event.start);
        const end = new Date(event.end);
        if (!isSameDay(start, end)) {
          return isSameDay(start, currentDate) ||
            isSameDay(end, currentDate) ||
            (start < currentDate && end > currentDate);
        }

        return false;
      }
    );

    // Get time events
    const timeEvents = visibleEvents.filter(
      event => {
        // Skip all-day events
        if (event.allDay) return false;

        // Skip events that span multiple days (treated as all-day)
        const start = new Date(event.start);
        const end = new Date(event.end);
        if (!isSameDay(start, end)) return false;

        // Only include events for the current day
        return isSameDay(start, currentDate);
      }
    );

    // Calculate positions for overlapping events
    const eventPositions = calculateEventPositions(timeEvents);

    return (
      <div className="scheduler-day-view" style={{ height }}>
        {showAllDay && (
          <div className="scheduler-all-day-section">
            <div className="scheduler-all-day-label">All Day</div>
            <div className="scheduler-all-day-events">
              {allDayEvents.map(event => (
                <div
                  key={event.id}
                  className={`scheduler-event scheduler-all-day-event ${isDragging && draggedEvent?.id === event.id ? 'dragging' : ''}`}
                  style={{ backgroundColor: event.color || '#3174ad' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleDragStart(event, e);
                  }}
                >
                  <div className="scheduler-event-title">{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="scheduler-time-grid">
          <div className="scheduler-time-column">
            {timeSlots.map(time => (
              <div key={time} className="scheduler-time-slot">
                <div className="scheduler-time-label">{time}</div>
              </div>
            ))}
          </div>

          <div className="scheduler-day-column">
            {timeSlots.map(time => (
              <div key={time} className="scheduler-time-cell"></div>
            ))}

            {eventPositions.map(({ event, width, left }) => {
              const eventStart = new Date(event.start);
              const eventEnd = new Date(event.end);

              // Calculate position and height
              const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
              const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();
              const [startHour, startMinute] = startTime.split(':').map(Number);
              const startTimeMinutes = startHour * 60 + startMinute;

              const top = ((startMinutes - startTimeMinutes) / timeslotInterval) * 30; // 30px per timeslot
              const height = ((endMinutes - startMinutes) / timeslotInterval) * 30;

              return (
                <div
                  key={event.id}
                  className={`scheduler-event scheduler-time-event ${isDragging && draggedEvent?.id === event.id ? 'dragging' : ''} ${isResizing && resizedEvent?.id === event.id ? 'resizing' : ''}`}
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: event.color || '#3174ad',
                    width: `${width}%`,
                    left: `${left}%`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleDragStart(event, e);
                  }}
                >
                  <div className="scheduler-event-time">
                    {formatTime(eventStart)} - {formatTime(eventEnd)}
                  </div>
                  <div className="scheduler-event-title">{event.title}</div>
                  {event.location && (
                    <div className="scheduler-event-location">{event.location}</div>
                  )}
                  {dragToResize && (
                    <div
                      className="scheduler-event-resizer"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleResizeStart(event, e);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    return (
      <div className="scheduler-week-view" style={{ height }}>
        {showAllDay && (
          <div className="scheduler-all-day-section">
            <div className="scheduler-all-day-label">All Day</div>
            <div className="scheduler-all-day-columns">
              {visibleDays.map(day => {
                const dayAllDayEvents = visibleEvents.filter(event => {
                  // Check if it's explicitly marked as all-day
                  if (event.allDay) return isSameDay(new Date(event.start), day);

                  // Check if it spans multiple days (implicit all-day)
                  const start = new Date(event.start);
                  const end = new Date(event.end);
                  if (!isSameDay(start, end)) {
                    return isSameDay(start, day) ||
                      isSameDay(end, day) ||
                      (start < day && end > day);
                  }

                  return false;
                });

                return (
                  <div key={day.toISOString()} className="scheduler-all-day-column">
                    {dayAllDayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`scheduler-event scheduler-all-day-event ${isDragging && draggedEvent?.id === event.id ? 'dragging' : ''}`}
                        style={{ backgroundColor: event.color || '#3174ad' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleDragStart(event, e);
                        }}
                      >
                        <div className="scheduler-event-title">{event.title}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="scheduler-time-grid">
          <div className="scheduler-time-column">
            {timeSlots.map(time => (
              <div key={time} className="scheduler-time-slot">
                <div className="scheduler-time-label">{time}</div>
              </div>
            ))}
          </div>

          <div className="scheduler-day-columns">
            {visibleDays.map(day => {
              // Get events for this day
              const dayEvents = visibleEvents.filter(event => {
                // Skip all-day events
                if (event.allDay) return false;

                // Skip events that span multiple days (treated as all-day)
                const start = new Date(event.start);
                const end = new Date(event.end);
                if (!isSameDay(start, end)) return false;

                // Only include events for this day
                return isSameDay(start, day);
              });

              // Calculate positions for overlapping events
              const eventPositions = calculateEventPositions(dayEvents);

              return (
                <div key={day.toISOString()} className="scheduler-day-column">
                  {timeSlots.map(time => (
                    <div key={time} className="scheduler-time-cell"></div>
                  ))}

                  {eventPositions.map(({ event, width, left }) => {
                    const eventStart = new Date(event.start);
                    const eventEnd = new Date(event.end);

                    // Calculate position and height
                    const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
                    const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();
                    const [startHour, startMinute] = startTime.split(':').map(Number);
                    const startTimeMinutes = startHour * 60 + startMinute;

                    const top = ((startMinutes - startTimeMinutes) / timeslotInterval) * 30; // 30px per timeslot
                    const height = ((endMinutes - startMinutes) / timeslotInterval) * 30;

                    return (
                      <div
                        key={event.id}
                        className={`scheduler-event scheduler-time-event ${isDragging && draggedEvent?.id === event.id ? 'dragging' : ''} ${isResizing && resizedEvent?.id === event.id ? 'resizing' : ''}`}
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          backgroundColor: event.color || '#3174ad',
                          width: `${width}%`,
                          left: `${left}%`
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleDragStart(event, e);
                        }}
                      >
                        <div className="scheduler-event-time">
                          {formatTime(eventStart)} - {formatTime(eventEnd)}
                        </div>
                        <div className="scheduler-event-title">{event.title}</div>
                        {event.location && (
                          <div className="scheduler-event-location">{event.location}</div>
                        )}
                        {dragToResize && (
                          <div
                            className="scheduler-event-resizer"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              handleResizeStart(event, e);
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render month view
  const renderMonthView = () => {
    // Group days into weeks
    const weeks: Date[][] = [];
    for (let i = 0; i < visibleDays.length; i += 7) {
      weeks.push(visibleDays.slice(i, i + 7));
    }

    return (
      <div className="scheduler-month-view">
        <div className="scheduler-month-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="scheduler-month-header-cell">
              {day}
            </div>
          ))}
        </div>

        <div className="scheduler-month-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="scheduler-month-row">
              {week.map(day => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isToday = isSameDay(day, new Date());

                // Get events for this day
                const dayEvents = visibleEvents.filter(event =>
                  isSameDay(new Date(event.start), day) ||
                  isSameDay(new Date(event.end), day) ||
                  (new Date(event.start) < day && new Date(event.end) > day)
                );

                return (
                  <div
                    key={day.toISOString()}
                    className={`scheduler-month-cell ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`}
                  >
                    <div className="scheduler-month-cell-header">
                      {day.getDate()}
                    </div>

                    <div className="scheduler-month-events">
                      {dayEvents.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`scheduler-event scheduler-month-event ${isDragging && draggedEvent?.id === event.id ? 'dragging' : ''}`}
                          style={{ backgroundColor: event.color || '#3174ad' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleDragStart(event, e);
                          }}
                        >
                          <div className="scheduler-event-title">{event.title}</div>
                        </div>
                      ))}

                      {dayEvents.length > 3 && (
                        <div className="scheduler-more-events">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render agenda view
  const renderAgendaView = () => {
    // Group events by day
    const eventsByDay: Record<string, Event[]> = {};

    visibleDays.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      eventsByDay[dateStr] = visibleEvents.filter(event =>
        isSameDay(new Date(event.start), day) ||
        isSameDay(new Date(event.end), day) ||
        (new Date(event.start) < day && new Date(event.end) > day)
      );
    });

    return (
      <div className="scheduler-agenda-view">
        {visibleDays.map(day => {
          const dateStr = day.toISOString().split('T')[0];
          const dayEvents = eventsByDay[dateStr] || [];

          if (dayEvents.length === 0) return null;

          return (
            <div key={dateStr} className="scheduler-agenda-day" data-date={dateStr}>
              <div className="scheduler-agenda-day-header">
                <div className="scheduler-agenda-day-name">{getDayName(day)}</div>
                <div className="scheduler-agenda-day-date">{formatDate(day)}</div>
              </div>

              <div className="scheduler-agenda-events">
                {dayEvents.map(event => {
                  const eventStart = new Date(event.start);
                  const eventEnd = new Date(event.end);

                  return (
                    <div
                      key={event.id}
                      className={`scheduler-agenda-event ${isDragging && draggedEvent?.id === event.id ? 'dragging' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleDragStart(event, e);
                      }}
                    >
                      <div
                        className="scheduler-agenda-event-color"
                        style={{ backgroundColor: event.color || '#3174ad' }}
                      ></div>

                      <div className="scheduler-agenda-event-time">
                        {event.allDay ? 'All day' : `${formatTime(eventStart)} - ${formatTime(eventEnd)}`}
                      </div>

                      <div className="scheduler-agenda-event-content">
                        <div className="scheduler-agenda-event-title">{event.title}</div>
                        {event.location && (
                          <div className="scheduler-agenda-event-location">{event.location}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render header
  const renderHeader = () => {
    if (!showHeader) return null;

    return (
      <div className="scheduler-header">
        {currentView === 'day' && (
          <div className="scheduler-day-header">
            <div className="scheduler-day-header-cell">
              <div className="scheduler-day-name">{getDayName(visibleDays[0])}</div>
              <div className="scheduler-day-date">{formatDate(visibleDays[0])}</div>
            </div>
          </div>
        )}

        {currentView === 'week' && (
          <div className="scheduler-week-header">
            <div className="scheduler-time-column-header"></div>
            {visibleDays.map(day => (
              <div
                key={day.toISOString()}
                className={`scheduler-day-header-cell ${isSameDay(day, new Date()) ? 'today' : ''}`}
              >
                <div className="scheduler-day-name">{getDayName(day, true)}</div>
                <div className="scheduler-day-date">{day.getDate()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render the appropriate view
  const renderView = () => {
    switch (currentView) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      case 'agenda':
        return renderAgendaView();
      default:
        return null;
    }
  };

  return (
    <div
      className={`scheduler ${theme === 'dark' ? 'scheduler-dark' : ''}`}
      style={{ height }}
    >
      {renderToolbar()}
      {renderHeader()}
      <div className="scheduler-content">
        {renderView()}
      </div>
    </div>
  );
};

export default Scheduler; 