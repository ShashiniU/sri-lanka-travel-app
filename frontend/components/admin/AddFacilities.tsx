// components/AddFacilities.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Step 3: Add Facilities</Text>

      <TextInput
        placeholder="Enter Facility (e.g. Free WiFi)"
        value={facility}
        onChangeText={setFacility}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 6 }}
      />
      <Button title="Add Facility" onPress={addFacility} />

      <FlatList
        data={facilities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={{ padding: 6 }}>• {item}</Text>}
        style={{ marginVertical: 20 }}
      />

      <Button title="Finish & Submit All Data" onPress={() => onFinish(facilities)} />
    </View>
  );
}
