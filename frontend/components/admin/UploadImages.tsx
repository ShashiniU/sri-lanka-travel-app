// components/UploadImages.tsx

import React, { useState } from 'react';
import { View, Text, Button, ScrollView, Image } from 'react-native';
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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Step 2: Upload Images</Text>
      <Button title="Pick Images" onPress={pickImage} />

      <ScrollView horizontal style={{ marginVertical: 15 }}>
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: img }}
            style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }}
          />
        ))}
      </ScrollView>

      <Button title="Next: Add Facilities" onPress={() => onNext(images)} />
    </View>
  );
}
