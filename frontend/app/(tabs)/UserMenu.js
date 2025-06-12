import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const UserMenu = ({ onProfile, onLogout, onLogin, isAuthenticated, currentUser }) => {
  const [open, setOpen] = React.useState(false);

  const toggleMenu = () => setOpen(o => !o);

  return (
    <View style={styles.menuWrapper}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        {/* Use an icon for the menu button */}
        <Ionicons name={open ? "close-circle-outline" : "person-circle-outline"} size={28} color="#3b82f6" />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {isAuthenticated && currentUser ? (
            <>
              <View style={styles.userInfo}>
                <Text style={styles.usernameText}>Hi, {currentUser.username || 'User'}</Text>
              </View>
              <TouchableOpacity onPress={() => { onProfile(); toggleMenu(); }} style={styles.dropdownItem}>
                <Ionicons name="person-outline" size={20} color="#333" style={styles.icon} />
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onLogout(); toggleMenu(); }} style={[styles.dropdownItem, styles.logoutItem, styles.dropdownItemLast]}>
                <Ionicons name="log-out-outline" size={20} color="#EF4444" style={styles.icon} />
                <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => { onLogin(); toggleMenu(); }} style={[styles.dropdownItem, styles.dropdownItemLast]}>
              <Ionicons name="log-in-outline" size={20} color="#3b82f6" style={styles.icon} />
              <Text style={styles.dropdownText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  menuButton: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 48, // Adjusted top position
    right: 0, // Align to the right
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // This is for Android shadow
    zIndex: 1000,   // Increased zIndex to ensure it's on top
    width: 180, // Set a fixed width for the dropdown
  },
  userInfo: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f9fafb', // Light background for user info
  },
  usernameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15, // Increased padding
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row', // Align icon and text
    alignItems: 'center',
  },
  dropdownItemLast: {
    borderBottomWidth: 0, // No border for the last item
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151', // Slightly darker text
  },
  logoutItem: {
    // No specific style needed here anymore unless for border
  },
  logoutText: {
    color: '#EF4444', // Red color for logout text
  },
});

export default UserMenu;
