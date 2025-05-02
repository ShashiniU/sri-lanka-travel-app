// components/AddFacilities.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function AddFacilities({ onFinish }: { onFinish: (facilities: string[]) => void }) {
  const [facility, setFacility] = useState('');
  const [facilities, setFacilities] = useState<string[]>([]);

  const addFacility = () => {
    if (facility.trim()) {
      setFacilities(prev => [...prev, facility.trim()]);
      setFacility('');
    }
  };

  return (
    <View
      style={{
        padding: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: '600',
          marginBottom: 15,
          color: '#333',
          textAlign: 'center',
        }}
      >
        🛎️ Step 3: Add Facilities
      </Text>

      <TextInput
        placeholder="Enter Facility (e.g. Free WiFi)"
        value={facility}
        onChangeText={setFacility}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 10,
          fontSize: 16,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#0066cc',
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={addFacility}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Add Facility</Text>
      </TouchableOpacity>

      <FlatList
        data={facilities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#f2f2f2',
              padding: 10,
              marginVertical: 5,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 16, color: '#444' }}>• {item}</Text>
          </View>
        )}
        style={{ marginBottom: 20 }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: facilities.length === 0 ? '#ccc' : '#28a745',
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={() => onFinish(facilities)}
        disabled={facilities.length === 0}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          Finish & Submit All Data
        </Text>
      </TouchableOpacity>
    </View>
  );
}
