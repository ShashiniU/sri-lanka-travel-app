"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from "react-native"
import TourismPlaceForm from "../../components/admin/TourismPlaceForm"
import UploadImages from "../../components/admin/UploadImages"
import AddFacilities from "../../components/admin/AddFacilities"
import BASE_URL from "../../constants/config"; 
import axios from 'axios';



export default function AdminHomeScreen() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    placeDetails: {},
    images: [],
    facilities: [],
  })

  // Handle place details submission from step 1
  const handlePlaceDetailsSubmit = (placeDetails) => {
    setFormData((prev) => ({ ...prev, placeDetails }))
    setCurrentStep(2)
  }

  // Handle images submission from step 2
  const handleImagesSubmit = (images) => {
    setFormData((prev) => ({ ...prev, images }))
    setCurrentStep(3)
  }

  // Handle facilities and final submission from step 3
  const handleFacilitiesSubmit = async (facilities) => {
    try {
      setIsSubmitting(true)
 
      // Update form data with facilities
      const completeData = {
        ...formData,
        facilities,
      }

      // Prepare form data for API submission
      const apiData = new FormData()

      // Add place details
      Object.keys(completeData.placeDetails).forEach((key) => {
        apiData.append(key, completeData.placeDetails[key])
      })

      // Add facilities as JSON string
      apiData.append("facilities", JSON.stringify(facilities))

      // Add images
      completeData.images.forEach((imageUri, index) => {
        const file = {
          uri: imageUri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        };
        
        apiData.append('images', file);
      });
      
            //   apiData.append("images", {
            //     uri: image,
            //     name: imageName,
            //     type: imageType,
            //   })
            // })
console.log("Form apiData:", apiData);
      // Make API call
      const response = await axios.post(`${BASE_URL}/api/tourism/tourism-places`, apiData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
   
      // const result = await response.json()

      if (!response.status === 200) {
        throw new Error("Failed to submit tourism place" || response.message )
      }

      // Show success message
      Alert.alert("Success", "Tourism place added successfully!", [{ text: "OK", onPress: () => resetForm() }])
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to submit tourism place")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form after successful submission
  const resetForm = () => {
    setCurrentStep(1)
    setFormData({
      placeDetails: {},
      images: [],
      facilities: [],
    })
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TourismPlaceForm onNext={handlePlaceDetailsSubmit} />
      case 2:
        return <UploadImages onNext={handleImagesSubmit} />
      case 3:
        return <AddFacilities onFinish={handleFacilitiesSubmit} />
      default:
        return <Text>Unknown step</Text>
    }
  }

  // Show progress indicator
  const renderProgressIndicator = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressStep, currentStep >= 1 && styles.activeStep]} />
        <View style={styles.progressLine} />
        <View style={[styles.progressStep, currentStep >= 2 && styles.activeStep]} />
        <View style={styles.progressLine} />
        <View style={[styles.progressStep, currentStep >= 3 && styles.activeStep]} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Tourism Place</Text>
      {renderProgressIndicator()}

      {isSubmitting ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Submitting tourism place data...</Text>
        </View>
      ) : (
        <View style={styles.formContainer}>
        {renderStep()}
      </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#0066cc",
  },
  progressLine: {
    height: 3,
    width: 50,
    backgroundColor: "#e0e0e0",
  },
})
