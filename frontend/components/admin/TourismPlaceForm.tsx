// components/TourismPlaceForm.tsx

import React from 'react';
import { View, Text, TextInput, Button, ScrollView, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function TourismPlaceForm({ onNext }: { onNext: (data: any) => void }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => onNext(data);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Step 1: Enter Place Details</Text>

      {[
        { name: 'name', placeholder: 'Place Name' },
        { name: 'description', placeholder: 'Description' },
        { name: 'location', placeholder: 'Location' },
        { name: 'category', placeholder: 'Category' },
        { name: 'language_support', placeholder: 'Languages (e.g. English,Sinhala)' },
        { name: 'phone_number', placeholder: 'Phone Number' },
        { name: 'email', placeholder: 'Email' },
        { name: 'website', placeholder: 'Website' },
        { name: 'price_per_night', placeholder: 'Price Per Night', keyboardType: 'numeric' },
        { name: 'max_guests', placeholder: 'Max Guests', keyboardType: 'numeric' },
      ].map((field, idx) => (
        <Controller
          key={idx}
          control={control}
          name={field.name}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={{
                borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 6
              }}
              placeholder={field.placeholder}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      ))}

      <Text>Eco Friendly</Text>
      <Controller
        control={control}
        name="eco_friendly"
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <Switch value={value} onValueChange={onChange} />
        )}
      />

      <Text>Rural Area</Text>
      <Controller
        control={control}
        name="is_rural"
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <Switch value={value} onValueChange={onChange} />
        )}
      />

      <Button title="Next: Upload Images" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}
