import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Reducer
function notificationReducer(state, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload);
    default:
      return state;
  }
}

export function NotificationProvider({ children }) {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = useCallback((notification) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch({
      type: ADD_NOTIFICATION,
      payload: { ...notification, id }
    });

    // Auto remove after duration
    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIFICATION,
        payload: id
      });
    }, notification.duration || 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({
      type: REMOVE_NOTIFICATION,
      payload: id
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
    </NotificationContext.Provider>
  );
}

function NotificationContainer({ notifications, removeNotification }) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {notifications.map(notification => (
          <Notification 
            key={notification.id} 
            {...notification} 
            removeNotification={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Notification({ id, type, message, removeNotification }) {
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`${bgColors[type]} bg-opacity-90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center min-w-[300px] max-w-md`}
    >
      <span className="mr-3 font-bold">{icons[type]}</span>
      <p className="flex-1">{message}</p>
      <button
        onClick={() => removeNotification(id)}
        className="ml-3 hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </motion.div>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 