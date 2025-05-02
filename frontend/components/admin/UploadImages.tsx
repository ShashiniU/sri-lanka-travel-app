// components/UploadImages.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImages({ onNext }: { onNext: (images: string[]) => void }) {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...uris]);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
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
        📸 Step 2: Upload Images
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#0066cc',
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 15,
        }}
        onPress={pickImage}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Select Images</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: img }}
            style={{
              width: 100,
              height: 100,
              marginRight: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#ccc',
            }}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: images.length === 0 ? '#ccc' : '#28a745',
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={() => onNext(images)}
        disabled={images.length === 0}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          Next: Add Facilities
        </Text>
      </TouchableOpacity>
    </View>
  );
}
